Helm Chart for CodeTogether Server (On Premises)
================================================

## Summary

This chart creates a CodeTogether server deployment on a Kubernetes cluster using the Helm package manager.

## Prerequisites

This chart has been created with Helm v3. To use it ensure the following prerequisites are fullfilled :

- Kubernetes 1.9+
- Helm v3

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm repo add crivaledaz http://clavier.iiens.net/helm
$ helm install my-release crivaledaz/codetogether
```

The command deploys CodeTogether on the Kubernetes cluster in the default configuration. The configuration section lists parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm uninstall my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists configurable parameters of the CodeTogether chart and their default values.

| Parameter                    | Description                                                                   | Default                                         |
| ---------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------- |
| `service.type`               | Service type                                                                  | `ClusterIP`                                     |
| `service.port`               | CodeTogether exposed service port                                             | `80`                                            |
| `ingress.annotations`        | Specify ingress class                                                         | `{}`                                            |
| `ingress.enabled`            | Enable ingress controller resource                                            | `false`                                         |
| `ingress.hosts.paths`        | Paths to match against incoming requests.                                     | `'[{'path': '/'}]`                              |
| `ingress.hosts`              | Application hostnames                                                         | `chart-example.local`                           |
| `ingress.tls`                | Ingress TLS configuration                                                     | `[]`                                            |
| `image.repository`           | Container image repository                                                    | `hub.edge.codetogether.com/latest/codetogether` |
| `image.pullPolicy`           | Container image pull policy                                                   | `Always`                                        |
| `image.tag`                  | Container image tag                                                           | `latest`                                        |
| `imagePullSecrets`           | Specify the secret to use to pull image from repository.                      | `[{'name': 'ctcreds'}]`                                        |
| `ressources`                 | Pod resource requests & limits                                                | `{}`                                            |
| `nodeSelector`               | Node labels for pod assignment                                                | `{}`                                            |
| `toleration`                 | List of node taints to tolerate                                               | `[]`                                            |
| `affinity`                   | Affinity for pod assignment                                                   | `{}`                                            |
| `replicaCount`               | Number of replicas                                                            | `1`                                             |
| `nameOverride`               | Override the release name for object created by Helm                          | `""`                                            |
| `fullnameOverride`           | Override the fullname for object created by Helm                              | `""`                                            |
| `serviceAccount.create`      | Whether a new service account name that the agent will use should be created. | `true`                                          |
| `serviceAccount.annotations` | Annotations to add to the service account                                     | `{}`                                            |
| `serviceAccount.name`        | Service account to be used.                                                   | `""`                                            |
| `serverURL`                  | The CodeTogether server URL. Should match the Ingress config, if enabled.     | `http://chart-example.local`                    |
| `trustAllCerts`              | Allow the use of untrusted certifictates.                                     | `true`                                          |
| `license.licensee`           | The license provided by Genuitec.                                             | `Example`                                       |
| `license.maxConnections`     | The maximum connection allowed by the license.                                | `0`                                             |
| `license.expiration`         | The license expiration date.                                                  | `1970/01/01`                                    |
| `license.signature`          | The license signature.                                                        | `123456789abcdef`                               |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install my-release \
  --set replicaCount=2 \
  --set service.port=8080 \
  crivaledaz/codetogether
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install my-release -f values.yaml crivaledaz/codetogether
```

**Note** : This Chart use a container image available on a private repository. You must get credentials from Genuitec to access the repository. To add repository credentials to your cluster, create a secret with the following command :

```bash
$ kubectl create secret docker-registry ctcreds --docker-server=hub.edge.codetogether.com --docker-username=<provided-username> --docker-password=<provided-password>
```
