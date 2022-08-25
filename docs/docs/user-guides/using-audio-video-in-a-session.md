---
slug: /using-audio-video-in-a-session
sidebar_label: Audio & Video
sidebar_position: 5
---

# Using Audio & Video in a Session

## Joining Audio/Video
Once in a CodeTogether session, to connect to the A/V bridge click the **Join audio/video meeting** toggle in the **CodeTogether** view. You can also use the **Join Audio** toolbar actions in Eclipse and IntelliJ, and the **Join Audio** editor button in VS Code.

![Joining A/V](/img/using-audio-video-in-a-session/JoinAudio-labeled-wb.png)

Your connection to the bridge is managed in a browser.

:::note

Audio, video and screen sharing capabilities require WebRTC to be enabled in your browser. If you have disabled WebRTC, you must enable it to use these capabilities.

:::

### Audio Only Guests

Users who have not joined a CodeTogether session can still connect to the bridge as audio guests. Share the URL of the bridge (shown in the browser’s address bar) to allow them to join.

The number of audio guests allowed in a session is the same as the number of allowed session participants. For instance, a free tier session can have 3 guests, and therefore you can have 3 additional audio guests.

## Capabilities Within the Bridge

Through controls within the browser, you can access the following capabilities:

- Audio calling
- Video calling
- Screen sharing (entire screen or specific application)
- Text chat (private and public messages)
- Polls
- Raise hand/send reactions with optional sounds  
    ![A/V in browser](/img/using-audio-video-in-a-session/call_in_browser_3.png)

The bridge works with most modern browsers, though there are a few differences between them. For instance, in Chrome you can change your mic and speaker devices within the browser interface, but this is not possible in Firefox. If using Safari, version 14 or higher is required.

## Controlling the Bridge from Your IDE

While all aspects of the bridge can be managed in the browser, a few controls are available within the IDE too. The CodeTogether view and the IDE specific toolbars allow you to mute and unmute your microphone, stop sharing your screen, and indicate if you have unread text messages in the bridge.

![A/V controls in the IDE](/img/using-audio-video-in-a-session/AVbuttons.png)