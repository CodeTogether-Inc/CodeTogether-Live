---
slug: /multi-server-on-premises-deployment
sidebar_label: Multi-Server Deployment
sidebar_position: 5
---

# Multi-Server On-Premises Deployment

# 1. Overview

CodeTogether is designed to allow both a simple single-edge server container that can be easily run in an organization and multi-server redundant deployments with flexible usage of technologies like OpenShift and cloud hosting platforms.

The main benefits of multi-server deployments can be covered in three key areas:

- Long term storage of metrics & audit logs
- Redundant edge servers allowing lower latency under high session load
- Regional edge servers allowing shorter round trip times for teams in remote regions

# 2. Multi-Server Architecture

## 2.1. Server Components

### 2.1.1. CodeTogether Locator

The Locator is responsible for assignment of sessions to edge servers, coordinating team presence, and providing a central point for capturing of usage metrics, audit entries, and other data requiring long-term storage.

End User Clients do not maintain a connection to the locator, simply using it at key moments for coordination. Edge Servers establish a websocket connection to the Locator as part of service management and coordination.

The Locator requires connection to a MySQL or Postgres database for storage and retrieval of metrics, configuration, and audit entries.

### 2.1.2. CodeTogether Edge Server

The Edge Server is responsible for handling the bulk of the communication for CodeTogether, from relaying secure messages for coding sessions to providing presence for the Team view in CodeTogether. Due to its architecture, it is optimized to handle many connections through a single edge server.

End User Clients will maintain an active websocket connection to the edge server for team presence information as well as a websocket for active session connections. If a network disruption happens, IDE hosts will automatically attempt to reconnect to its assigned edge server for the session.

The Edge Server will maintain a websocket connection to the Locator. If the connection is lost, it will attempt to reconnect and relay any audit or metrics entries that were collected while the connection was disrupted.

### 2.1.3. CoTurn Server

When using audio/video services as part of a CodeTogether deployment, the communication channel for A/V by default will be routed over UDP directly to the edge server. If UDP is not correctly routable by one or more participants in a session, users can experience no audio or screen sharing being relayed.

The underlying technology for the A/V communication is WebRTC. To allow routing via TCP, WebRTC supports usage of a TURN server which coordinates with the WebRTC components on the CodeTogether Edge Server to allow clients to join A/V communications over TCP channels.

The CoTurn server will use UDP and TCP between both End User Clients and the Edge Server as part of its operation.

## 2.2. Example Deployment Diagram

The following diagram shows a potential CodeTogether server deployment in a single-region model. There is a single active Locator with 3 Edge Servers in operation. The optional CoTurn is present for TCP fallback for clients that are unable to establish a UDP connection.

*Example Deployment Diagram*  
![Example deployment diagram](/img/multi-server-on-premises-deployment/Deployment-Diagram.png)  

## 2.3. Load Balancing and Redundancy

There are different levels of functions active in the CodeTogether deployment that allow for a reliable and consistent experience.

### 2.3.1. Edge Server Scheduled Upgrade

When upgrading Edge Servers, the Locator provides the option of suspending new sessions to edge servers. In the diagram above, during upgrade, Edge 1, 2 and 3 would all be flagged as suspended, while three new Edge Servers are brought online. Once suspended, the Locator will not allocate new sessions to those servers (unless there are no other servers available). Once all sessions have naturally ended, those old Edge 1-3 servers can be taken offline. As soon as the new edge servers start connecting to the locator, they will be automatically used for new sessions.

*Edge servers can be suspended from the CodeTogether Dashboard*
![Edge servers](/img/multi-server-on-premises-deployment/edge-servers.png)

### 2.3.2. Edge Server Load Balancing

Assignment of sessions and team presence services is handled by the locator using various metrics from the edge servers. Key metrics used include the current load and lag (if any) of the server, the number of active connections across sessions, and the number of active sessions. The Locator will allocate new sessions to the best available server, which may be calculated by either load or connections depending on how the server is behaving.

### 2.3.3. Edge Server Regional Assignment

In the case where edge servers have been assigned different regions, the Locator will use the client’s IP address to choose the preferred region and then use load balancing within that region to choose the best server. In the case where all servers in the region are offline, the Locator will fall back and allow requests to be serviced from servers in a different region.

### 2.3.4. Edge Server Hard Failure

If the Edge Server has a hard failure or stops responding to requests, the Locator will automatically flag that server as unavailable and reallocate team presence and incoming requests to the other available servers. If the server is restarted or a new one comes online, new session requests will be distributed to the new server as part of regular load balancing.

Users in active sessions against the edge server that failed will have their sessions ended and they can simply start a new session. The team presence service will automatically be reassigned to a different edge server without user interaction, and the new session will be visible to the various team members in the CodeTogether view.

### 2.3.5. Edge Server to Locator Connection Loss

If a network disruption occurs causing the Edge Server to not be able to connect via websocket to the Locator, existing sessions running on the Edge Server will be unimpacted. In addition, the locator provides a grace period whereby users trying to join sessions from the edge server will still be routed there. As soon as connection is restored, the edge server will relay any missed metrics or audit entries for long-term storage by the locator in the database.

### 2.3.6. Locator Failure or Upgrade

Due to the less critical nature of the locator, in that an outage doesn’t impact existing active sessions, the Locator failure or upgrade simply causes a short disruption for users to start a new session. Once the Locator is back online, the Edge Servers will connect and relay key presence information to the server as well as relay any missed metrics or audit entries that should be persisted in the metrics database.