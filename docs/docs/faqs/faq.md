---
slug: /faq
sidebar_label: General FAQ
sidebar_position: 1
---

# CodeTogether FAQ


## Security

  👀 See [CodeTogether Security](https://www.codetogether.com/download/security) for more details

<details>
  <summary>Is my code stored on CodeTogether’s servers?</summary>

No, our servers only relay data between members in a shared session. We do not store any relayed data. The code permanently resides only on the host and files being worked on are stored in temporary in-memory storage on the clients.

</details>

<details>
  <summary> I want to be sure my code is seen only by those I invite to a session. Does CodeTogether use end-to-end encryption?</summary>

Yes, your code is end-to-end encrypted with a key known only to members of the session, and this key changes every session. If our server were to be somehow compromised, there would be no way to decrypt data to get to your source code. Your source cannot be read by, and is never stored on, CodeTogether’s servers.

</details>

<details>
  <summary> Is the Audio/Video bridge encrypted?</summary>

  A/V communications use encrypted WebRTC channels that are independent from CodeTogether session services. Due to limitations in how browsers currently support WebRTC, these communications are not end-to-end encrypted. In the unlikely event of these channels being compromised, as they are independent of the regular CodeTogether session, they can never expose access to the source code or your CodeTogether session in any way. 

</details>

<details>
  <summary> What data is actually relayed in a collaborative session?</summary>

  Only the files being actively edited have their contents transmitted. For the rest of the workspace, only file names and paths are relayed so that the project/workspace structure is visible to all in the session. Requests/responses for language features like content assist, validation, navigation and code analysis are also transmitted. All this data is end-to-end encrypted.

</details>

<details>
  <summary> What information does CodeTogether store?</summary>

We store IP address, IDE type, usernames and session duration for the purpose of license enforcement and server health/performance monitoring.

</details>

<details>
  <summary> How do you ensure CodeTogether is free from vulnerabilities?</summary>

Each CodeTogether build is automatically scanned for vulnerabilities using Snyk, Trivy, and Dependency-check. We also perform rigorous code audits as part of every release to specifically ensure that there are no unexpected data transmissions and no leakage of unencrypted customer code. This includes an inspection of data packets transmitted by all members in a collaborative session.

</details>

<details>
  <summary> Can I prevent participants from being able to edit in a session?</summary>

Yes, this feature was added in CodeTogether 3.1. When starting a session, the host is prompted to choose if participants will have editing privileges. CodeTogether [Teams](https://www.codetogether.com/teams/), introduced in 4.0, allows you to restrict access based on team members vs. non-team members.

</details>

<details>
  <summary> Can I prevent the entire workspace/project from being shared in a session?</summary>

Yes. To exclude files, folders or projects from the CodeTogether session, right-click on the resource and select **Add to CodeTogether Ignore**. You can also edit the `.codetogether.ignore` file manually and use glob patterns. See [Getting Started with CodeTogether](../user-guides/getting-started-with-codetogether.md#ignore) for details.

</details>

<details>
  <summary> We would like to have a private instance of CodeTogether running behind our firewall. Do you support this?</summary>

Yes, we do have an [on-premises version](https://www.codetogether.com/on-premises/). 

</details>

<details>
  <summary> How can I configure my firewall to allow CodeTogether to function?</summary>

CodeTogether uses the following domains and ports: 

| Domain                  | Ports    | Protocols          |
|-------------------------|----------|--------------------|
| go.codetogether.com     | 443      | HTTPS              |
| *.edge.codetogether.com | 80 / 443 | HTTPS / WebSockets |
| *.edge.codetogether.com | 4443     | TCP                |
| *.edge.codetogether.com | 10000    | UDP                |

Ensure these ports are accessible.

</details>

<details>
  <summary> Is single sign-on (SSO) supported?</summary>

CodeTogether 4.0 introduced [single sign-on (SSO)](/on-premises/sso/sso.md) integration for on-premises installations. If the SSO provider supports the OpenID Connect protocol for sign on, on-premises installations can allow CodeTogether access to users only if they’ve been authorized by the provider. The OIDC protocol ensures CodeTogether works with providers like Okta, Azure AD, Microsoft AD FS and Auth0.

</details>

## Functionality

---

👀 See the [Getting Started Guide](../user-guides/getting-started-with-codetogether.md) for more details.

<details>
  <summary>Can I join a session from an IDE?</summary>

Yes, this [feature](https://www.codetogether.com/docs/codetogether-ide-to-ide-support/) was introduced in CodeTogether 3.0. Hosts and guests can use Eclipse, IntelliJ, or VS Code, as well as IDEs based on them. Everyone in a session can remain in their IDE, even if it is different than the IDE used by others in the session.

</details>
<details>
  <summary>If I join from an IDE, will I get language support for languages my IDE doesn’t inherently support?</summary>

Yes, language capabilities such as content assist, validation, quick fixes, code analysis and navigation come from the host IDE, so as long as the host is capable, your IDE will be too. Conversely, your IDE’s language features will not be available for files shared by the host.

</details>
<details>
  <summary>Why is the syntax highlighting for a shared file different from the native highlighting for that same language in my IDE?</summary>

In order to provide collaborative features, CodeTogether uses a custom editor for shared files instead of your IDE’s native editor. This is why the colors may not be exactly the same; we are working to minimize these differences.

</details>
<details>
  <summary>Can multiple members edit at the same time?</summary>

Yes, multiple members in a session can edit code at the same time, even in the same file.

</details>
<details>
  <summary>Is CodeTogether good for mob programming?</summary>

Yes! Participants can work solo, paired, as a mob, or any combination. Each session can include any number of dynamic groups.

</details>
<details>
  <summary>When I type, everyone in the session follows me. How do I code without disrupting others?</summary>

When you use a personal cursor, you don't disrupt others in the session. Based on session settings, you may be able to choose your initial cursor mode when you join a session, or select **Go to your own cursor** in the **CodeTogether** view at any time during the session.

</details>
<details>
  <summary>How do I rejoin a group?</summary>

In the **CodeTogether** view, click the virtual cursor you would like to share.

</details>
<details>
  <summary>When I’m looking at code, my editor suddenly jumps to a different file/location. Why does this happen?</summary>

When sharing a cursor with a group that has an active driver, you can break away to make quick edits or inspect other code. You remain in the group, and after you stop editing for a short time, you return to the driver’s location. This allows you to make quick changes without disrupting the flow of others who share the same virtual cursor. However, if you would like to code or browse independently, you can always choose to [code alone](../user-guides/session-basics.md#driver) with your own cursor.

</details>
<details>
  <summary>Can participants see console output?</summary>

Yes, this feature was added in CodeTogether 3.1. Console output on the host is visible to all participants from the appropriate view: the **Console** view in Eclipse, the **Run** view in IntelliJ, or the **Output** view in VS Code or a browser.

</details> 
<details>
  <summary>Is there a shared terminal?</summary>

Yes, read-only [terminal support](../user-guides/participating-in-a-session.md/#terminal) is available if the host allows it. In addition, the host can give write access to participants with a [Teams](https://codetogether.com/teams) or [On-Premises](https://www.codetogether.com/on-premises/) plan.

</details>
<details>
  <summary>Can guests run unit tests and launches?</summary>

Yes, support for [running tests and launches](../user-guides/running-tests-and-launches.md) was introduced in version 4.2. Access can be restricted with a [Teams](https://codetogether.com/teams) or [On-Premises](https://www.codetogether.com/on-premises/) plan.

</details>
<details>
  <summary>Is it possible for participants to access a web app running on the host?</summary>

Yes, support for [shared servers](../user-guides/participating-in-a-session.md/#servers) was introduced in version 4.1 for users with a [Teams](https://codetogether.com/teams) or [On-Premises](https://www.codetogether.com/on-premises/) plan.

</details>
<details>
  <summary>I can join a session from a browser, but not from an IDE. Why?</summary>

A [bug](https://github.com/Genuitec/CodeTogether/issues/206) in CodeTogether versions prior to 2022.1 prevented this from working if your project/workspace had a large number of files. Ensure you are using the latest version of CodeTogether to both host and join sessions.

</details>
<details>
  <summary>Do you support audio or video calls?</summary>

Yes, support for  audio, video, and screen sharing was added in 5.0. See [Using Audio & Video in a Session](../user-guides/using-audio-video-in-a-session.md) for details.

</details>
<details>
  <summary>Where can I report a bug or request a feature?</summary>

On our GitHub [Issues](https://github.com/Genuitec/CodeTogether/issues) page. Be sure to check for existing issues before filing a new one.

</details>

## Compatibility

👀 See [CodeTogether Compatibility](https://www.codetogether.com/compatibility/) for more details

<details>
  <summary>What IDEs do you support?</summary>

Supported IDEs include Eclipse, IntelliJ and VS Code, along with IDEs based on them. For a complete list of supported IDEs and versions, see [CodeTogether Compatibility](https://www.codetogether.com/compatibility/).

</details>

<details>
  <summary>In Rider, I don't see content assist, validation, or code-analysis. Is this IDE supported?</summary>

Due to Rider’s unique architecture, CodeTogether does not support Rider. See the [issue](https://github.com/Genuitec/CodeTogether/issues/79) in Github for details. 

</details>
<details>
  <summary>Any plans to support X Code or Visual Studio?</summary>

Not at this time.

</details>
<details>
  <summary>Can I join a session from a different IDE than the host's IDE?</summary>

Absolutely. For example, you can join a session started in Eclipse from IntelliJ.

</details> 
<details>
  <summary>What browsers can I use to join a session?</summary>

Most recent versions of modern browsers like Chrome, Firefox, Safari, Opera, etc. will work. If using Edge, we require version 44 or higher, including recent Chromium based builds.

Internet Explorer is not supported.

:::note

Some key bindings cannot be overridden in a browser, consider joining from an IDE to access your complete key binding set.

:::

</details>

## License Levels and Limitations

👀 See [CodeTogether Plans & Pricing](https://www.codetogether.com/pricing/) for more details

<details>
  <summary>Is CodeTogether free?</summary>

The Cloud-SaaS version of CodeTogether includes a Free plan as well as 2 paid plans: Pro and Teams. The [Pro](https://www.codetogether.com/pro/) plan removes the session time limit of the Free plan and allows up to 50 guests. Our [Teams](https://codetogether.com/teams) plan, built for a team environment with advanced functionality, is free to try for 30 days. 

We also offer an [On-Premises](https://www.codetogether.com/on-premises/) version for our Enterprise customers. This is a paid plan with a 45 day free trial.

See [CodeTogether Plans & Pricing](https://www.codetogether.com/pricing/) for details.

</details>
<details>
  <summary>How many participants can there be in a single session?</summary>

Free: 1 host and 3 guests

Pro, Teams: 50 guests

Enterprise: varies by plan

</details>
<details>
  <summary>How long can sessions be?</summary>

Free: 60 minutes

Pro, Teams, Enterprise: Unlimited

</details>
<details>
  <summary>I’m a student/teacher. Do you offer Educational licenses?</summary>

Yes, we do! [See if you qualify](https://www.codetogether.com/pricing/educational-license/).

</details>

## General Information

👀 See [About Us](https://www.codetogether.com/about/) for more details

<details>
  <summary>Who makes CodeTogether?</summary>

CodeTogether is made by Genuitec. Founded in 1997, and counting over 17,000 companies in 191 countries as customers, Genuitec creates tools that enable developers to build brilliant software. [Learn more](https://www.codetogether.com/about/) about us.

</details>

<details>
  <summary>Do you have any resources to help me get started with CodeTogether?</summary>

Yes, check out our documentation. Start with the Install Guide for your IDE, and then read the [Getting Started Guide](../user-guides/getting-started-with-codetogether.md) for a detailed look at how to get the most out of CodeTogether.

Another great resource is our [Video Library](https://www.codetogether.com/#videos) which contains a number of videos that highlight key functionality and give a nice overview of CodeTogether in action.

</details>

<details>
  <summary>I don't see an answer to my question. Where can I get help?</summary>

For technical questions, the easiest way to connect with us is via our [Gitter community](https://gitter.im/CodeTogether-com/community). You can also email us at support@codetogether.com.

To view existing issues or suggest a feature, visit our [GitHub Issue Tracker](https://github.com/Genuitec/CodeTogether/issues).

For general information or sales questions, contact customer service at info@codetogether.com. You can also contact us via phone at +1.214.614.8328 or +1.888.914.6620.

You can also reach out to us on [Twitter](https://twitter.com/Genuitec), [Facebook](https://www.facebook.com/Genuitec/) or [LinkedIn](https://www.linkedin.com/company/genuitec-llc).

</details>