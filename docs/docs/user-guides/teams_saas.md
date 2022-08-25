---
slug: /codetogether-teams/saas
sidebar_label: Teams for SaaS
sidebar_position: 6.1
---

# Teams in CodeTogether SaaS

import TeamsCommon from './_teams_common.md'

CodeTogether Teams makes it even easier to collaborate in a team environment. This guide details how to set up and manage a team, and highlights the differences when working with CodeTogether Teams in the Cloud-SaaS version.

:::info On-Premises
Teams support is also included in the On-Premises version. Refer to [Using CodeTogether Teams in the On-Premises Version](teams_op.md) for more information.
:::

## Creating a Team

Complete the following steps to create your team in CodeTogether.

1. Click the **Start a Team** link in the **CodeTogether** view.
![Call in a browser](/img/teams/IJctviewStartTeam.png)
2. Complete each field and then click **Start My Team**.
:::tip Existing Account?
If you already have an account on codetogether.com, you can log in with that account.
:::
![Starting a team on the portal](/img/teams/portal-flow-start-team.png)
3. For each team member, enter their email address and click **Add Team Member**. Once the list of team members is complete, you can click **Send Invites** to send an email invitation to each team member. The email will include any custom message you add along with a link to join the team.
![Inviting a team member](/img/teams/portal-flow-invite-members.png)
:::tip
You can also click the **Copy** button to copy an invite URL to the clipboard that you can share with others.
:::

4. After inviting members to the team, you have the option to download CodeTogether for your IDE if you haven’t already done so.

## Managing a Team

If you are an owner or manager of a team, you can access your team directly from the CodeTogether view. Click the **Manage Team Members** button next to the team in the **Your Teams** node.

![Managing members in VS Code](/img/teams/vViewManageTeam.png)

Your codetogether.com account loads in the browser. From the Teams>Members page, you can add or remove team members. If you are the team owner, you can also update the team settings.

![Team Members](/img/teams/ct_portal_members.png)  
To add team members, click the **Add Members** button. You have the option to copy the registration link and share it with your team members manually. Or, you can enter the team member’s email and click the **Add member** button to have an Invite email sent automatically. 

:::info   
Regenerating the link will invalidate the older registration link.
:::

![Adding Team Members](/img/teams/ct_portal_add_member.png)
## Team Roles

Each team member is assigned a role: Member, Manager, or Owner.

Team members with the Member role cannot add or remove members, nor access the registration link from the portal.

If a member has the Manager role, they can remove and add other members.

Only team owners can regenerate the registration link.

Keep the following in mind when working with teams:
- A user can be a member of multiple teams, but can be the manager of only a single team
- A team can have multiple managers

## Team Expiration

If a team you’re a member of expires, you will not be able to see other online members of this team, nor will you be able to see sessions that are running in this team. Similarly, team related capabilities like restriction of editing/session to team members or terminal write access will be unavailable in your session.

## Working with Teams

The following information is specific to hosting and joining sessions with CodeTogether Teams. Refer to the Getting Started Guide for additional information.

### Starting a Session

When starting a session with a Teams plan, additional options are available when assigning access privileges.

You can choose whether or not to require authorization when a non-team member joins a session using an invite URL. When signed in, team members never need authorization to join a session, other than a one-time authorization to enable end-to-end encryption between the host and the joining member.

You can also restrict access to only allow team members to join the session.

![Controlling Team Access](/img/teams/TeamsControlAccess.png)

<TeamsCommon/>

### Signing Out

If you have a CodeTogether Teams plan, you can sign out of a team instead of logging out of CodeTogether. When you sign out of Teams, you will no longer be visible to other team members who are currently online. Sessions you start will not be shown in the Remote Sessions node, but you are free to join sessions while remaining offline in Teams by joining via the invite URL.

To sign out of teams, click the **Go Offline** button from the **Connected** node in the **CodeTogether** view or select the option from the context menu.

![Signing out of teams](/img/teams/IJGoOffline.png)

Once signed out of teams, you can use the **Reconnect Now** link in the CodeTogether view to easily sign back into the team.
