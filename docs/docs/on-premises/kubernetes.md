---
slug: /on-premises-installation-guide/kubernetes
sidebar_label: Install via Kubernetes
sidebar_position: 3
---

# CodeTogether On-Premises Installation via Kubernetes

Helm charts greatly simplify the installation of CodeTogether on Kubernetes. Our chart incorporates Kubernetes best practices and is the recommended way of installing CodeTogether going forward. If you do not use Helm, you may skip to the [next section](#deploying-as-a-kubernetes-pod-through-a-deployment-file-deprecated), though please note that this method of installation is deprecated, and the documentation is not being maintained.

## Deploying as a Kubernetes Pod Through a Helm Chart

### Add the CodeTogether Chart Repository

Add CodeTogether’s chart repository to Helm, verify that it shows up in the chart repository list.
 
```bash
# helm repo add genuitec https://genuitec.github.io/CodeTogether/helm/
# helm repo list
NAME            URL
genuitec        https://genuitec.github.io/CodeTogether/helm/
```

### 2. Pull the Chart

Pull the chart and verify that it has been correctly downloaded.

```bash
# helm repo update
# helm pull genuitec/codetogether --untar
# ls codetogether/
Chart.yaml  LICENSE  README.md  templates  values.yaml
```

### 3. Create the Values YAML File

Create your own `values.yaml` file (e.g., `my-env-values.yaml`) from the one packaged within our CodeTogether chart. 

**Please refer to our chart’s [official documentation](https://artifacthub.io/packages/helm/codetogether/codetogether) at ArtifactHub for details on the values you can set.** A sample values file can be found in [Appendix A](#appendix-a-sample-helm-values-file). Fill out mandatory values like your CodeTogether license, and configure the hostname, service URL, ports, SSO settings, etc., that correspond with your running environment.

:::note Important

When configuring your server, it is important for the SSL configuration that the backend is referenced by a hostname that matches the SSL certificate. Connecting to the backend simply by IP address will not work reliably from clients. In addition, connections by a simple http:// connection will not work as expected as the Browser client requires access to secure crypto-APIs which are not available in insecure web connections.

:::

### 4. Install/Update the Chart

Deploy the CodeTogether chart through Helm, using the untarred chart and your customized `values.yaml` file.

```bash
# helm install codetogether -f my-env-values.yaml ./CodeTogether
```

To update an existing CodeTogether deployment, instead of running the `install` command, use the `upgrade` command.

```bash
# helm upgrade codetogether -f my-env-values.yaml ./CodeTogether
```

:::note

CodeTogether chart deploys an Ingress component as part of its default configuration. If you keep this setting enabled, make sure you have the Ingress component already enabled in your Kubernetes platform. Refer to your official Kubernetes provider documentation on how to achieve/verify this.

:::

### 5. Download Preconfigured Clients for CodeTogether

If DNS is fully configured, it is now possible to connect to https://SERVERFQDN/clients and download the preconfigured clients to be used on your systems. This manual plugin/extension installation is required only for the first time. When you update your on-premises distribution to a newer version of CodeTogether, the IDE plugins/extensions will be updated automatically. In Visual Studio Code, the extension will be updated when you start the IDE. For IntelliJ and Eclipse, you can use Help > Check for Updates and/or the plugin will be automatically updated based on your IDE’s update settings.

:::note

We do not recommend using the publicly available versions of the CodeTogether plugins/extension within your IDEs. The versions available on your on-premises server are preconfigured to connect to your server. This will also ensure the plugins/extensions used are compatible with the version of CodeTogether you have deployed.

:::  

![CodeTogether Download](/img/kubernetes/ct-on-prem-downloadsx1014.png)

## Resources

Refer to the following resources to get the most from CodeTogether:

- [Getting Started Guide](../user-guides/getting-started-with-codetogether.md)—Learn how to host and join collaborative coding sessions.
- [Using the On-Premises Dashboard](using-the-on-premises-dashboard.md)—Access to real-time information and historical usage trends.
- [CodeTogether Edge Server Technical Notes](edge-server-technical-notes.md)—Helpful information, including how to access log files.

![Metrics Dashboard](/img/kubernetes/dashboard627X298.png)

## Deploying as a Kubernetes Pod Through a Deployment File (Deprecated)

To use Kubernetes with CodeTogether, only a single container can be used per edge server. The following example YAML file includes guidance on how to configure the Ingress, Secrets, Service and Container that are required to run CodeTogether in K8s.

In the example below, the Ingress configuration and accompanying SSL certificate configuration may be skipped if this is being separately managed by your organization. As each organization’s usage of K8s may vary, no assumption has been made on the type of Ingress.

The following instructions use the Genuitec Docker Registry. If you prefer to use the Red Hat Software Catalog instead, substitute credentials and container path as mentioned [here](https://catalog.redhat.com/software/containers/genuitec/codetogether/5fbbdc772937386820426f55?container-tabs=gti&gti-tabs=red-hat-login).

### 1. Download the codetogether.yaml File

To get started with Kubernetes, download the [codetogether.yaml](https://www.codetogether.com/wp-content/uploads/2020/08/codetogether.yaml) file. This includes the required services & containers needed for CodeTogether to run via Kubernetes. [View full source](#appendix-b-codetogetheryaml)

:::note

This file has been tested with Kubernetes 1.18, which is the same version used by RedHat’s OpenShift Container version 4.5. Version 1.18 included changes that may not be compatible with older versions of Kubernetes.

:::

### 2. Set Up Credentials to CodeTogether Docker Hub

Run the following command to register the required credentials for Kubernetes to be able to download the required Docker image for the CodeTogether Edge Server.

```bash
<strong># kubectl create secret docker-registry ctcreds ∖</strong>
    --docker-server=hub.edge.codetogether.com ∖
    --docker-username=<your-name> ∖
    --docker-password=<your-pword>
```

### 3. Prepare SSL Certificate for Ingress

In a Bash or similar compatible shell, execute the following instructions to convert your SSL key and certificate for configuration for the secure Ingress to your container.

This step can be skipped if configuring Ingress separately.

```bash
<strong># cat ssl.crt | base64 -w 0</strong>
# cat ssl.key | base64 -w 0
```

### 4. Update codetogether.yaml with CodeTogether License

In the Secret section in the YAML file, update with the exact values for the CodeTogether license as provided by your Genuitec Sales Representative.

### 5. Update codetogether.yaml with SSO Configuration (Optional)

If you'd like to set up SSO integration, see [Single Sign-On (SSO) Support](/on-premises/sso/sso.md) for configuration steps and additional variables that must be configured in the secret section of your YAML file.

### 6. Update codetogether.yaml with SSL Configuration

Using the base64 encoded Cert and Key calculated above, paste in the values into the Secret section of the YAML file. If preferred, the Secret can be configured from command line and does not require maintenance in the YAML file.

:::note Important

When configuring your server, it is important for the SSL configuration that the backend is referenced by a hostname that matches the SSL certificate. Connecting to the backend simply by IP address will not work reliably from clients. In addition, connections by a simple http:// connection will not work as expected as the Browser client requires access to secure crypto-APIs which are not available in insecure web connections.

:::

### 7. Load the Configuration into Kubernetes

To start using CodeTogether, activate the configuration in the local Kubernetes deployment, or configure on the remote server using the now-customized YAML file.

```bash
# kubectl create -f ./codetogether.yaml
``` 

If later you need to reconfigure the services, the simplest (though least efficient) way to do so is via the following:

```bash
# kubectl replace --force -f codetogether.yaml
```

### 8. Check IP Address of Ingress

Once starting the container, you can now verify the IP Address that the Ingress is configured to listen on using the following command.

```bash
<strong># kubectl get ingress</strong>
```

### 9. Download Preconfigured Clients for CodeTogether

If DNS is fully configured, it is now possible to connect to `https://SERVERFQDN/clients` and download the preconfigured clients to be used on your systems.

This manual plugin/extension installation is required only for the first time. When you update your on-premises distribution to a newer version of CodeTogether, the IDE plugins/extensions will be updated automatically. In Visual Studio Code, the extension will be updated when you start the IDE. For IntelliJ and Eclipse, you can use **Help > Check for Updates** and/or the plugin will be automatically updated based on your IDE’s update settings.

:::note

- We do not recommend using the publicly available versions of the CodeTogether plugins/extension within your IDEs. The versions available on your on-premises server are preconfigured to connect to your server. This will also ensure the plugins/extensions used are compatible with the version of CodeTogether you have deployed.
- If needed for local testing, the IP address returned above can be added to /etc/hosts mapping to the name configured in the certificate to allow testing to proceed.

:::

![CodeTogether Download](/img/kubernetes/ct-on-prem-downloadsx1014.png)

## Appendix A: Sample Helm Values File

```yaml showLineNumbers
#
# Kubernetes required version: v1.18.0+
#
# Example 'values.yaml' file for running CodeTogether On-Premises.
# Use this file as a template to create your own 'codetogether-values.yaml' file.
# For full detail on the chart's prerequisites, settings and configuration, please refer to our official Helm repository at:
#   https://artifacthub.io/packages/helm/codetogether/codetogether
#

appMeta:
  name: codetogether

#
# Specify CodeTogether version
#
image:
  tag: latest
  pullPolicy: Always

#
# Enable this ONLY if you are using OpenShift
#
openshift:
  enabled: false

#
# CodeTogether license (provided by your Genuitec Sales Representative)
#
license:
  licensee: "Example"
  maxConnections: "0"
  expiration: "1970/01/01"
  signature: "123456789abcdef"

#
# Enable and set your desired HTTP Auth credentials to access CodeTogether '/dashboard' area
#
dashboard:
  enabled: false 
  username: "my-dashboard-username"
  password: "my-dashboard-password"

#
# Set your SSO Provider configuration (optional)
#
sso:
  # Set this to 'true' if you are using an SSO provider
  enabled: false

  # Set this value to 'true' if you are using Oracle IDCS OpenID Connect
  jwksEndPointEnabled: false

  # Replace below values with your actual SSO provider configuration
  provider: OKTA
  systemBaseUrl: https://OKTA_DOMAIN/oauth2/default
  clientID: "my-oidc-id"
  clientSecret: "my-id-secret"

#
# Replace the below example 'codetogether.local' hostname with your server's FQDN
#
ingress:
  enabled: true
  hosts:
    - host: codetogether.local
      paths:
      - path: /
        backend:
          serviceName: codetogether.local
          servicePort: 443
  tls:
    - secretName: codetogether-tls
      hosts:
        - codetogether.local

#
# Replace the below example hostname with your server's FQDN (HTTPS is mandatory for CodeTogether)
#
server: 
  url: https://codetogether.local
  trustAllCerts: "true"
  # Set a customized TZ for CodeTogether container (default is UTC)
  # https://nodatime.org/TimeZones
  timeZone: 
    enabled: false
    region: "America/Chicago"

service:
  type: ClusterIP
  port: 443

#
# Metrics collecting (optional - example for Graphite)
#
collectMetrics:
  enabled: false
  statsdHost: "https://my-graphite-fqdn"
  statsdPort: "8125"
  statsdProtocol: "UDP"
  prometheusEnabled: false
```

## Appendix B: codetogether.yaml

```yaml showLineNumbers
#========================================================================
# Secret: CodeTogether License Values
# ========================================================================
apiVersion: v1
kind: Secret
metadata:
  name: codetogether-license
  namespace: default
type: Opaque
stringData:
  # Configure as needed for your deployment, should match your SSL certificate
  CT_SERVER_URL: "https://SERVERFQDN"
  CT_TRUST_ALL_CERTS: "true"
  # Provided by your Genuitec Sales Representative
  # *values must match exactly
  CT_LICENSEE: "Your Company"
  CT_MAXCONNECTIONS: "0"
  CT_EXPIRATION: "2020/01/01"
  CT_SIGNATURE: "xXM3awzG...619bef4"
---
#========================================================================
# Secret: SSO Values (mandatory ONLY if you are using an SSO Provider)
# ========================================================================
apiVersion: v1
kind: Secret
metadata:
  name: codetogether-sso
  namespace: default
type: Opaque
stringData:
  # Configure as needed for your deployment, should match your SSO provider. Okta example below
  CT_SSO_PROVIDER: "OKTA"
  CT_SSO_AUTHORIZATION_ENDPT: "https://OKTA_DOMAIN/oauth2/default"
  CT_SSO_TOKEN_ENDPT: "https://OKTA_DOMAIN/oauth2/default/v1/token"
  CT_SSO_CLIENT_ID: "0oa..............5d6"
  CT_SSO_CLIENT_SECRET: "tsatRI..............................hTNw"
---
# ========================================================================
# Secret: SSL Key and Certificate for SSL used by Ingress
# ========================================================================
apiVersion: v1
kind: Secret
metadata:
  name: codetogether-sslsecret
  namespace: default
type: kubernetes.io/tls
data:
  # value from "cat ssl.crt | base64 -w 0"
  tls.crt: "LS0tLS1CRUdJTi...UZJQ0FURS0tLS0tDQo="
  # value from "cat ssl.key | base64 -w 0"
  tls.key: "LS0tLS1CRUdJTi...EUgS0VZLS0tLS0NCg=="
---
# ========================================================================
# Ingress: Expose the HTTPS service to the network
# ========================================================================
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: codetogether
spec:
  tls:
  - hosts:
      - SERVERFQDN
    secretName: codetogether-sslsecret
  rules:
  - host: SERVERFQDN
    http:
      paths:
      - path: /
        backend:
          serviceName: codetogether
          servicePort: 80
---
# ========================================================================
# Service: Map the HTTP port from the container
# ========================================================================
apiVersion: v1
kind: Service
metadata:
  name: codetogether
  labels:
    run: codetogether
spec:
  ports:
  - port: 80
    name: http
    targetPort: 1080
    protocol: TCP
  selector:
    run: codetogether
---
# ========================================================================
# Deployment: Configure the Container Deployment
# ========================================================================
apiVersion: apps/v1
kind: Deployment
metadata:
  name: codetogether
  namespace: default
spec:
  selector:
    matchLabels:
      run: codetogether
  replicas: 1
  template:
    metadata:
      labels:
        run: codetogether
    spec:
      containers:
      - name: codetogether
        image: hub.edge.codetogether.com/latest/codetogether:latest
        imagePullPolicy: Always
        ports:
        - containerPort: 1080
        env:
        - name: CT_LOCATOR
          value: "none"
        - name: CT_SERVER_URL
          valueFrom:
              secretKeyRef:
                name: codetogether-license
                key: CT_SERVER_URL
        - name: CT_TRUST_ALL_CERTS
          valueFrom:
              secretKeyRef:
                name: codetogether-license
                key: CT_TRUST_ALL_CERTS
        - name: CT_LICENSEE
          valueFrom:
              secretKeyRef:
                name: codetogether-license
                key: CT_LICENSEE
        - name: CT_MAXCONNECTIONS
          valueFrom:
              secretKeyRef:
                name: codetogether-license
                key: CT_MAXCONNECTIONS
        - name: CT_EXPIRATION
          valueFrom:
              secretKeyRef:
                name: codetogether-license
                key: CT_EXPIRATION
        - name: CT_SIGNATURE
          valueFrom:
              secretKeyRef:
                name: codetogether-license
                key: CT_SIGNATURE
      imagePullSecrets:
      - name: ctcreds
```