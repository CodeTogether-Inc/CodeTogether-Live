---
slug: /on-premises-installation-guide/edge-server-technical-notes
sidebar_label: Edge Server Technical Notes
sidebar_position: 4
---

# CodeTogether Edge Server Technical Notes

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

The CodeTogether Edge Server is distributed as a Docker image and can be used with Kubernetes or raw Docker hosting. The full [On-Premises Installation Guide](on-premises-installation-guide.md) should be followed before proceeding to use the information below.

## Setting up a Database for Multi-server Deployments

In a multi-server deployment, a database must be co-located with the CodeTogether Locator to store metrics, audit logs and configuration information. The instructions below detail how you can set up a MySQL database from scratch with Docker, skip to the next step if you already have a database you’d like to use available. Note that we only support MySQL and PostgreSQL for now.

#### Start a MySQL Server Instance with Docker

1. In a stable location, create a `mysql` directory with `conf.d` and `data` sub-directories.  
    
    ```bash
    $ mkdir mysql
    $ mkdir -p mysql/{conf.d,data}
    ```

2. Inside `conf.d`, create a new file called `my-custom.cnf` with the following two lines:

    ```bash
    [mysqld]
    max_connections=250
    ```

3. Run the MySQL container. Replace `dbpass` with a suitable password.

    ```bash
    $ docker run --detach --name=mysql --env="MYSQL_ROOT_PASSWORD=dbpass" --publish 3306:3306 --volume=$(pwd)/mysql/conf.d:/etc/mysql/conf.d --volume=$(pwd)/mysql/data:/var/lib/mysql --security-opt seccomp=unconfined -d mysql:latest
    ```

4. Confirm that the MySQL server is running - you should see output similar to the following:

    ```bash
    $ docker logs -f mysql`
    $ [System] [MY-010931] [Server] /usr/sbin/mysqld: ready for connections. Version: '8.0.27' socket: '/var/run/mysqld/mysqld.sock' port: 3306 MySQL Community Server - GPL.
    ```

For additional details, see the [MySQL image reference](https://hub.docker.com/_/mysql).

#### Create a Database and User for CodeTogether Use

Before you proceed, ensure you have a mysql client installed. On Linux, you can install it using a command like the following:

```bash
$ sudo apt install -y mysql-client
```

After installing the client, log in to the server and create the database and user. Substitute `ctdbuser` and `ctdbpassword` with a username and password of your choice.

```sql
$ mysql -uroot -p -h 127.0.0.1
# (on prompt, supply the password specified when running the container)

> CREATE DATABASE codetogether;
> CREATE USER 'ctdbuser'@'%' IDENTIFIED BY 'ctdbpassword';
> GRANT ALL PRIVILEGES ON codetogether.* TO 'ctdbuser'@'%';
> FLUSH PRIVILEGES;
> exit
```

#### Create a locator-config.json file for the CodeTogether Locator

For the host property, use the same host as the CodeTogether Locator.

```json
{
    "database": {
        "user": "ctdbuser",
        "password": "ctdbpassword",
        "host": "<CT_SERVER_HOST>",
        "port": 3306,
        "schema": "codetogether",
        "dialect": "mysql"
    },
    "locatorMode": true
}
```

## Using a Load Balancer

As of CodeTogether 2022.1, CodeTogether supports multi-server deployments for load balancing and service redundancy purposes. **We strongly recommend** that you use these capabilities for load balancing. See the [Multi-server Deployment Guide](multi-server-on-premises-deployment.md) for details.

#### Without CodeTogether’s Multi-Server Support (Not Recommended):

All HTTP requests include a `ctstickiness` value. For IDE Clients, it is an HTTP Header; and for the Browser client, it is sent as a cookie. If using a load balancer to multiple edge servers (multiple active Docker instances), it is mandatory that the load balancer is configured to use this stickiness value to route connections from the same session to the same backend. Failure to use the stickiness value with multiple edge servers will result in errors, such as random users getting messages about sessions being unavailable.

## Obtaining a List of Available CodeTogether Versions

Get a list of CodeTogether images available for download at [here](https://hub.edge.codetogether.com/v2/releases/codetogether/tags/list). Authenticate with the CodeTogether Docker registry credentials provided to you with your on-premises trial or purchase to access this list.

## Setting up Access to the CodeTogether Dashboard

<Tabs>
<TabItem value="current" label="CodeTogether 4.2 and later" default>
 
The Dashboard can be accessed at <code>https://&lt;CT_SERVER_URL&gt;/dashboard</code>. Add the following variables to your Docker or Kubernetes configuration to correctly set up access to the dashboard.

```bash
CT_DASHBOARD_USER 'yourusername'
CT_DASHBOARD_PASSWORD 'changethis'
```

:::caution
Be sure to use straight quotes around the username and password values.
:::

If the above variables are not explicitly specified, CodeTogether will attempt to fall back to the `CT_LOGS_USER` and `CT_LOGS_PASSWORD` variable values. If those are not specified either, a random password is generated and logged in the CodeTogether log (see below). The dashboard can then be accessed with the `ctuser` username and generated password.
 
</TabItem>
<TabItem value="older" label="CodeTogether 4.1 and earlier">

If you are using a CodeTogether version prior to 4.2, add the following variables to your Docker or Kubernetes configuration to access log files via HTTPS:

```bash
CT_LOGS_USER 'yourusername'
CT_LOGS_PASSWORD 'changethis'
```

:::caution
Be sure to use straight quotes around the username and password values.
:::

The logs will then be accessible at <code>https://&lt;CT_SERVER_URL&gt;/logs</code>

</TabItem>
</Tabs>

## Metrics Monitoring

CodeTogether publishes server metrics using StatsD and/or Prometheus, allowing integration with monitoring tools like Graphite, Grafana and others.

The following metrics are currently published:
- Number of unique users currently online
- Number of active sessions
- Number of active session connections
- Average server lag
- Total sessions hosted
- Total plugins/extensions downloaded

In a multi-server deployment, metrics integration must be configured on the  [Dashboard](using-the-on-premises-dashboard.md#integration). In single server deployments, add the following variables to your Docker or Kubernetes configuration files, be sure to substitute the example values specified:

### StatsD
```bash
CT_METRICS_STATSD_HOST "statsdhosturl.yourcompany.com"
CT_METRICS_STATSD_PORT "8125"
CT_METRICS_STATSD_PROTOCOL "UDP"
```
### Prometheus
```bash
CT_PROMETHEUS_ENABLED "true"
```
With Prometheus enabled, metrics are published at `https://<CT_SERVER_URL>/metrics`

