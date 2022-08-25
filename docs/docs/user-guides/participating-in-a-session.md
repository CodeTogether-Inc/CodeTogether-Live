---
slug: /participating-in-a-session
sidebar_label: Participating in a Session
sidebar_position: 3
---

# Participating in a Session

CodeTogether lets you [join a session](getting-started-with-codetogether.md#joining-a-session) from a browser or an IDE (Eclipse, IntelliJ and VS Code). Your experience varies slightly depending on how you join the session.

#### When joining from an IDE:

* You get the same look and feel of your IDE—including, key bindings, workbench layout and general behavior.
* Language smarts come from the host IDE, regardless of the plugins/extensions you have installed or what your IDE is inherently capable of. Your experience as a participant differs from using the same IDE as a host. While you have access to the entire project shared by the host (minus files intentionally hidden from the session), the files and libraries are not downloaded to your system. Files are fetched on demand and only the files being actively edited are local to your system. This should help you understand which features in the host IDE you can expect to work.
* You can use the Project/Resource views and the Problems views; however, no other views provide meaningful support for shared projects.
#### When joining from a browser:

* You can select your preferred IDE theme and key bindings for a more familiar experience in the browser.
* Language smarts come from the host IDE.

Because language smarts always come from the host, content assist suggestions, validation, quick fixes and navigation support are all delivered by the host IDE.

:::note 

You can code alone or with a group. Refer to [Section Basics](session-basics.md) for details.

:::


## Navigating in a Session
The following features are available when you join a session. When using an IDE client, use your normal IDE menus and shortcuts to access these capabilities.

### Explorer View
Participants have access to all files in the host’s workspace. When joining from a browser, use the **Explorer** view (**View > Explorer**) to dive into the projects in the host’s workspace. Expand any folder, and click any resource to open it. In the browser and VS Code, you can use **Quick Open** (`Ctrl/Cmd+P`) to filter through and open any file in the workspace. For Eclipse, use the **Open Resource** action, and for IntelliJ, use **Navigate > File**.

![Explorer View](/img/participating-in-a-session/quick_open.png)

### Peek/Go to Definition
Press `Ctrl/Cmd` while hovering over an element to view the definition of the element inline. You can click the hyperlink to navigate to the definition, whether in the same file or another. Alternatively, use the **Go to Definition** context menu item to navigate.

![Peek Definition](/img/participating-in-a-session/peek_definition.png)

### Peek References
From the context menu of an element, select **Peek References** to view all references to the element inline. You can examine each reference in detail without leaving your current editing context.

![Peek References](/img/participating-in-a-session/peek_references.png)

### Call/Type Hierarchy
Use the **Call Hierarchy** context menu action to bring up the call hierarchy. Use the **Supertype** and **Subtype Hierarchy** context menu actions to bring up the corresponding hierarchy trees.

![Call/Type Hierarchy](/img/participating-in-a-session/call_type_hierarchy.png)

### Documentation on Hover
Hover over an element to view corresponding documentation, if available.

![Documentation on Hover](/img/participating-in-a-session/documentation_hover.png)

### Outline/Go to Symbol
The **Outline** view (**View > Outline**) displays a structural outline of the file being currently edited. You can use the **Outline** view to navigate within the file. You can also use **Go to Symbol** (`Ctrl/Cmd+Shift+O`) to open up a filterable list of symbols to quickly navigate to a particular symbol in the file you’re currently editing.

![Go to Symbol](/img/participating-in-a-session/goto_symbol.gif)

### Open Symbol
Use your IDE’s Open Symbol/Open Type actions or shortcuts to bring up the corresponding Open Symbol dialog. CodeTogether is now capable of allowing you to find remote types across the entire shared workspace. If you are using a browser, use the **Open Workspace Symbol** command, or bring up the command palette and type in a `#` to start the symbol search. Depending on the host IDE, Open Symbol could allow you to filter beyond top level types; for example, into fields and methods.

![Open Symbol](/img/participating-in-a-session/open_symbol.gif)

### File Content Search
Your IDE's file search capabilities can be used to search for text within file contents of the shared workspace. Regular expressions are supported and you can navigate directly to the matched section from the search results.

![File Content Search](/img/participating-in-a-session/remote_search_2.png)

:::info 

In Eclipse, use **Search > File** and the **Remote File Search** tab. In the browser, use the **Search** view (**View > Search**).

:::

### Selection and Cursor Annotations
If you are following the Host or another participant, their selections and cursor locations as they type are displayed as a labeled annotation.

![Selection and Cursor Annotations](/img/participating-in-a-session/host_selection.png)

### Code Folding
When you hover the column to the left of your code, a down arrow indicates the start of a section that can be collapsed. Click the down arrow to hide the block of code. The first line in the block of code remains visible with a right arrow. Click the right arrow to expand the block of code.

![Code Folding](/img/participating-in-a-session/CTcoldFolding.png)

## Editing in a Session
In addition to basic editing capabilities like undo, redo, and clipboard access, the following code features are available.

### Content Assist
Press the appropriate key binding (typically `Ctrl+Space`) to invoke content assist. On accepting a proposal, you can press `Tab` to jump from one parameter stop to the next as you key in the parameters to a constructor or method.

![Content Assist](/img/participating-in-a-session/content_assist.gif)

### Quick Fixes
When the cursor is within an error squiggly, a quick fix bulb appears if one or more fixes are available. Click the bulb and choose the desired fix action to make the recommended changes to your code.

### Rename Refactoring
Use your IDE’s rename refactoring shortcut or menu actions to initiate this refactoring action. As long as the host supports it, this results in the element being correctly renamed across the workspace.

![Rename Refactoring](/img/participating-in-a-session/rename_symbol.gif)

### Validation
Errors from the host workspace appear in all participant sessions. This includes errors from files that are not currently open or being edited, as long as the host has validated those files. Errors typically appear and disappear as you type, as validation takes place on the host and the markers are transferred over to the participants. To see a list of all errors, you can open the **Problems** view (**View > Problems**) from where you can easily navigate to the referenced files.

![Validation](/img/participating-in-a-session/validation.png)

### Java Class Creation
Create a new file with a java extension within a Java source folder, and CodeTogether creates a minimally scaffolded Java class, ready for further code.

### Formatting
You can format the entire file by using the **Format Document** context menu action. If code is selected, only the selected code is formatted.

## Advanced Features
CodeTogether includes a number of features that help you get the most of your collaborative coding session.

### Shared Console
Console output on the host is visible to all participants, beginning with version 3.1. To see the output as soon as it is emitted on the host, access the appropriate view: the Console view in Eclipse, the Run view in IntelliJ or the Output view in VS Code or a browser.

![Shared Console](/img/participating-in-a-session/console_output.png)

### Shared Terminal {#terminal}
Terminals opened on the host are automatically shared in the session, and are accessible by all participants. These terminals are added to the respective IDEs Terminal views, or a dedicated terminal tab for each shared terminal in the browser.

- Participants can get write access to terminals if they are signed in to a Teams account, and permission is explicitly granted by the host.
- When guests interact with a terminal, the terminal is automatically focused in the host IDE to allow the host to track activity. You can turn this feature off in CodeTogether Preferences/Settings.
- The host can stop sharing a terminal, this immediately closes it on all clients. The host cannot share this terminal again in the same session.
- For shared terminals, participants only see terminal activity that occurs after they join the session. They do not have access to terminal content that existed before they joined.

*Shared terminal in a browser example:*

![Shared Terminal](/img/participating-in-a-session/ctTerminal.png)

### Shared Server {#servers}
If on a [Teams](https://www.codetogether.com/teams/) or [On-Premises](https://www.codetogether.com/on-premises/) plan, CodeTogether automatically detect servers running on the host system and displays them under the Shared Servers node in the CodeTogether view. This includes servers that are running independently, external to the IDE. You can also add a server manually by using the **Add Server** action on the Shared Servers node. The host can choose to start and stop sharing servers anytime during a session. If a previously shared server is stopped, it is removed  from the participants CodeTogether view, and become inaccessible.

On the guest side, servers shared by the host appear under the Shared Servers node. Double-click (or click in VS Code) the server or use the **Connect Server** action to connect to the server. CodeTogether attempts to make the server available at the same port at which it is running on the host, but chooses the next available port if that port is not available locally. The node then changes to display the address at which the server is locally available. Double-click (or click in VS Code) or use the **Disconnect Server** action to disconnect from the server and free the local port.

![Shared Server](/img/participating-in-a-session/ParticipateServer.png)

:::tip 

Use this capability to share more than just web applications. Share a database server, a remote debug session, web sockets, etc.

:::

### Run Launches and Unit Tests
Guests can remotely run tests and analyze the results. They can even write tests, allowing test-driven development (TDD) in a remote environment. JUnit, TestNG, PHPUnit and pytest are all supported. Guests can also execute run configurations from the host IDE, remotely launching applications with the ability to stop and monitor the invocations. By default, all guests can run remote launches and unit tests. If you have a [Teams](https://www.codetogether.com/teams/) plan, you have the option to limit access to this feature.

See [Running Tests and Launches](running-tests-and-launches.md) for details.

![Run Tests](/img/participating-in-a-session/RunTestsCrop.png)