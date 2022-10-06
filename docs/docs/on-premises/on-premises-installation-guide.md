---
slug: /on-premises-installation-guide
sidebar_label: Installation Overview
sidebar_position: 1
---

import Card from '@site/src/components/Card';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# CodeTogether On-Premises Installation Guide

Roll out CodeTogether internally and keep your source 100% behind your firewall. To use CodeTogether On-Premises, pull down and configure the [CodeTogether On-Premises](https://www.codetogether.com/on-premises/) container. The container provides a full set of collaboration services, including tailored client plugins for the host IDEs.

## Installing CodeTogether

1. Contact [Genuitec Customer Service](https://www.codetogether.com/pricing/on-premises-contact-us/) to obtain your license and registry credentials.

2. Review documents relevant to your On-Premises plan and configuration:
    - [Single Sign-On (SSO) Support](/on-premises/sso/sso.md)—Configuration steps and environment variables that must be configured in the container if using single sign-on integration.
    - [Multi-Server On-Premises Deployment](multi-server-on-premises-deployment.md)—An overview of multi-server CodeTogether deployment if you selected this plan.
    - [CodeTogether Edge Server Technical Notes](edge-server-technical-notes.md)—Advanced configuration and troubleshooting steps, including how to configure load balancers and access log files.

3. Set up your container using your preferred deployment technology:  
<div className="four-section-content">
 <Card
        title="Docker Container"
        description="Deploy via Docker, using the Genuitec Docker Registry or Red Hat Software Catalog"
        to="/on-premises-installation-guide/docker"
        iconl='/img/logos/docker-light.png'
        icond='/img/logos/docker-dark.png'
      />
 <Card
        title="Helm Chart"
        description="Deploy as a Kubernetes pod through a Helm chart"
        to="/on-premises-installation-guide/kubernetes"
        iconl='/img/logos/helm-light.png'
        icond='/img/logos/helm-dark.png'
      />
 <Card
        title="Kubernetes"
        description="Deploy as a Kubernetes pod through a deployment file"
        to="/on-premises-installation-guide/kubernetes#deploying-as-a-kubernetes-pod-through-a-deployment-file-deprecated"
        iconl='/img/logos/kubernetes-light.png'
        icond='/img/logos/kubernetes-dark.png'
      />
 <Card
        title="Red Hat OpenShift"
        description="Deploy as an OpenShift pod using the Red Hat Software catalog"
        to="https://catalog.redhat.com/software/containers/genuitec/codetogether/5fbbdc772937386820426f55?container-tabs=gti&gti-tabs=registry-tokens"
        iconl='/img/logos/openshift-light.png'
        icond='/img/logos/openshift-dark.png'
      />
</div>
4. Download pre-configured plugins and extensions for your IDEs from your on-premises server. These will be automatically updated when you update CodeTogether.

    :::tip

    Use the metrics dashboard for access to real-time information and historical usage trends. Refer to [Using the On-Premises Dashboard](using-the-on-premises-dashboard.md) for more information.

    ![Metrics Dashboard](/img/on-premises-installation-guide/dashboard627X298.png)

    :::

## Security
Due to security requirements, all communication in CodeTogether is required to be done via TLS, in addition to end-to-end encryption at the application layer. Besides strictly following secure coding practices, every CodeTogether build is scanned using vulnerability checking tools like Snyk and Trivy. Penetration tests are frequently run on our container, ensuring that it is not susceptible to vulnerabilities and attacks. We build on the Red Hat UBI minimal image and our security audited listing can be found in the [Red Hat Software Catalog](https://catalog.redhat.com/software/containers/genuitec/codetogether/5fbbdc772937386820426f55).

## Additional Resources
If you have any questions, email [support@genuitec.com](mailto:support@genuitec.com) or contact your Genuitec Sales representative. You can also visit our [Gitter community](https://gitter.im/CodeTogether-com/community).

For answers to common questions, refer to the [On-Premises FAQ](../faqs/on-premises-faq.md).