---
slug: /on-premises-installation-guide/fargate-ecs
---

# Running on AWS Fargate (ECS)

AWS Fargate is technology that you can use to run containers with Amazon ECS, without having to manage servers or clusters of EC2 instances. Read [What is AWS Fargate](https://docs.aws.amazon.com/AmazonECS/latest/userguide/what-is-fargate.html) for more details. 

:::note
Fargate can be used with both Amazon ECS and Amazon EKS; this document covers the use of Fargate with ECS. Read our [Installation via Docker](docker.md) guide before reading this documentation.
:::

### Configure AWS CLI to Interact with ECR

Please read [Installing or updating the latest version of the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and [Configuration and credential file settings](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) to install and configure the AWS CLI. 

You should be able to run the `aws configure` command to set/view your credentials, an example is below:

```bash
$ aws configure
AWS Access Key ID [None]: <yourAccessKeyID>
AWS Secret Access Key [None]: <yourSecretKey>
Default region name [None]: <yourAccount-Region>  (for instance = us-west-2)
Default output format [None]: <yourOutputFormatPreference> (for instance = json)
```

## Pushing CodeTogether Image to ECR

### 1. Create Private Repository

From the [ECR console](https://console.aws.amazon.com/ecr/), create a private repository. You could use `codetogether` as the repository name, and leave other settings at their default values.

Observe the URL for the created repository, which should be something like:  
`<account-id>.dkr.ecr.<account-region>.amazonaws.com/<repository-name>`

### 2. Build CodeTogether Image

Build your CodeTogether image with the proper settings such as license info, server URL, etc. Please refer to the [Docker guide](docker.md) for details.

:::note
If you're enabling A/V support, please specify the following environment variables and values:
CT_AV_LAN_IP "aws"
CT_AV_LOCAL_IP "fargate""

If you mean to use CodeTogether directly from AWS Fargate (i.e., without any front-end Web server), make sure you are adding container's SSL port (1443) to your build Dockerfile as:
`ENV CT_SERVER_URL https://SERVERFQDN:1443`
:::

Build your CodeTogether image:

```bash
$ docker build -t "codetogether:local" -f Dockerfile .
```

### 3. Log In to the Registry

Use your ECR credentials to log in to your private registry. Ensure you get a `Login Succeeded` message.

```bash
$ aws ecr get-login-password --region <yourAccountRegion> \
         | docker login \
         --username AWS \
         --password-stdin <account-id>.dkr.ecr.<account-region>.amazonaws.com/<repository-name>
```

### 4. Push CodeTogether Image

Tag your image and push it to ECR.

```bash
$ docker tag <image-name>:<image-version> <account-id>.dkr.ecr.<account-region>.amazonaws.com/<repository-name>/<image-name>:<image-version>
$ docker push <account-id>.dkr.ecr.<account-region>.amazonaws.com/<repository-name>/<image-name>:<image-version>
```

## Create a Fargate Task Definition

From the [Amazon ECS console](https://console.aws.amazon.com/ecs/), choose **Task Definitions** from the navigation pane and create a new task definition. 

Select **FARGATE** as the launch type and use the following values in the task definition:

| Field                   | Value                 |
| -----------             | -----------           |
| Task definition name    | codetogether-td       |
| Task role               | ecsTaskExecutionRole  |
| Operating system family | Linux                 |
| Task execution role     | ecsTaskExecutionRole  |
| Task memory             | 2GB                   |
| Task CPU                | 1 vCPU                |

Click **Add container** and specify the following:

| Field                   | Value                 |
| -----------             | -----------           |
| Container name          | <whatever was used in the `docker build` command> |
| Image                   | `<account-id>.dkr.ecr.<account-region>.amazonaws.com/<repository-name>/<image-name>:<image-version>` |
| TCP port mappings       | 1443,4443             |
| UDP port mappings       | 10000                 |

You can also override any CodeTogether environment values (`CT_LICENSEE, CT_AV_ENABLED`, etc.), if required.  
Once done, click **Add** to add the container, and then **Create** to complete creation of the task definition.

## Create an ECS Cluster & Service

Choose **Clusters** from the navigation pane and create a new cluster. Choose the **Networking only** cluster template, giving it a name like `codetogether`.

From the **Services** tab, create a new Service, and use the following values:

| Field                   | Value           |
| -----------             | -----------     |
| Launch type             | Fargate         |
| Operating system family | Linux           |
| Task definition         | codetogether-td |
| Platform version        | 1.3.0           |
| Service name            | codetogether-svc|
| Number of tasks         | 1               |

Go to the next step, and select your cluster VPC and subnets.  

Choose to create a new **Security Group** with the following values:

| Field       | Value                             |
| ----------- | -----------                       |
| Name        | codetogether-sg                   |
| Description | CodeTogether incoming connections |
| Custom TCP  | 1443                              |
| Custom TCP  | 4443 (if A/V enabled)             |
| Custom UDP  | 10000 (if A/V enabled)            |

Save the security group.

On the next step, **Auto Scaling**, choose *not* to adjust the service's desired count. 

You can now proceed through to the end of the service creation process to create and then view the service.

## Access Running CodeTogether Container

### Obtaining the Container's Public IP
Get the public IP for your container from **Clusters > codetogether > Task (tab)** and clicking on the created task link. From the **Details** tab, confirm that the **Last status** is **RUNNING**. From the **Network** section, find your container's public IP value.

### Accessing the Container

If you are evaluating Codetogether Live locally (private URL), make sure you are using an `/etc/hosts` mapping, which maps your container's public IP to the CT_SERVER_URL value you specified.

If you are evaluating Codetogether Live with a public URL, add a DNS record that maps your container's public IP to the CT_SERVER_URL value you specified. Then, if you are not using a front-end Web server, you can reach your CodeTogether Dashboard at `https://<CT_SERVER_URL>:1443/dashboard`

## Check Container Log

In the same **Details** tab, find the **Containers** section. Expand the codetogether container and click the **View logs in CloudWatch** link. In the newly opened tab/window, you will see the CodeTogether container's activity.

```bash
2021-12-15T14:53:06.168-06:00    Setting customized time zone >> America/Chicago
2021-12-15T14:53:06.171-06:00    2021-12-15 14:53 [INFO] CodeTogether v5.0.1-01149
2021-12-15T14:53:06.171-06:00    2021-12-15 14:53 [INFO] Use of this software is governed under the CodeTogether End User License Agreement.
2021-12-15T14:53:06.171-06:00    2021-12-15 14:53 [INFO] Disabling A/V communication channels in CodeTogether sessions.
2021-12-15T14:53:06.179-06:00    2021-12-15 14:53 [INFO] Starting CodeTogether Web server ...
...
```