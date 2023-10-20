---
slug: /vscode-network-troubleshooting
sidebar_label: VS Code Proxy
sidebar_position: 3.1
---

# VS Code Proxy Troubleshooting

CodeTogether Live supports proxy servers in 2 different ways: VS Code built-in proxy support, or via a custom `codetogether.proxy` setting.

## VS Code Built-In Proxy Config

This is enabled in VS Code by configuring the `http.proxy` setting.

Example: Set `http.proxy` to `http://user:password@myproxy.com:8080`

Note that it might not be compatible with all kinds of proxy servers.

If CodeTogether Live is still not connecting correctly through your proxy, you can try disabling the proxy support for extensions by setting `http.proxySupport` to `off`.

For more information on configuring proxy support in VS Code, go to <https://code.visualstudio.com/docs/setup/network#_proxy-server-support/>.

## CodeTogether Proxy Setting

If CodeTogether Live is unable to connect using VS Code’s built-in proxy support, you can use the `codetogether.proxy` setting to specify the proxy server that should be used by CodeTogether.

The value is an object with the following structure:

```json
{
    host: string;
    port: number;
    type: string ("http" | "https" | "socks5");
    // Auth is optional
    auth?: {
            user: string;
            password: string;
    }
}
```

For example:

```json
{
    "codetogether.proxy": {
        "host": "my.proxy.com",
        "port": 8080,
        "type": "https",
        "auth": {
            "user": "myuser",
            "password": "mypassword"
        }
    }
}
```

:::note

For these settings to be taken into account:

- You must disable proxy support for extensions by either removing the `proxy.http` setting, or by setting `http.proxySupport` to `off`.

- You may need to ensure that related system level environment variables are not set for the environment in which VS Code is running. For example, `http_proxy` and `https_proxy` on macOS.

:::

To set `codetogether.proxy`, use the VS Code settings editor:

![Updating settings in VS Code](/img/vscode-network-troubleshooting/ctproxy.png)

## Debugging Connectivity Issues

In CodeTogether Live settings, turn on the **CodeTogether: Debug** setting and restart VS Code. The extension will now log to the CodeTogether Debug console in the Output view.

### For On-Premises Users

- Check the log for the `_currentUrl` value-this should be an HTTPS URL, not HTTP.

- The fully qualified domain name in the above URL must match the configured value for `CT_SERVER_URL`.