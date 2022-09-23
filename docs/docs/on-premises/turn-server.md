---
slug: /on-premises-installation-guide/turn-server
sidebar_label: A/V with a TURN Server
sidebar_position: 4.5
---

# Configuring Audio / Video with a TURN Server

## When is a TURN Server Required?

CodeTogether's audio, video and screen sharing capabilities use the WebRTC framework, requiring both TCP and UDP communication to function. However, some corporate firewalls do not allow incoming UDP traffic. For such scenarios, CodeTogether allows UDP traffic to be relayed through a [TURN](https://webrtc.org/getting-started/turn-server) server, allowing these capabilities to function seamlessly over TCP. 

:::caution
Please set up a TURN server on your intranet *only* if CodeTogether's Audio / Video support does not work out of the box for the above mentioned reason.
:::

## Set Up the coturn TURN Server

We will be using the open source [coturn](https://hub.docker.com/r/coturn/coturn) TURN server implementation. 

### 1. Open Ports
Make sure the following incoming **TCP** ports are opened in your network and/or firewall:

```bash
443
4443
3478
5349
```

### 2. Create `turnserver.conf`

:::note
- You will need an SSL certificate for this server.
- Please see [turnserver.conf](https://github.com/coturn/coturn/blob/master/examples/etc/turnserver.conf) for a more advanced example, along with documentation on the different configuration options. 
- You may need to change the network settings in the configuraton file, and in the subsequent `docker run` command based on your environment.
:::

```bash
# make sure you are mapping your <host-IP> to the 'coturn' <container-internal-IP>
# example: external-ip=3.137.210.76/172.17.0.2
external-ip=<hostIP>/<containerIP>

min-port=49152
max-port=65535

verbose

fingerprint

# resolvable FQDN - must match the 'CT_AV_COTURN_SERVER' value in CodeTogether Dockerfile/Helm chart
# example: my-turn-server.example.com
realm=<yourFQDN>

use-auth-secret

# secret string - must match with the 'CT_AV_COTURN_SECRET' value in your CodeTogether Dockerfile/Helm chart
static-auth-secret=<myTURN-Secret>

cert=/etc/coturn/server.crt
pkey=/etc/coturn/server.key

pidfile=/var/tmp/turnserver.pid

syslog
simple-log

no-multicast-peers
no-cli
no-loopback-peers
listening-port=3478
tls-listening-port=5349
no-tlsv1
no-tlsv1_1
listening-ip=0.0.0.0
```
### 3. Run your coturn Container 

Map the configuration file as well as the certificate to the container in the Docker run command.

```bash
$ docker run --name coturn -d --network=host \
-v $(pwd)/turnserver.conf:/etc/coturn/turnserver.conf \
-v $(pwd)/server.key:/etc/coturn/server.key \
-v $(pwd)/server.crt:/etc/coturn/server.crt \
coturn/coturn

$ docker logs -f coturn
...
0: : turn server id=0 created
0: : IPv4. TLS/SCTP listener opened on : 0.0.0.0:3478
0: : IPv4. TLS/TCP listener opened on : 0.0.0.0:3478
0: : IPv4. TLS/SCTP listener opened on : 0.0.0.0:5349
0: : IPv4. TLS/TCP listener opened on : 0.0.0.0:5349
0: : IO method (general relay thread): epoll (with changelist)
0: : turn server id=1 created
0: : IPv4. TLS/SCTP listener opened on : 0.0.0.0:3478
0: : IPv4. TLS/TCP listener opened on : 0.0.0.0:3478
0: : IPv4. TLS/SCTP listener opened on : 0.0.0.0:5349
0: : IPv4. TLS/TCP listener opened on : 0.0.0.0:5349
0: : IPv4. DTLS/UDP listener opened on: 0.0.0.0:3478
0: : IPv4. DTLS/UDP listener opened on: 0.0.0.0:5349
0: : Total General servers: 2
...
```
### 4. Configure CodeTogether Dockerfile / Helm Chart

Add the following values to your CodeTogether's Dockerfile:
```bash
ENV CT_AV_COTURN_SERVER "<yourTURNserverFQDN>"
ENV CT_AV_COTURN_SECRET "<yourTURNserverSecret>"
```

If using the Helm chart, please set the following parameters instead:

```bash
av.stunServers.enabled
av.stunServers.server
av.stunServers.secret
```

### 5. Confirm TURN Server Log Entries

Look for the `Setting your STUN/TURN server` message in your CodeTogether container log to confirm that the TURN server is configured.

```bash
$ docker logs -f codetogether
...
Setting customized time zone >> America/Chicago
2021-12-10 16:45 [INFO] CodeTogether v5.1.0-01183
2021-12-10 16:45 [INFO] Use of this software is governed under the CodeTogether End User License Agreement.

2021-12-10 16:45 [INFO] Please make that ports 4443 and 10000 are exposed outside of the container. In addition, if they are exposed on a different IP address than the hostname f
rom CT_SERVER_URL resolves to, you should set CT_AV_LAN_IP to the exposed IP address on your network. If the IP is the same as CT_SERVER_URL's host resolution, you can set CT_AV_
LAN_IP to auto and it will be resolved within the container.

2021-12-10 16:45 [INFO] CT_AV_PRIVATE_INTERFACE resolved as eth0
2021-12-10 16:45 [INFO] CT_AV_PRIVATE_IP resolved as 172.17.0.2
2021-12-10 16:45 [INFO] CT_AV_LAN_IP resolved as 3.137.210.76
2021-12-10 16:45 [INFO] Setting up A/V engine for qa-av.edge.codetogether.com:443 ..
2021-12-10 16:45 [INFO] Setting your STUN/TURN server to qa-turn.edge.codetogether.com ...
2021-12-10 16:45 [INFO] CT_AV_PRIVATE_INTERFACE resolved as eth0
2021-12-10 16:45 [INFO] CT_AV_PRIVATE_IP resolved as 172.17.0.2
2021-12-10 16:45 [INFO] CT_AV_LAN_IP resolved as 3.137.210.76
2021-12-10 16:45 [INFO] Setting up A/V engine for qa-av.edge.codetogether.com:443 ..
2021-12-10 16:45 [INFO] Setting your STUN/TURN server to qa-turn.edge.codetogether.com ...
...
```