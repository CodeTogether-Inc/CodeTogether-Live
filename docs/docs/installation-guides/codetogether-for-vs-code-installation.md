---
slug: /codetogether-for-vs-code-installation
sidebar_label: VS Code Extension
sidebar_position: 3

---

# Installing CodeTogether Live in VS Code

If you want to host a CodeTogether Live session from VS Code, you’ll need to install the CodeTogether Live extension for VS Code. You can also join a session directly from VS Code with the extension installed.

:::note

The VS Code extension is not required to join sessions hosted from VS Code. Participants can join from [Eclipse](../installation-guides/codetogether-for-eclipse-installation.md) or [IntelliJ](../installation-guides/codetogether-for-jetbrains-ides-installation.md) with the corresponding plugin installed, or from a browser with no additional installation required.

:::

## Installing the CodeTogether Live Extension​

CodeTogether Live requires VS Code 1.44 or higher. You have two options when installing the CodeTogether Live extension:

- Install via the [VS Code marketplace](https://marketplace.visualstudio.com/items?itemName=genuitecllc.codetogether) listing.
- Download the VSIX file from the [CodeTogether Live download page](https://www.codetogether.com/live/download/) and add the file in VS Code.

:::note

If using a proxy network, see [VS Code Proxy Troubleshooting](vscode-network-troubleshooting.md) for additional instructions.

:::

### Installing the VSIX file in VS Code

If you choose to download the VSIX file, complete these steps to add the CodeTogether Live extension to Visual Studio Code.

1. In VS Code, select **View > Extensions**.

2. Click the command drop-down [. . .] and select **Install from VSIX**, or select **Extensions: Install from VSIX from the Command Palette**.

3. Select the downloaded .vsix file and click **Install**. A notification displays when installation is complete.

4. Start collaborating!

### Trusted Workspaces

VS Code recently introduced the concept of Workspace Trust. While CodeTogether Live functions fine even if the workspace is not trusted, it may be annoying to repeatedly see the “untrusted workspace” message when joining sessions using a VS Code client. CodeTogether Live will suggest adding the `~/.codetogether/vscode` folder to the Trusted Folders and Workspaces list.

![Trusting the workspace](/img/codetogether-for-vs-code-installation/VSCopenTrustSettings.png)

## Getting Started

After adding the CodeTogether Live extension to your VS Code, it’s simple to host or join a pair programming session. For more information, see the [Getting Started Guide](../user-guides/getting-started-with-codetogether.md).

:::note 

If you have a CodeTogether Teams plan, see [Using CodeTogether Teams](../user-guides/codetogether-teams.md) for details on how to host sessions and invite participants.

:::

### Hosting a Session from VS Code
1. Click **Host New Session** from the [CodeTogether view](../user-guides/session-basics.md#ctview).  Alternatively, you can use the **CodeTogether: Start Hosting Session**​ command or click **CodeTogether** in the status bar and select **Start Hosting** Session.  
    ![Host a session](/img/codetogether-for-vs-code-installation/VSCInstallHost.png)
  
2. Answer questions related to participant access when prompted, and then click **Start**. The Invite URL is automatically copied to the clipboard when the session is started.  
    ![Select session preferences](/img/codetogether-for-vs-code-installation/VSCInstallStart.png)  
        
    :::note
    To obtain the URL later, you can click **Invite Others** from the Hosting node in the CodeTogether view, use the **CodeTogether: Copy Invite URL** command, or click **In Session** in the status bar and select **Copy Session URL to Clipboard**.
    :::

3. Share the link with anyone you would like to code with.

### Joining a Session from VS Code

1. Click **Join Remote Session** from the [CodeTogether view](../user-guides/session-basics.md#ctview). Alternatively, you can use the **CodeTogether: Join Remote Hosting Session​** command or click **CodeTogether** in the status bar and select **Join Remote Session**.  
    ![Join a session](/img/codetogether-for-vs-code-installation/VSCInstallJoin.png)

2. Paste the Invite URL and press **Enter**.  
    ![Use the Invite URL](/img/codetogether-for-vs-code-installation/CTvscPasteUrl.png)

3. If the host selected to let you choose your cursor behavior, select to **Share a Cursor** or **Your Own Cursor**, and then click **Join Now** once the session is ready.  
    ![Select cursor preferences](/img/codetogether-for-vs-code-installation/VSCInstallCursor.png)