---
slug: /on-premises-installation-guide/docker
sidebar_label: Install via Docker
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

# CodeTogether On-Premises Installation via Docker

## Before You Begin 

- CodeTogether requires secure HTTPS connections. Docker allows for two options regarding SSL – decide between running with SSL serviced directly from inside the container, or using Nginx or Apache outside of the container.
- You will need SSL certificates for each domain on which the CodeTogether services will be exposed.
- If requesting a license for multi-server deployment, please mention the externally accessible HTTPS URL for the CodeTogether Locator (details below).

The instructions below cover both single and multi-server deployments with additional configuration instructions for multi-server roles.

:::info Multi-Server Deployment Prerequisites

As of CodeTogether 2022.1, you can optionally deploy multiple CodeTogether servers on-premises. Benefits of a multi-server deployment include service redundancy, scalability through distributed workloads, and lower latency with regional deployments—see [Multi-Server On-Premises Deployment](multi-server-on-premises-deployment.md) for additional details.

A multi-server deployment comprises the following containers:

 - **Locator** – A single instance that manages load balancing or regional assignments to edge servers.
 - **Edge Servers** – One or more, based on your needs. These are the servers which manage CodeTogether sessions.
 - **Database** – Co-located with the Locator to persist metrics, audit logs, etc. Can be MySQL or PostgreSQL.

The same CodeTogether image is used for locators and edge servers – the container will function as a locator or an edge server based on configuration parameters.

:::

### 1. Download Docker

