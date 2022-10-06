---
slug: /sso/azure
sidebar_label: Configure Azure
---
# Configure an Azure Application for CodeTogether Authorization
This guide walks you through the creation of an SSO application in Microsoft Azure. You specify CodeTogether URLs to configure the application, and pick up endpoint URLs and values to plug back into your CodeTogether container configuration.

## 1. Create a New App
Open the [Azure Portal](https://portal.azure.com) and navigate to [App registrations](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade). Click **New registration** to create a new app.

![Create Azure App](/img/sso/azure/2_azure_new_registration.png)

Enter a suitable name for the application. In the **Redirect URI** section, select **Web** as the platform, and specify the login redirect URI as described in the [configuration section](sso.md#configuration) - `CT_SERVER_URL/sso/authorization-code/callback`. Then click **Register** to complete creation of the application.

![Register New Azure App](/img/sso/azure/3_azure_register_app.png)
## 2. Configure the App

On the **Certificates & secrets** page, click **New client secret**, give it a name and click **Add**. Copy the value of the created Client Secret for use in the CodeTogether configuration.

![Add Client Secret](/img/sso/azure/5_azure_add_client_secret.png)
![Copy Client Secret](/img/sso/azure/6_azure_copy_client_secret.png)

On the **Authentication** page, specify the logout redirect URI  as described in the [configuration section](sso.md#configuration) - `CT_SERVER_URL/sso/logout`. Also ensure **ID tokens** is selected for implicit and hybrid flows. Click **Save**.

![Specify logout URL](/img/sso/azure/7_azure_logout_url.png)

On the **Overview** page, copy the **Application ID** value - this is the Client ID you will need to specify in the CodeTogether configuration. Also observe the **Directory (tenant) ID**. The SSO System Base URL is typically `https://login.microsoftonline.com/<tenant ID>/v2.0`. Use `MICROSOFT` as the SSO Provider value.

![Copy Application ID](/img/sso/azure/4_azure_copy_app_id.png)
