---
slug: /using-audio-video-in-a-session
sidebar_label: Audio, Video & Screen Sharing
sidebar_position: 5
---

# Using Audio & Video in a Session
Built-in communication tools in CodeTogether Live include audio, video, text chat and screen sharing. Anyone in the session can start an audio/video bridge via a simple toggle, which can easily be joined by others in the session. You can also invite guests who only have access to the communication tools and not the actual code—perfect for getting customer feedback without live sharing code. 

## Joining Audio/Video
To connect to the A/V bridge while in a CodeTogether Live session, click the **Join audio/video meeting** toggle in the **CodeTogether** view. You can also use the **Join Audio** toolbar actions in Eclipse and IntelliJ, and the **Join Audio** editor button in VS Code.

![Joining A/V](/img/using-audio-video-in-a-session/JoinAudio-labeled-wb.png)

Your connection to the bridge is managed in a browser.

:::caution

- Audio, video and screen sharing capabilities require WebRTC to be enabled in your browser. If you have disabled WebRTC, you must enable it to use these capabilities.
- If using CodeTogether Live on-premises, and you find that chat works, but audio, video and screen sharing do not, you *may* need to set up a TURN server on your intranet. See [A/V with a TURN Server](/on-premises/turn-server.md) for details.
:::

### Audio Only Guests

Users who have not joined a CodeTogether Live session can still connect to the bridge as audio guests. Share the URL of the bridge (shown in the browser’s address bar) to allow them to join.

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