If not already installed, install Docker on the destination system from [here](https://www.docker.com/products/docker-desktop).

### 2. Log In to Genuitec’s Docker Registry

The following instructions use the Genuitec Docker Registry. If you prefer to use the Red Hat Software Catalog instead, please substitute credentials and container path as mentioned [here](https://catalog.redhat.com/software/containers/genuitec/codetogether/5fbbdc772937386820426f55?container-tabs=gti&gti-tabs=red-hat-login).

Using your credentials provided by the Genuitec Sales team, log in to the Genuitec Docker Registry which is where you will receive the Docker image. Replace &lt;username&gt; with your own login for the registry enclosed in double quotes.

```bash
$ docker login -u "<username>" hub.edge.codetogether.com
Password:
Login Succeeded
```

### 3. Pull the CodeTogether Image

After logging in, now it is required to pull the latest version of the CodeTogether image.

```bash
$ docker pull hub.edge.codetogether.com/latest/codetogether
Using default tag: latest
latest: Pulling from latest/codetogether
(snip): Pull complete
Digest: sha256:(snip)
Status: Downloaded newer image for hub.edge.codetogether.com/latest/codetogether:latest
hub.edge.codetogether.com/latest/codetogether:latest
```

If you’d like to pull a specific version of CodeTogether, use the following command instead.

```bash
$ docker pull hub.edge.codetogether.com/releases/codetogether:<version>
```

To get a list of versions available, please see our [CodeTogether Edge Server Technical Notes](../on-premises/edge-server-technical-notes.md).


### 4. Verify the Image is Available

Now that the image has been retrieved, verify that the image is available.

```bash
$ docker image ls
REPOSITORY                                     TAG    IMAGE ID  CREATED
hub.edge.codetogether.com/latest/codetogether  latest (snip)    2 minutes ago
```

### 5. Set up SSL Settings

As mentioned in the introduction, using CodeTogether requires secure HTTPS connections. This can be done either by configuring a reverse proxy outside of the container, or enabling SSL inside the container itself. Skip this step if you will be using an SSL reverse proxy configured on your Docker host. Instead, enable SSL on the reverse proxy server of your choice ensuring that it is configured to support WebSockets.

To enable SSL, first create a codetogether-ssl-settings.conf file containing the names of the certificate files you will be using. In addition, place the `yourcert.com.crt` and `yourcert.com.key` files next to this configuration file.

```bash
# enable SSL
listen 1443 ssl;
# add your certificates
ssl_certificate /etc/nginx/ssl/yourcert.com.crt;
ssl_certificate_key /etc/nginx/ssl/yourcert.com.key;
# add your TLS and/or ciphering settings
ssl_protocols TLSv1.3 TLSv1.2;
```

 
:::caution 
If you are using a self-signed certificate or an internal certificate authority that is not externally rooted, ensure to use `CT_TRUST_ALL_CERTS` in the section below.

When configuring your server, it is important for the SSL configuration that the backend is referenced by a hostname that matches the SSL certificate. Connecting to the backend simply by IP address will not work reliably from clients. In addition, connections by a simple http:// connection will not work as expected as the Browser client requires access to secure crypto-APIs which are not available in insecure web connections.
:::

### 6. Create the Dockerfile with License Details and Additional Configuration

Create the Dockerfile file that will be used for this CodeTogether On-Premises deployment. Note that the `CT_SERVER_URL` must contain the HTTPS version of this service as CodeTogether will not run over HTTP.

#### Audio/Video Configuration (CodeTogether 5.0+):

You must explicitly set the `CT_AV_ENABLED` variable to indicate if you would like to enable A/V support in your deployment. You can set it to either `"true"` or `"false"` based on your preference.

If `ENV CT_AV_ENABLED` `"false"`, no additional settings need to be configured and A/V sessions will be disabled in your deployment. You are free to turn this setting on at any time.

If `ENV CT_AV_ENABLED` `"true"`:

 - Ensure that A/V ports 10000/udp and 4443/tcp are mapped to and exposed outside the container.
 - Set the value for `CT_AV_LAN_IP` based on the following scenarios:
   - If the ports are exposed on the same IP address as `CT_SERVER_URL’s` host DNS resolution, you can omit `CT_AV_LAN_IP` or explicitly set it to `"auto"`.
   - If the server provided by `CT_SERVER_URL` is not DNS resolvable – for instance, like being in your home network – you must set `CT_AV_LAN_IP` to that private IP.
   - If you are mapping ports 10000/udp and 4443/tcp to an IP that’s different from the server specified by `CT_SERVER_URL`, you must set `CT_AV_LAN_IP` to that IP.

:::info
CodeTogether's audio, video and screen sharing capabilities use the WebRTC framework, requiring both TCP and UDP communication to function. If your firewall does not allow incoming UDP traffic, you *may* need to set up a TURN server on your intranet. See [A/V with a TURN Server](/on-premises/turn-server.md) for details.
:::
#### SSO Integration

If you’d like to set up SSO integration, please see [this doc](../on-premises/sso.md) for configuration steps and additional environment variables that must be configured in the container.

#### StatsD/Prometheus Integration (CodeTogether 4.2+)

If you’d like CodeTogether metrics to be exposed to an external monitoring platform, please see [this doc](../on-premises/edge-server-technical-notes.md) for additional environment variables that must be configured in the container.

License details will be given to you by your Genuitec Sales representative, and must be entered exactly as they are supplied with the identical punctuation and spacing. Be sure to use straight quotes around the `CT_LICENSEE` value.

:::caution
If you are using a self-signed certificate, set `CT_TRUST_ALL_CERTS` to `true`, regardless of whether you’re using an external certificate, or one from inside the container.
:::


<Tabs>
<TabItem value="sslin" label="SSL from Container">

```bash
FROM hub.edge.codetogether.com/latest/codetogether

COPY --chown=codetogether:0 yourcert.com.crt /etc/nginx/ssl
COPY --chown=codetogether:0 yourcert.com.key /etc/nginx/ssl
COPY --chown=codetogether:0 codetogether-ssl-settings.conf /etc/nginx/includes
RUN chmod -R g+r /etc/nginx/ssl

# Uncomment if using a self-signed certificate
#ENV CT_TRUST_ALL_CERTS true

ENV CT_LICENSEE "Your name"
ENV CT_MAXCONNECTIONS 250
ENV CT_EXPIRATION 2020/12/30
ENV CT_LOCATOR none
ENV CT_SIGNATURE your-signature

# Provide the externally accessible HTTPS URL for this server
ENV CT_SERVER_URL https://yourcodetogetherserver.company.com

# A/V configuration
ENV CT_AV_ENABLED "true"
ENV CT_AV_LAN_IP "auto"
```

</TabItem>
<TabItem value="sslout" label="SSL outside Container">

```bash
FROM hub.edge.codetogether.com/latest/codetogether

# Uncomment if using a self-signed certificate
#ENV CT_TRUST_ALL_CERTS true

ENV CT_LICENSEE "Your name"
ENV CT_MAXCONNECTIONS 250
ENV CT_EXPIRATION 2020/12/30
ENV CT_LOCATOR none
ENV CT_SIGNATURE your-signature

# Provide the externally accessible HTTPS URL for this server
ENV CT_SERVER_URL https://yourcodetogetherserver.company.com

# A/V configuration
ENV CT_AV_ENABLED "true"
ENV CT_AV_LAN_IP "auto"
```

</TabItem>
<TabItem value="licenseout" label="License Block outside Dockerfile">

For additional security, instead adding your license block to the Dockerfile, you can provide them via a dedicated mount point inside the container. In a secure location, create a file `codetogether.config` file with the same variables exported, for example:

```bash
export CT_LICENSEE="Your name"
export CT_MAXCONNECTIONS=250
export CT_EXPIRATION=2022/12/30
export CT_LOCATOR=none
export CT_SIGNATURE=your-signature
export CT_SERVER_URL=https://yourcodetogetherserver.company.com
```

This file will be used in step #8 when starting the container. Your Dockerfile can now be reduced to: 

```bash
FROM hub.edge.codetogether.com/latest/codetogether

# Uncomment if using a self-signed certificate
#ENV CT_TRUST_ALL_CERTS true

# Provide the externally accessible HTTPS URL for this server
ENV CT_SERVER_URL https://yourcodetogetherserver.company.com

# A/V configuration
ENV CT_AV_ENABLED "true"
ENV CT_AV_LAN_IP "auto"
```
</TabItem>
</Tabs>


:::note
If you’re working with a specific version of CodeTogether, use the following FROM instruction instead:

```bash
FROM hub.edge.codetogether.com/releases/codetogether:<version>
```
:::

#### Multi-server: Additional Configuration

:::info
  - A dedicated Dockerfile for the locator server and each individual edge server is required – you will build and run each of these.
  - Unlike single server deployments, StatsD/Prometheus integration should be configured in the [Dashboard](../on-premises/using-the-on-premises-dashboard.md), not in the Dockerfile.
:::

#### Setting `CT_LOCATOR`:

When requesting a license for multi-server deployment, you must send Genuitec the externally accessible HTTPS URL for the CodeTogether Locator. Your license block will use this URL as the value for the `CT_LOCATOR` variable, and as part of license enforcement, this variable must be set for the locator server and each edge server. In the locator’s Dockerfile, `CT_LOCATOR` should have the same value as `CT_SERVER_URL`, and not none as you can see in the sample above.

#### Setting `CT_REGION`:

If you wish to assign different edge servers based on IP ranges (regional deployment), add a region name variable to each edge server’s Dockerfile. In the Dashboard, you can then use CIDRs to map IPs to specific edge servers. For example:

```bash
ENV CT_REGION North
```

#### Creating `locator-config.json`:

See [Setting up a Database for multi-server Deployments](../on-premises/edge-server-technical-notes.md) to set up a database and create a locator-config.json file which you will use in the subsequent steps.


### 7. Build the Docker Container

:::caution Updating?
If you are updating your CodeTogether installation, ensure you remove the existing CodeTogether container using the following command, before building the new version.

```bash
$ docker container rm -f codetogether
````
:::

Build the local Docker container using the Dockerfile. The trailing dot configures the directory where the container should be placed. An additional path may be provided.

```bash
$ docker build -t "codetogether:local" .
Sending build context to Docker daemon 14.85kB
Step 1/13 : FROM hub.edge.codetogether.com/latest/codetogether
(snip)
Successfully built (snip)
Successfully tagged codetogether:local
```

#### Multi-server: Building Edge and Locator Containers

You will need to build the containers for the locator and each edge server. If you happen to be testing this on the same machine, please use appropriate tags to differentiate between the containers and the the `-f` argument to point to the correct Dockerfile. For example:

```bash
$ docker build -t "codetogether:local" -f Dockerfile .
$ docker build -t "edge1:local" -f Dockerfile.edge1 .
```

### 8. Start the Docker Container

Now that the container is ready, it is time to start it up! This will expose the configured ports on your container host. You can optionally only expose port 80 and/or 443, depending on which services you will be using. 

:::info Map A/V Ports
If using A/V support, ensure you map ports `4443` and `10000` to the container, omit from the run command otherwise.
:::

:::note
If using a self-signed certificate, keep -p 80:1080 present, and use the http:// URL to install the Eclipse plugin from Update Site to avoid issues with Java not recognizing the certificate.

We also would recommend mounting the area in which CodeTogether stores its logs on a stable volume. This will ensure that historic information including usage data, session audits and server logs will not be lost across CodeTogether updates or restarts.
:::

<Tabs>
<TabItem value="singleserver" label="Single Edge Server">

```bash
$ docker run \
--name codetogether \
-v ctlogs:/var/log/codetogether \
-p 80:1080 -p 443:1443 -p 10000:10000/udp -p 4443:4443 \
-d codetogether:local
```

If you used a `codetogether.config` file for license details, start with this command instead:

```bash
$ docker run \
--name codetogether \
--mount type=bind,source=/absolute/path/to/codetogether.config,target=/opt/codetogether/.bashrc \
-v ctlogs:/var/log/codetogether \
-p 80:1080 -p 443:1443 -p 10000:10000/udp -p 4443:4443 \
-d codetogether:local
```

</TabItem>
<TabItem value="multiserver" label="Multi-server Deployment">

#### Starting the Locator

When starting the Locator, ensure you point to the `locator-config.json` file you created in step #6. 


```bash
$ docker run \
--name codetogether \
-v ctlogs:/var/log/codetogether \
-p 80:1080 -p 443:1443 -p 10000:10000/udp -p 4443:4443 \
--mount type=bind,source=/absolute/path/to/locator-config.json,target=/opt/codetogether/runtime/locator-config.json \
-d codetogether:local
```

#### Starting the Edge Server

```bash
$ docker run --name edge1 -p 1448:1443 -p 10000:10000/udp -p 4443:4443 -d edge1:local
```

</TabItem>
</Tabs>

### 9. Confirm Services are Ready

Now that the container is started, confirm that everything is running as expected.

```bash
$ docker ps | grep codetogether
27c82c04db5c codetogether "/opt/codetogether/s..." 5 seconds ago Up 3 seconds
0.0.0.0:80->1080/tcp, 0.0.0.0:443->1443/tcp codetogether
```
#### Multi-server: Confirming Edge Servers are Ready and Connected to Locator

In a multi-server setup, execute the following command to check the edge server logs:

```bash
$ docker logs -f edge1
INFO CodeTogether 2022.1.1238 Edge Server ready; connected to Locator for assignments
[INFO] CodeTogether started successfully!
```

Optionally, execute the following command to check the locator server log where, you should see a similar entry for each edge serer that connects.

```bash
$ docker logs -f codetogether
```

#### Checking Status and Further Configuration in the On-premises Dashboard

If you open your Dashboard `https://CT_LOCATOR/dashboard`, you will notice  a section displaying the health of each edge server.  If you set up multiple servers for a regional deployment, please go to the Regions page to set up the IP ranges that should map to each edge server. You can also use the Advanced page to configure metrics integration. See our [Dashboard documentation](../on-premises/using-the-on-premises-dashboard.md) for details.

### 10. Download Preconfigured Clients for CodeTogether
:::caution
We do not recommend using the publicly available versions of the CodeTogether plugins/extension within your IDEs. The versions available on your on-premises server are preconfigured to connect to your server. This will also ensure the plugins/extensions used are compatible with the version of CodeTogether you have deployed.
:::
If DNS is fully configured, it is now possible to connect to https://SERVERFQDN/clients and download the preconfigured clients to be used on your systems.

This manual plugin/extension installation is required only for the first time. When you update your on-premises distribution to a newer version of CodeTogether, the IDE plugins/extensions will be updated automatically. In Visual Studio Code, the extension will be updated when you start the IDE. For IntelliJ and Eclipse, you can use Help > Check for Updates and/or the plugin will be automatically updated based on your IDE’s update settings.

## Appendix: Sample CodeTogether Nginx Configuration

If you are configuring an Nginx Web server as a front-end layer or a load-balancing component, you may want to use this sample Nginx configuration as a template for your CodeTogether environment. Please make the TLS changes that fit your web environment.

As a best practice, we strongly recommend you place this Nginx configuration in a separate file, at one of these locations (locations vary depending on your Nginx version and/or OS distro).

`/etc/nginx/conf.d/codetogether.conf`

`/etc/nginx/sites-enabled/codetogether.conf`

:::caution
Do not modify your master Nginx configuration at `/etc/nginx/nginx.conf`
:::

Also, please confirm that your Nginx configuration is validated as OK, and be sure to restart your Nginx web server to ensure these configuration changes are applied:

```bash
# nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
# service nginx restart
```

```bash showLineNumbers
#
# The server that is running the CodeTogether container
# - Port 1080 is the HTTP default one in the container - unless it has been overridden in the running Dockerfile.
# - Make sure you have ports opened in your firewall between your Nginx servers and the running CodeTogether container.
#
upstream codetogether {
  server server2.mycompany.com:1080;
}
#
# The Nginx front end server that is proxying requests to the CodeTogether container (Docker)
#
server {
  listen 443 ssl http2;
  server_name server1.mycompany.com;
  ssl_protocols TLSv1.3 TLSv1.2;
  ssl_certificate /etc/nginx/ssl/server1-mycompany-com.crt;
  ssl_certificate_key /etc/nginx/ssl/server1-mycompany-com.key;
  # Setting Proxy headers at 'server' context so they can be used by this Nginx instance
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header Host $http_host;
  location / {
    proxy_redirect off;
    # Setting same Proxy headers at 'location' context so they can be properly 'forwarded' to the CodeTogether container
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;
    proxy_http_version 1.1;
    # This is mandatory to support CodeTogether socket connections
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_pass http://codetogether;
  }
```