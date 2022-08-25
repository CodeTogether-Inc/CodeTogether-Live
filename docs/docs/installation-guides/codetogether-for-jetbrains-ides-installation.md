---
slug: /codetogether-for-jetbrains-ides-installation
sidebar_label: IntelliJ Plugin
sidebar_position: 2
---

# CodeTogether for JetBrains IntelliJ IDEs Installation Guide

If you want to host a CodeTogether session from an IntelliJ-based IDE, you’ll need to install the CodeTogether plugin for IntelliJ. You can also join a CodeTogether session directly from IntelliJ-based IDEs with the plugin installed.

:::note 

The IntelliJ plugin is not required to join sessions hosted from IntelliJ. Participants can also join from [Eclipse](codetogether-for-eclipse-installation.md) or [VS Code](codetogether-for-vs-code-installation.md) with the corresponding plugin/extension installed, or from a browser with no additional installation required.

:::

## Installing the CodeTogether Plugin​

To host a CodeTogether session from an IntelliJ-based IDE, 2019.1 or higher is required. To join a CodeTogether session from an IntelliJ-based IDE, 2019.2 or higher is required.

You have two options when installing the CodeTogether plugin:

- Install CodeTogether directly from your IntelliJ-based IDE via the [JetBrains Plugins Repository](https://www.jetbrains.com/help/idea/managing-plugins.html).

- Download the ZIP file from the [CodeTogether download page](https://www.codetogether.com/download/) and add the file in your IDE.

### Installing the ZIP File in IntelliJ

If you choose to download the ZIP file, complete these steps to add the CodeTogether plugin to your IntelliJ-based IDE.

1. In the IDE, go to **Settings/Preferences** (`Ctrl+Alt+S`) and select **Plugins**.

2. On the **Plugins** page, click the **Settings** button, and then click **Install Plugin from Disk**.  
    ![Installing CodeTogether](/img/codetogether-for-jetbrains-ides-installation/CTjbInstall.png)

3. Select the downloaded ZIP file and click **OK**.

4. Start collaborating!

## Getting Started

After adding the CodeTogether plugin to your IntelliJ IDE, it’s simple to host or join a pair programming session. For more information, see the [Getting Started Guide](../user-guides/getting-started-with-codetogether.md).

:::note 

If you have a CodeTogether Teams plan, see [Using CodeTogether Teams](../user-guides/codetogether-teams.md) for details on how to host sessions and invite participants.

:::

### Hosting a Session
1. Click **Host New Session** from the  [CodeTogether view](../user-guides/session-basics.md#ctview). Alternatively, you can select **Tools > CodeTogether: Start Hosting Session**​ or [search](https://www.jetbrains.com/help/idea/searching-everywhere.html) for the **CodeTogether: Start Hosting Session** action.  
    ![Host a new session](/img/codetogether-for-jetbrains-ides-installation/IJInstallHost.png)

2. Answer questions related to participant access when prompted, and then click **Start**.  
    ![Enter session details](/img/codetogether-for-jetbrains-ides-installation/IJInstallStart.png)

3. Copy the session URL to the clipboard using any of the following methods: double-click **Invite others** from the **Hosting** node in the **CodeTogether** view, click the **Copy Invite URL** button in the **CodeTogether** view, or click the **copy invite URL** link at the bottom of the editor.  
    ![Invite guests](/img/codetogether-for-jetbrains-ides-installation/IJinstallInvite.png)

4. Share the link with anyone you would like to code with.

### Joining a Session
1. Click **Join Remote Session** from the  [CodeTogether view](../user-guides/session-basics.md#ctview). Alternatively, you can select **Tools > CodeTogether: Join Remote Session​** or [search](https://www.jetbrains.com/help/idea/searching-everywhere.html) for the **CodeTogether: Join Remote Session** action.  
    ![Join a session](/img/codetogether-for-jetbrains-ides-installation/IJInstallJoin.png)

2. Paste the Invite URL, enter the name you’ll be identified as in the session, and click **OK**.  
    ![Provide a name](/img/codetogether-for-jetbrains-ides-installation/IJInstallURL.png)

3. If the host selected to let you choose your cursor behavior, select to **Share a Cursor** or **Your Own Cursor**, and then click **Join Now** once the session is ready.  
    ![Select cursor preferences](/img/codetogether-for-jetbrains-ides-installation/IJInstallCursor.png)