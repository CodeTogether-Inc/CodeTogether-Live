---
slug: /codetogether-teams/on-premises
sidebar_label: Teams for On-Premises
sidebar_position: 6.2
---

# Teams in CodeTogether On-Premises

import TeamsCommon from './_teams_common.md'

Built-in support for teams in CodeTogether On-Premises makes it even easier to collaborate with others. This guide details how to create teams, join teams, and highlights the differences when working with teams in CodeTogether On-Premises.

:::info SaaS
Teams support is also available in the Cloud-SaaS version with a Teams plan. Refer to [Using CodeTogether Teams in the Cloud-SaaS](teams_saas.md) version for more information.
:::

## Creating a Team

Complete the following steps to create your team in CodeTogether.

1. Double-click (or click in VS Code) **Join/create new team** from the **Your Teams** node in the **CodeTogether** view.
![Create Team](/img/teams/IJCreateTeam.png)
2. Select **Create a new team** and get an invite code, and then enter a name for the team.
3. Click **OK**. A confirmation appears with the team code.
4. Click the **Copy** button to copy the team code to the clipboard.  
![Team Created](/img/teams/IJTeamCreated.png)
5. Share the team code with team members.


## Joining a Team

Complete the following steps to join a team in CodeTogether.

1. Double-click (or click in VS Code) **Join/create new team** from the **Your Teams** node in the **CodeTogether** view.
2. Select **Join an existing team** and paste the Team Code.  
![Join Team](/img/teams/VSCJoinTeam.png)
3. Click **OK**. The new team is listed under the Your Teams node in the CodeTogether view.

## Working with Teams

The following information is specific to hosting and joining sessions in a team environment with CodeTogether On-Premises. Refer to the Getting Started Guide for additional information.

### Starting a Session

When starting a session with a Teams plan, additional options are available when assigning access privileges.

You can choose whether or not to require authorization when a non-team member joins a session using an invite URL. When signed in, team members never need authorization to join a session, other than a one-time authorization to enable end-to-end encryption between the host and the joining member.

You can also restrict access to only allow team members to join the session.

![Controlling Team Access](/img/teams/TeamsControlAccess.png)

<TeamsCommon/>

### Signing Out

You can sign out of a team instead of logging out of CodeTogether. When you sign out of Teams, you will no longer be visible to other team members who are currently online. Sessions you start will not be shown in the Remote Sessions node, but you are free to join sessions while remaining offline in Teams by joining via the invite URL.

To sign out of teams, click the **Go Offline** button from the **Connected** node in the **CodeTogether** view or select the option from the context menu.

![Signing out of teams](/img/teams/IJGoOffline.png)

Once signed out of teams, you can use the **Reconnect Now** link in the CodeTogether view to easily sign back into the team.
