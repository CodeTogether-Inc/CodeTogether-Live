---
slug: /on-premises-faq
sidebar_label: On-Premises FAQ
sidebar_position: 2
---

# CodeTogether On-Premises FAQ

## General Information

<details>
  <summary>Does CodeTogether have an On-Premises version?</summary>

Yes, an [On-Premises](https://www.codetogether.com/on-premises/) version of CodeTogether is available for Enterprise customers via a container image. The container provides a full set of collaboration services, including tailored client plugins for the host IDEs. See the [CodeTogether On-Premises Installation Guide](../on-premises/on-premises-installation-guide.md) for details.

</details>

<details>
  <summary>How frequently is the On-Premises version updated?</summary>

On-Premises updates are in sync with updates to our public SaaS service, which are typically 6 to 8 weeks apart. However, you are not forced to follow this schedule and can update when desired.

</details>

<details>
  <summary>Is CodeTogether compliant with the General Data Protection Regulation required by the EU?</summary>

On-Premises usage of CodeTogether does not share nor capture any information that Genuitec has access to. In addition, the edge servers themselves as used in CodeTogether do not store information. Any extra requirements for internal software usage may still apply but is out of Genuitec’s scope.

</details>

## Licensing

<details>
  <summary>Do you offer a trial version?</summary>

We are happy to offer a free 45 day trial. Contact [customer service](https://www.codetogether.com/pricing/on-premises-contact-us/) to get your license.

</details>

<details>
  <summary>What is the cost of the On-Premises version?</summary>

The Enterprise On-Premises plan starts at US$1750/year and can be tailored to meet your specific needs. For details, see [CodeTogether Plans & Pricing](https://www.codetogether.com/pricing/).

</details>

<details>
  <summary>Your On-Premises licensing is based on simultaneous connections, what does that mean?</summary>

Simultaneous connections refers to the number of people that can be part of a session on the server at the same time. For example, if you are licensed for 25 simultaneous connections, 25 people can be in the session; it doesn’t matter if they are hosts or participants, or in one session or several.

</details>

## Configuration

<details>
  <summary>What hardware do we need to run a CodeTogether server?</summary>

The CodeTogether service does not require a very powerful system—it’s more of a lightweight relay and coordinating box. For some context, we run our service on a t3a.medium Amazon EC2 instance, which is essentially a dual core 2.5Ghz processor with 4 GB of memory. This box routinely handles over 250 simultaneous connections, and it could probably handle a bit more.

</details>

<details>
  <summary>How do I configure the On-Premises version?</summary>

Pull down the Docker image from Genuitec’s Private Docker Registry or our security-audited listing in the [Red Hat Software Catalog](https://catalog.redhat.com/software/containers/genuitec/codetogether/5fbbdc772937386820426f55), and then run the CodeTogether On-Premises container with straight-up Docker or Kubernetes. For detailed instructions, see [CodeTogether On-Premises Installation Guide](../on-premises/on-premises-installation-guide.md)

</details>

<details>
  <summary>I have several Code Together servers, is there an integrated load balancer or do I need a personal load balancer?</summary>

As of version 2022.1, CodeTogether does support multi-server deployments for load balancing, and lower latency in regional deployments. See the [CodeTogether On-Premises Installation Guide](../on-premises/on-premises-installation-guide.md) for details.

</details>

## Technical Details

<details>
  <summary>Is single sign-on (SSO) supported?</summary>

CodeTogether 4.0 introduced [single sign-on (SSO) integration](../on-premises/sso.md) for on-premises installations. If the SSO provider supports the OpenID Connect protocol for sign on, on-premises installations can allow CodeTogether access to users only if they’ve been authorized by the provider. The OIDC protocol ensures CodeTogether works with providers like Okta, Azure AD, Microsoft AD FS, Auth0, Oracle and Keycloak.

</details>

<details>
  <summary>What is the base of the Docker image?</summary>

The base is RedHat UBI 8.

</details>

<details>
  <summary>Does CodeTogether use single or multi-tenant architecture?</summary>

The On-Premises version of CodeTogether uses single tenant architecture.

</details>

<details>
  <summary>Is it possible to operate CodeTogether in a completely air-gapped environment?</summary>

Yes, CodeTogether On-Premises is perfect for an air-gapped environment. It does not connect with any external servers, including our own.

</details>

<details>
  <summary>How do the clients communicate with the server?</summary>

Clients use both HTTPs and Websockets to communicate with the CodeTogether server.

</details>

## Security

<details>
  <summary>What type of encryption does CodeTogether use?</summary>

In addition to encryption using TLS 1.3./SHA 256 at the transport layer, CodeTogether also has end-to-end encryption between the host and participants using AES-GCM. [Learn more](https://www.codetogether.com/download/security/)

</details>

<details>
  <summary>What measures are taken to keep CodeTogether secure?</summary>

Besides strictly following secure coding practices, every build is scanned using vulnerability checking tools like Snyk, Trivy, etc. Penetration tests are frequently run on our container, ensuring that it is not susceptible to vulnerabilities and attacks. Our security audited listing can be found in the [Red Hat Software catalog](https://catalog.redhat.com/software/containers/genuitec/codetogether/5fbbdc772937386820426f55).

</details>

<details>
  <summary>Who has remote access to the environment for operational/support purposes?</summary>

For our On-Premises offering, only your organization has access.

</details>

<details>
  <summary>What type of authentication is required to host or join a session?</summary>

If an SSO provider is used (optional), then hosts and guests must authenticate before being able to use any CodeTogether services. Beyond SSO, only the internal URL of the CodeTogether server is needed to host a session with the On-Premises version. Participants join sessions using a URL shared directly by the host and the URL changes with each session. See [Using CodeTogether Teams](../user-guides/codetogether-teams.md)) for additional joining options.

</details>

<details>
  <summary>What information is CodeTogether looking at?</summary>

The On-Premises version of CodeTogether is located on your server and does not connect to any external servers. CodeTogether looks at the files in the development workspace and transfers those files as needed between members of the session to enable its core function of shared coding. However, participants do not retain these files after the session is closed. Only the files being actively edited are shared. For the rest, CodeTogether only shares file and directory names so that the workspace views and project trees can be displayed in the collaborative environments.

With end-to-end encryption always in place, your on-premises server never sees the contents of the file so it never stores any of these encrypted files. The server simply moves files between participants. CodeTogether also transfers validation markers, quick fix information, and content assist suggestions between members of the session to facilitate the primary function of collaborative coding.

</details>

## Contact Us

<details>
  <summary>What if I didn’t see the answer to my question?</summary>

For technical questions, the easiest way to connect with us is via our [Gitter community](https://gitter.im/CodeTogether-com/community). You can also email us at support@codetogether.com.

For general information or sales questions, contact customer service at info@codetogether.com. You can also contact us via phone at +1.214.614.8328 or +1.888.914.6620.

You can also reach out to us on [Twitter](https://twitter.com/Genuitec), [Facebook](https://www.facebook.com/Genuitec/) or [LinkedIn](https://www.linkedin.com/company/genuitec-llc).

</details>