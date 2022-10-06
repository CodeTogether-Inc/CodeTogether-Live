---
slug: /sso
sidebar_label: Single Sign-On (SSO)
sidebar_position: 6
---

# Single Sign-On (SSO) Support

SSO integration was introduced in CodeTogether 4.0 and is currently available only for [On-Premises](https://www.codetogether.com/on-premises/) installations.

## Scope of SSO Integration

CodeTogether integrates with SSO providers that support the [OpenID Connect](https://openid.net/specs/openid-connect-core-1_0.html) protocol—this includes providers like Okta, Azure AD, Microsoft AD FS and Auth0 among others.

SSO support in CodeTogether is straightforward—once configured on your on-premises install, users are allowed CodeTogether access only if they have been authorized by your provider. If they are unauthorized, they are neither able to host, nor join any sessions running on your server.

The only SSO integration currently supported is the ability to log in and log out. SSO groups and other similar constructs are not synchronized with CodeTogether teams, or any other CodeTogether functionality.

## Configuration

### Setting Up Your SSO Provider

To integrate CodeTogether as a new application in your SSO provider, configure the following common OIDC properties:

| **Property**         | **Value**                                       |
|----------------------|-------------------------------------------------|
| Login redirect URI   | `CT_SERVER_URL/sso/authorization-code/callback` |
| Logout redirect URI  | `CT_SERVER_URL/sso/logout`                      |
| Allowed Grant Types  |                                                 |
| – Client Credentials | enabled                                         |
| – Authorization Code | enabled                                         |
| – Refresh Token      | enabled                                         |

`CT_SERVER_URL` must be the externally visible name of your on-premises server, using the HTTPS protocol (e.g., `https://codetogether.acme.com`).
This variable is configured when you set up your container.

### Setting Up Your CodeTogether Server

To have CodeTogether integrate with the SSO application you created in the previous step, configure the following environment variables. These are in addition to the standard environment variables defined in the [On-Premises Installation Guide](on-premises-installation-guide.md).

| **Environment Variable**                               | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|----------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CT_SSO_SYSTEM_BASE_URL<br /><br />(since CodeTogether 4.1.2) | The base URL for your identity system; aka, Domain, Realm, etc.<br /><br />Example: `https://{OKTA_DOMAIN}/oauth2/default`<br /><br />The presence of this variable signals to CodeTogether that SSO is enabled. If not defined, all variables below are ignored.                                                                                                                                                                                                                                                                                                                                                                           |
| CT_SSO_TOKEN_ENDPT                                 | Optional: URL to the authorization server endpoint that provides refresh tokens.<br /><br />Use this environment variable for non-standard OIDC systems.<br /><br />Example: `https://{OKTA_DOMAIN}/oauth2/default/v1/token`                                                                                                                                                                                                                                                                                                                                                                                                                |
| CT_SSO_CLIENT_ID                                   | Unique ID assigned by the SSO provider to the CodeTogether SSO application.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| CT_SSO_CLIENT_SECRET                               | Private key assigned by the SSO provider to the CodeTogether SSO application.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| CT_SSO_PROVIDER                                    | Optional: Can be OKTA, MICROSOFT, IDCS, KEYCLOAK or ONELOGIN.<br /><br />If using another provider, omit this variable.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| CT_SSO_SECURE_JWKS_ENDPT_ENABLE                    | Optional: Can be “true” or “false”.<br /><br />When true, it informs CT_SSO that the authorization server URL used by the OpenID middleware for access to public keys is protected and can only be accessed by an authenticated user.<br /><br />An example is the Oracle IDCS, which does not provide anonymous access to its `jwks_uri` endpoint. For such systems, either include this environment variable with a value of “true”, or enable your IDCS default settings to allow access to the public signing keys. To make this change in the IDCS Dashboard, go to **Settings > Default Settings** and enable **Access Signing Certificate**. |

:::note

In CodeTogether 4.1.2, `CT_SSO_SYSTEM_BASE_URL` replaces the `CT_SSO_AUTHORIZATION_ENDPT`, as this new name better reflects the purpose of this variable. The older variable will continue to function as an alias.

:::

We have guides for creating Apps in [Okta](okta.md) and [Azure](azure.md) for CodeTogether Authorization. The configuration process will be similar in all SSO providers.

### Example Identity Provider Configurations

```bash title="Okata OpenID Connect"
ENV CT_SSO_PROVIDER "OKTA"
ENV CT_SSO_CLIENT_ID "0oa5vFs2yPWSiq..."
ENV CT_SSO_CLIENT_SECRET "bI96uXez4QBb3ZxIY7eO4GCr..."
ENV CT_SSO_SYSTEM_BASE_URL "https://YOURDOMAIN.okta.com/oauth2/default"
```

```bash title="Oracle IDCS OpenID Connect"
ENV CT_SSO_PROVIDER "IDCS"
ENV CT_SSO_CLIENT_ID "357c9f87e5de442..."
ENV CT_SSO_CLIENT_SECRET "ab358ae8-4729-4f08-bc74-..."
ENV CT_SSO_SYSTEM_BASE_URL "https://idcs-YOURTENANCY.identity.oraclecloud.com"
ENV CT_SSO_SECURE_JWKS_ENDPT_ENABLE "true"
```

```bash title="Keycloak OpenID Connect"
ENV CT_SSO_PROVIDER "KEYCLOAK"
ENV CT_SSO_CLIENT_ID "code-together"
ENV CT_SSO_CLIENT_SECRET "924ec27b-670e-4e18-8b97-..."
ENV CT_SSO_SYSTEM_BASE_URL "https://HOSTNAME/auth/realms/YOURREALM"
```

```bash title="Azure OpenID Connect"
ENV CT_SSO_PROVIDER "MICROSOFT"
ENV CT_SSO_CLIENT_ID "ab55a5a3-498b-479b-..."
ENV CT_SSO_CLIENT_SECRET "_ZcjuPg_TNh_g~hld..."
ENV CT_SSO_SYSTEM_BASE_URL "https://login.microsoftonline.com/89abea56-e91d-41f7-a8.../v2.0"
```

## Using CodeTogether with SSO

The first time you use CodeTogether, you are asked to authenticate with your organization’s single sign-on service.

![Connecting to SSO](/img/sso/ide_signed_out_2.png)

Click **Connect** to be taken to your provider’s login page, where you can authenticate as required.

![Signing in with SSO](/img/sso/browser_signing_in.png)

A message displays when the authentication is complete.

![Authenticaion success](/img/sso/browser_signed_in.png)

After logging in, the CodeTogether view will show you as connected. 

![CodeTogether view](/img/sso/ide_signed_in.png)

## SSO FAQ

#### How long will a user stay logged in?

> CodeTogether authenticates the user each IDE session. Refresh tokens, if available, are used to refresh auth data and keep the user logged in without having to sign in again. This depends on how an SSO Administrator configures the lifetime of refresh tokens.

#### What info does CodeTogether SSO Integration access?

> CodeTogether accesses minimal information, as defined by the following OIDC scopes: openid, profile, off_line

#### How do I find the Token endpoint URL (CT_SSO_TOKEN_ENDPT)?
> As of CodeTogether 4.1.2, this variable is optional and is fetched from the well known configuration. However, you may specify it if you have a non-standard OIDC system or wish to override the value.
>
> For this URL and other configuration details, look for the `token_endpoint` property in the provider’s discovery document: `CT_SSO_SYSTEM_BASE_URL/.well-known/openid-configuration`
> 
> Examples of discovery document paths:
>
> - `https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration`
> - `https://dev-83772425.okta.com/oauth2/default/.well-known/openid-configuration`
> - `https://login.microsoftonline.com/9e67eb9a-b109-4066-a505-bf770af1bdb0/v2.0/.well-known/openid-configuration`
