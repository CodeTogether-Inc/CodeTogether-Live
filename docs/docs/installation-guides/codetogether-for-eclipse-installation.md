---
slug: /codetogether-for-eclipse-installation
sidebar_label: Eclipse Plugin
sidebar_position: 1
---

# CodeTogether for Eclipse Installation Guide

If you want to host a CodeTogether session from Eclipse, you’ll need to install the CodeTogether plugin for Eclipse. You can also join a CodeTogether session directly from Eclipse with the plugin installed.

:::note 

The Eclipse plugin is not required to join sessions hosted from Eclipse. Participants can join from [IntelliJ](codetogether-for-jetbrains-ides-installation.md) or [VS Code](codetogether-for-vs-code-installation.md) with the corresponding plugin/extension installed, or from a browser with no additional installation required.

:::

## Installing the CodeTogether Plugin
CodeTogether requires Eclipse Neon (4.6) or higher to host a session, or Eclipse Photon (4.8) or higher to join a session from Eclipse. If you have the [Marketplace Client](https://www.eclipse.org/mpc/) installed, it’s simple to add CodeTogether to Eclipse. With Eclipse running, drag the **Install** button from our Eclipse Marketplace listing onto the workbench to initiate the installation. Alternatively, you can install the plugin using the button on the [CodeTogether download page](https://www.codetogether.com/download/).

If you prefer using an Eclipse update site directly, use this URL: `https://www.codetogether.com/updates/ci/`

## Getting Started
After adding the CodeTogether plugin to your Eclipse IDE, it’s simple to host or join a pair programming session. For more information, see the [Getting Started Guide](../user-guides/getting-started-with-codetogether.md).

:::note 

If you have a CodeTogether Teams plan, see [Using CodeTogether Teams](../user-guides/codetogether-teams.md) for details on how to host sessions and invite participants.

:::

### Hosting a Session from Eclipse
1. Click **Host New Session** from the [CodeTogether view](../user-guides/session-basics.md#ctview). Alternatively, you can right-click in the editor and select **Start Hosting Session**, or select **Help > CodeTogether > Start Hosting Session**.  
    ![Host a new session](/img/codetogether-for-eclipse-installation/EInstallHost.png)

2. Answer questions related to participant access when prompted, and then click **Start**.  
    ![Enter session details](/img/codetogether-for-eclipse-installation/EInstallStart.png)

3. Copy the session URL to the clipboard using any of the following methods: double-click **Invite others** from the **Hosting** node in the **CodeTogether** view, click the **Copy Invite URL** button in the **CodeTogether** view, or click the **Copy Invite URL** link at the bottom of the editor.  
    ![Invite guests](/img/codetogether-for-eclipse-installation/EinstallInvite.png)

4. Share the link with anyone you would like to code with.  

    :::note 
    You also have the option to start a session when you select text in the editor. A **Start** link appears below the selection, as well as an **Invite URL** link after starting the session.
    :::

### Joining a Session from Eclipse
1. Click **Join Remote Session** from the [CodeTogether view](../user-guides/session-basics.md#ctview); or, select **Help > CodeTogether > Join Remote Session**.  
    ![Join a session](/img/codetogether-for-eclipse-installation/EInstallJoin.png)


2. Paste the Invite URL, enter the name you’ll be identified as in the session, and click **OK**.  
    ![Proive a name](/img/codetogether-for-eclipse-installation/EInstallJoinURL.png)


3. If the host selected to let you choose your cursor behavior, select to **Share a Cursor** or **Your Own Cursor**, and then click **Join Now** once the session is ready.  
    ![Select cursor preferences](/img/codetogether-for-eclipse-installation/EInstallCursor.png)