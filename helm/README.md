Helm Chart for CodeTogether On-Premises
========================================

## Summary

This chart creates a CodeTogether server deployment on a Kubernetes cluster using the Helm package manager.

## Prerequisites

This chart has been created with Helm v3 and tested it with:

- Kubernetes v1.18+
- OpenShift v4.5+
- Helm v3.5+
- MySQL v8.0+

## Configuration

The following table lists configurable parameters of the CodeTogether chart and their default values (A-Z).

| Parameter                          | Description                                                                    | Default                                             |
| ---------------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------- |
| `av.enabled`                       | Enables CodeTogether A/V sessions (if set to `false`, A/V will be turned off ) | `false`                                             |
| `av.serverIP`                      | Sets the LAN IP to use for A/V sessions                                        | `auto`                                              |
| `av.stunServers.enabled`           | Enables use of private STUN servers for A/V                                    | `false`                                             |
| `av.stunServers.server`            | Set your private coTURN fallback server                                        | `coturn.example.com`                                |
| `av.stunServers.secret`            | The secret you set up in the coTURN server                                     | `my-secret`                                         |
| `codetogether.mode`                | Sets Locator running mode: `direct`, `locator-central` or `locator-edge`       | `direct`                                            |
| `codetogether.url`                 | The CodeTogether server URL that matches the Ingress config (if enabled)       | `https://codetogether.local`                        |
| `codetogether.trustAllCerts`       | Allow the use of untrusted certifictates                                       | `true`                                              |
| `codetogether.timeZone.enabled`    | Enables a customized TZ for CodeTogether container (default is UTC)            | `false`                                             |
| `codetogether.timeZone.region`     | Sets the TZ for the CodeTogether container (https://nodatime.org/TimeZones)    | `America/Chicago`                                   |
| `dashboard.enabled`                | Enables below `dashboard.username` and `dashboard.password` for HTTP Auth      | `false`                                             |
| `dashboard.username`               | Sets the HTTP Auth credentials to login into the '/dashboard' area             | `my-dashboard-username`                             |
| `dashboard.password`               | The SSO client secret                                                          | `my-dashboard-password`                             |
| `direct.metrics.statsdEnabled`     | Enables Metrics collecting                                                     | `false`                                             |
| `direct.metrics.statsdHost`        | StatsD host FQDN (like a Graphite server)                                      | `https://my-graphite-fqdn`                          |
| `direct.metrics.statsdPort`        | StatsD server port                                                             | `8125`                                              |
| `direct.metrics.statsdProtocol`    | StatsD server protocol                                                         | `UDP`                                               |
| `direct.metrics.prometheusEnabled` | Enables Prometheus metrics collecting                                          | `false`                                             |
| `image.pullPolicy`                 | Container image pull policy                                                    | `Always`                                            |
| `image.repository`                 | Repository URL from which the CodeTogether image will be pulled out            | `hub.edge.codetogether.com/releases/codetogether`   |
| `image.tag`                        | Container image tag                                                            | `latest`                                            |
| `imageCredentials.enabled`         | Set this to 'true' if you are meant to login into a Registry                   | `true`                                              |
| `imageCredentials.enabled`         | The registry FQDN you want to login into                                       | `hub.edge.codetogether.com`                         |
| `imageCredentials.username`        | Your registry login user name                                                  | `my-customer-username`                              |
| `imageCredentials.password`        | Your registry login password                                                   | `my-customer-password`                              |
| `imageCredentials.email`           | Your registry login email                                                      | `unused`                                            |
| `ingress.annotations`              | Specify ingress class                                                          | `kubernetes.io/ingress.class: nginx`                |
| `ingress.enabled`                  | Enable ingress controller resource                                             | `true`                                              |
| `ingress.hosts.paths`              | Paths to match against incoming requests                                       | `'[{'path': '/'}]`                                  |
| `ingress.hosts`                    | Application hostnames                                                          | `codetogether.local`                                |
| `ingress.tls`                      | Ingress TLS configuration                                                      | `[{name': codetogether-tls}]`                       |
| `license.licensee`                 | The license provided by Genuitec                                               | `Example`                                           |
| `license.maxConnections`           | The maximum connection allowed by the license                                  | `0`                                                 |
| `license.expiration`               | The license expiration date                                                    | `1970/12/31`                                        |
| `license.signature`                | The license signature                                                          | `123456789abcdef`                                   |
| `locatorCentral.database.host`     | Sets database host IP - it must be reachable from the CodeTogether container   | `10.10.0.2`                                         |
| `locatorCentral.database.port`     | Sets database port                                                             | `3306`                                              |
| `locatorCentral.database.schema`   | Sets database schema (database) name                                           | `codetogether`                                      |
| `locatorCentral.database.dialect`  | Sets database dialect (either MySQL or Postgress)                              | `mysql`                                             |
| `locatorCentral.database.user`     | Sets database user name                                                        | `my-db-username`                                    |
| `locatorCentral.database.password` | Sets database password                                                         | `my-db-password`                                    |
| `locatorCentral.database.sslEnabled` | Enable SSL security to database                                              | `false`                                             |
| `locatorCentral.database.sslKey`   | Sets database SSL client key (base64 encoded)                                  |                                                     |
| `locatorCentral.database.sslCA`    | Sets database SSL client certificate authority (base64 encoded)                |                                                     |
| `locatorCentral.database.sslCert`  | Sets database SSL client certificate (base64 encoded)                          |                                                     |
| `locatorEdge.locator`              | Sets JSON string configuration for `locator` mode database                     | `[sample included in the values.yaml file]`         || `locatorEdge.region`               | Sets a region in `edge-with-locator` mode so sessions can be routed out        | `default`                                           |
| `openshift.enabled`                | Set this value to 'true' ONLY if you are deploying into OpenShift              | `false`                                             |
| `service.type`                     | Service type                                                                   | `ClusterIP`                                         |
| `service.port`                     | CodeTogether exposed service port                                              | `443`                                               |
| `sso.enabled`                      | Enables SSO feature                                                            | `false`                                             |
| `sso.provider`                     | SSO vendor's name (recognized values are: OKTA and MICROSOFT)                  | `OKTA`                                              |
| `sso.systemBaseUrl`                | The base URL for your identity system - aka. Domain, Realm, etc.               | `https://OKTA_DOMAIN/oauth2/default`                |
| `sso.clientID`                     | The SSO client ID                                                              | `my-oidc-id`                                        |
| `sso.clientSecret`                 | The SSO client secret                                                          | `my-oidc-secret`                                    |
| `sso.jwksEndPointEnabled`          | Set to 'true' when the SSO URL for accessing public keys is protected (IDCS)   | `false`                                             |

## Creating your Kubernetes Namespace for CodeTogether

It is a best Kubernetes practice to have a namespace per collection of same aplpication objects - such as secrets, pods, etc.
To create a namespace for CodeTogether objects in Kubernetes and then switch to it in the current session just run:

Kubernetes:
```bash
$ kubectl create namespace codetogether
```
```bash
$ kubectl config set-context --current --namespace=codetogether
```

OpenShift:
```bash
$ oc new-project codetogether
```

Now, you are in the `codetogether` namespace so can create the below K8s secrets and deployment.

If your are using OpenShift, please set this value to `true` in your customized `codetogether-values.yaml` file:
```
openshift:
  enabled: true
```

## Edge Running Modes (CodeTogether v2022.1 and above)
By default, CodeTogether will run in `direct` mode. For a multi-server deployment, you must run a single CodeTogether locator in `locator-central` mode, and as many edge servers as required in `locator-edge` mode.

So, in order to run CodeTogether as either `locator-central` or `locator-edge` mode:
* Make sure you already have the right CodeTogether license provided by our Sales Team.
* Enter a CodeTogether running mode in your `codetogether-values.yaml` file along with required extra settings for either `direct.*`, `locatorCentral.*` or `locatorEdge.*` sections.
* If you are running CodeTogether as `locator-central`, make sure you already created and configured an empty database somewhere. Only MySQL and PostgreSQL databases are supported. 


### Create a Database and User for CodeTogether `locator-central` Mode

Ensure you have a MySQL or PostgreSQL database co-located with the CodeTogether Locator. Proceed to login into your database server, and create the database and user for CodeTogether `locator-central` mode. 

Substitute `ctdbuser` and `ctdbpassword` below with a username and password of your choice. The following commands illustrate the process with a MySQL database.
```
$ mysql  -uroot -p -h 127.0.0.1

$ CREATE DATABASE codetogether;
$ CREATE USER 'ctdbuser'@'%' IDENTIFIED BY 'ctdbpassword';
$ GRANT ALL PRIVILEGES ON codetogether.* TO 'ctdbuser'@'%';
$ FLUSH PRIVILEGES;
$ exit
```

## TLS

To secure CodeTogether, you can add a `secret` that contains your TLS (Transport Layer Security) private key and certificate:

```bash
$ kubectl create secret tls codetogether-tls --key <your-private-key-filename> --cert <your-certificate-filename>
```

## Audio / Video Configuration (CodeTogether v5.0+)

By default, CodeTogether A/V feature is enabled. You can change this at any time in your customized `codetogether-values.yaml` file to turn off Audio/Video in CodeTogether.

If you want to use CodeTogether A/V feature, please ensure that `10000/udp` and `4443/tcp` are available/opened in your network. 

To set the value for `av.serverIP`, you can consider 3 scenarios:
* If the ports are exposed on the same IP address as `server.url`, you can leave `av.serverIP` value set to `auto`.
* If the server name provided by `server.url` is not DNS resolvable - for instance, like being in your home network - you must set `av.serverIP` to that private IP.
* If you are mapping ports 10000/udp and 4443/tcp to a different IP other than the server specified by `server.url`, you may need to set `av.serverIP` to that IP.

Note: CodeTogether will not start if it cannot correctly determine the provided `av.serverIP` setting.


## CodeTogether Dashboard

You can find CodeTogether usage metrics at:

```bash
https://<your-codetogether-server-fqdn>/dashboard
```

If you did not set `dashboard.enabled` to `true`, then the CodeTogether container will generate a random password for you and it will be printed in the pod logs:
```
2021-09-27 22:10 [INFO] This Edge server's metrics dashboard can be accessed at https://<your-codetogether-server-fqdn>/dashboard
with user: <userName>
using a temporary password: <randomGeneratedPassword>
Use CT_DASHBOARD_USER and CT_DASHBOARD_PASSWORD to set explicit values for this deployment.
```

## Pulling out the Chart
Add our CodeTogether repository to your Helm environment and pull our chart:
```bash
$ helm repo add genuitec https://genuitec.github.io/CodeTogether/helm/
```
```bash
$ helm repo list
NAME            URL
genuitec        https://genuitec.github.io/CodeTogether/helm/
```
```bash
$ helm repo update
```
```bash
$ helm pull genuitec/codetogether --untar
```
```bash
$ ls codetogether/
Chart.yaml  LICENSE  README.md  templates  values.yaml
```

## Installing the Chart

As you already know, in `Helm` you can specify a parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install codetogether \
  --set replicaCount=1 \
  --set service.port=8080 \
  ./codetogether
```

However, we strongly recommend to create your own YAML file from the provided `values.yaml` sample file packaged within the chart in order to specify all the actual CodeTogether settings from there - such as your license data, server URL, hostname, etc. Once you have created your own `codetogether-values.yaml` file, then you could check for any possible configuration mistakes without actually deploying CodeTogether yet through the `--dry-run` and/or `--debug` flags:

```bash
$ helm install --dry-run --debug codetogether -f codetogether-values.yaml ./codetogether
```

If the Chart configuration looks good from the above ouput, then you can deploy CodeTogether by running:

```bash
$ helm install codetogether -f codetogether-values.yaml ./codetogether
```
```bash
$ helm list
NAME            NAMESPACE       REVISION        UPDATED                                 STATUS          CHART                   APP VERSION
codetogether    ct            1               2022-01-31 10:45:28.963225621 -0600 CST deployed        codetogether-1.4.0      2022.1.0
```

If you want to see CodeTogether ingress entry points, you could run:

```bash
$ kubectl get ingress
NAME           CLASS    HOSTS                        ADDRESS        PORTS     AGE
codetogether   <none>   <codetogether-server-url>    <ip-address>   80, 443   5m1s
```

## Updating CodeTogether

To deploy newer releases, you can rollout a new revision (upgrade) for CodeTogether by downloading the updated Chart and then running:

```bash
$ helm repo update
$ helm pull genuitec/codetogether --untar
$ helm upgrade codetogether -f codetogether-values.yaml ./codetogether
```

Through Helm you can see the revision history. For instance:
```bash
$ helm history codetogether
REVISION        UPDATED                        STATUS          CHART                   APP VERSION     DESCRIPTION
1               Mon Nov  29 17:52:27 2021      superseded      codetogether-1.2.0      5.0.1           Install complete
2               Mon Jan 31 10:51:40 2022        deployed        codetogether-1.4.0      2022.1.0        Upgrade complete
```

## Uninstalling the Chart

```bash
$ helm uninstall codetogether
```
