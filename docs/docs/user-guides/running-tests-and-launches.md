---
slug: /running-tests-and-launches
sidebar_label: Running Tests and Launches
sidebar_position: 4
---

# Running Tests and Launches

Guests have the ability to run both tests and launch configurations that exist in the host workspace.

With a [CodeTogether Teams](https://www.codetogether.com/teams/) plan, you can restrict the ability of guests to run tests and launches.

## Running Tests

As a guest connected to a CodeTogether session, there are several ways in which you can run tests:

- From the editor’s ruler area  
    ![Test run from editor](/img/running-tests-and-launches/run_from_ruler.png)
- The **Run** action in the context menu of a file containing tests (IntelliJ & Eclipse)
- Using IDE specific shortcuts
- Using run configurations (IntelliJ & Eclipse)
- From the **Test/Run** view in your IDE or browser client
    - IntelliJ—**Run** tool window
    - VS Code—**Testing** view  
        ![VS Code Testing view](/img/running-tests-and-launches/run_from_vscode_view.png)
    - Eclipse—**CodeTogether Tests** view
    - Browser—**Remote Tests** view
- Executing a build process that also runs tests

When a test run is initiated, either by the host or the client, the tests are executed on the host IDE. As results become available, they appear in both the host’s and the client’s test view.

![Test results](/img/running-tests-and-launches/test_output_intellij.png)

Results are also visible in the editor’s ruler area, with an icon indicating the result from when that test was last run.

![Test status in ruler area](/img/running-tests-and-launches/ruler_status.png)

### Rerunning Tests

The fastest way to rerun a test is to use your IDEs dedicated shortcuts. For example, the default shortcut for Eclipse is `Ctrl+F11` and for IntelliJ it is `Shift+F10`.


You can also select specific tests to rerun from the corresponding test view.

:::note

With a VS Code host, when tests are running, additional test runs cannot be initiated.

:::

## Test Discovery

Just like the host IDE, CodeTogether does not scan the entire workspace for tests. Tests are discovered by CodeTogether clients using a number of different techniques, but fundamentally, tests are exposed to clients when the host IDE discovers them as well.

For example, if you are editing a file containing tests, they are immediately discovered by the host IDE and be actionable in the client.

Tests that are discovered are visible at the following locations, based on the client used:

- IntelliJ—**Run/Debug Configurations** dialog > **Remote Test** (CodeTogether) node; or, **Run > Run** menu action
- Eclipse—**Run Configuration** dialog > **Remote Test** node
- VS Code—**Testing** view
- Browser—**Remote Tests** view

## Remote Test Configurations

In Eclipse and IntelliJ clients, you can create and run test specific launch configurations. Open the **Run Configuration** dialog and create a new configuration, choose **Remote Test** as the type, and then click the **Select** button to select the test you would like to run. You can now run this configuration to execute the test.

 ![Remote test configuration](/img/running-tests-and-launches/create_remote_test_configuration.png)

:::note

When you run a test from a client connected to an IntelliJ or Eclipse host, as these IDEs are configuration based, CodeTogether attempts to find an existing configuration on the host that matches the test. If a match is found, the existing configuration is run, a new configuration is created if a match cannot be found at the host end.

:::

## Examining Test Results

Besides a simple pass/fail status in your editor’s ruler area, detailed test results are visible in your IDE’s Test/Run view.

### Test Hierarchy

These views use a uniform tree structure across IDEs, so the hierarchy of tests you see may be slightly different from what you normally see for tests that are locally executed. Individual tests are hierarchically displayed, rooted by a node corresponding to the parent project of the tests.

The **Run** tool window in IntelliJ and the **CodeTogether Tests** view in Eclipse display a tree that only contains the tests that have run or are currently running.

*Exmaple of Tests view in Eclipse displaying a hierarchy of the latest tests run:*

![Tests view in Eclipse](/img/running-tests-and-launches/test_hierarchy_eclipse.png)

The **Testing** view in VS Code and **Remote Tests** view in the browser display all currently discovered tests.

*Example of Testing view in VS Code displaying all discovered tests:*

![Tests view in VS Code](/img/running-tests-and-launches/test_hierarchy_vscode.png)

### Results

The icons in the view clearly indicate whether a test is running, has passed, or has failed. For tests that have failed, click the test in the tree to see the details of the failure. If the host supports it, you are shown the difference between the expected and actual results. You can also use the context actions on the test node to jump to the source of the test.

If your test run has multiple execution failures, you can easily navigate from one failure to the next.

*Example of examining test failures in VS Code:*

![Examining test failures in VS Code](/img/running-tests-and-launches/test_results_vscode2.png)

## Limitations

The test support in CodeTogether has been designed to work with the following test frameworks:

- Eclipse—JUnit, TestNG
- IntelliJ—JUnit, TestNG, PHPUnit, Pytest
- VS Code—JUnit, TestNG, PHPUnit, Pytest  

:::note

VS Code support is for version 1.59 or higher only when used as a host or client. VS Code’s testing support framework is relatively new and you may experience occasional glitches in the testing support. This is set to improve as the support stabilizes in future VS Code releases.

:::

In IntelliJ and VS Code hosts, test frameworks beyond those listed above may still be accessible to clients in a CodeTogether session, however, these have not been extensively tested and there may be a few bugs or inconsistencies in test execution and result analysis. We will continue to add and improve support for additional frameworks in upcoming releases.

## Running Launches

Guests can execute run configurations that exist on the host IDE. The configuration runs on the host, and any output directed to the host console is shared with clients as well.

Remote run configurations can be found in your client wherever you normally find local configurations, some of these locations are listed below:

- IntelliJ—**Run/Debug Configuration** dialog > **Remote Run** (CodeTogether) node; or, - **Run > Run** menu action  
    ![Remote run configurations in IntelliJ](/img/running-tests-and-launches/run_configuration_intellij.png)
- Eclipse—**Run Configuration** dialog > **Remote Test** node
- VS Code—**Run and Debug** view
- Browser—**Run** view  
    ![Remote run configurations in the browser](/img/running-tests-and-launches/run_configuration_browser.png)