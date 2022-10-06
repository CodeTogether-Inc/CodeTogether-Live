---
slug: /sso/okta
sidebar_label: Configure Okta
---
# Configure an Okta Application for CodeTogether Authorization
This guide walks you through the creation of an SSO application in Okta. You specify CodeTogether URLs to configure the application, and pick up endpoint URLs and values to plug back into your CodeTogether container configuration.

## 1. Create a New App Integration

In your Okta Admin dashboard, at Applications > Applications, click **Create App Integration**. Select **OIDC - OpenID Connect** as the sign-in method and **Web Application** as the application type.

![Add an Okata application](/img/sso/okta/1_okta_create_app.png)
![Create the Okata application](/img/sso/okta/2_okta_app_type.png)

## 2. Configure the App
Give your application a suitable name and ensure **Client Credentials** and **Refresh Token** are checked.

![Naming app](/img/sso/okta/3_okta_general_settings.png)

Specify the Sign-in (`CT_SERVER_URL/sso/authorization-code/callback`) and Sign-out (`CT_SERVER_URL/sso/logout`) redirect URIs as described in the [configuration section](sso.md#configuration) and click **Save**. Your application will now be created. 

![Configuring app](/img/sso/okta/4_okta_urls.png)

## 3. Copy Required Details
From the **General** tab of the app, copy the Client ID and Client Secret values. The Okta domain can be copied from the account drop down menu. Use `OKTA` as the SSO Provider value.

![Copying client credentials](/img/sso/okta/5_okta_secrets.png)