## Health-Check

You can health-check the running processes inside the container using the netstat command to verify services and ports
are available:

**Nginx default public ports – i.e. reachable outside the container**

```bash
$ netstat -tulpn | grep nginx
tcp 0 0 0.0.0.0:1443 0.0.0.0:* LISTEN 10/nginx: master
tcp 0 0 0.0.0.0:1080 0.0.0.0:* LISTEN 10/nginx: master
```

**CodeTogether private port – i.e. not reachable outside the container**

```bash 
$ netstat -tulpn | grep node
tcp 0 0 127.0.0.1:3001 0.0.0.0:* LISTEN 212/node
```

**CodeTogether is running and monitored by NodeJS forever command**
*Sample output showing the process is ‘running’ along with its uptime metric formatted days:hours:minutes:ms*
```bash
$ /opt/codetogether/.nvm/versions/node/v12.18.3/bin/node /opt/codetogether/.nvm/versions/node/v12.18.3/lib/node_modules/forever/bin/forever list

info: Forever processes running 
data: uid command 
script 
forever pid id logfile uptime 
data: [0] tQIL /opt/codetogether/.nvm/versions/node/v12.18.3/bin/node 
/opt/codetogether/runtime/src-gen/backend/main.js --hostname 127.0.0.1 
--port 3001 200 212 /opt/codetogether/.forever/tQIL.log 
2:15:37:49.537000000011176
```

**Confirming Availability**

You can verify that CodeTogether On-Premises is available via the following URL:


`https://<CT_SERVER_URL>:<PORT>/clients`

## Key Codetogether Resources

### Nginx Log Files

Contain all requests to the /clients/ area along with the request to CodeTogether itself.

`/var/log/nginx/access.log` 

`/var/log/nginx/error.log`


### Runtime Path

Contains the NodeJS engine to run CodeTogether.

`/opt/codetogether/runtime`

### Startup Script

Automatically runs CodeTogether when the container starts up. It first kills any existing Nginx and NodeJS running processes and then initiates CodeTogether through the NodeJS forever command which monitors for the CodeTogether runtime. If it goes down for some reason, it restarts the CodeTogether runtime (NodeJS process) automatically. Run it if you want to manually restart CodeTogether:

`/opt/codetogether/start-codetogether`

### License File

Contains license information needed to use CodeTogether.

`/opt/codetogether/licensing.properties`

### CodeTogether Log

Contains startup information such as if CodeTogether has a valid license along with the available public ports for HTTP and HTTPS connections.

`/var/log/codetogether/server.log`
```bash
root INFO CodeTogether On-Premises services now available on port 1080
(HTTP) and 1443 (SSL)
root INFO Valid CodeTogether license installed
```

## Tracking Downloads

If you are using CodeTogether 4.2, access these stats using the dashboard instead.

You can track the /clients/ downloads in the container.
<Tabs>
<TabItem value="eclipse" label="Eclipse" default>

```bash 
$ cat /var/log/nginx/access.log | grep "GET /clients/eclipse/plugins/com.genuitec.eclipse.codetogether.core_" | wc -l
```
</TabItem>
<TabItem value="intellij" label="IntelliJ">

```bash
$ cat /var/log/nginx/access.log | grep "GET /clients/intellij/codetogether-onpremises-" | wc -l
```
</TabItem>
<TabItem value="vscode" label="VS Code">

```bash
$ cat /var/log/nginx/access.log | grep "GET /clients/vscode/codetogether-onpremises-" | wc -l
```
</TabItem>
</Tabs>