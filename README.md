# discord-gotify-notification

Use gotify as a notification service for discord due to the notification of the official discord client  not working on lineageOS.

### This project uses discord.js to fetch messages. You can only get messages from servers that you have your bot in.

## Prerequisites
• linux (Tested on Ubuntu 22.04 and Arch 6.2.1)

• Node v19.4.0

• Gotify

## Configuration
`perm.json` is the config file
### exclusionList
Exclude users by their ID.
Use comma `,` for multiple IDs (i.e. ["420420420420420420", "696969696969696969"]
### excludeBot
Exclude messages sent by bots.
### goURL
URL of gotify service (i.e. http://localhost:80/message?token=A0i1dP0nRpC12gs)

## Gotify setup
Make a new directory to store the all the gotify files

```
mkdir gotify-stuff
cd gotify-stuff
```

Download the zip file from https://github.com/gotify/server/releases (Replace v2.2.4 with a newer version if exists)

`wget https://github.com/gotify/server/releases/download/v2.2.4/gotify-linux-amd64.zip`

Unzip the archive.

`unzip ./gotify-linux-amd64.zip`

Make the binary executable.

`chmod +x ./gotify-linux-amd64.zip`

Start gotify/server. (By default gotify server starts port 80)

`sudo ./gotify-linux-amd64`

----

### [Optional] 

If you already have a web server running on port 80, place the configuration file in the same directory as the gotify server executable.

`wget -O config.yml https://raw.githubusercontent.com/gotify/server/master/config.example.yml` <- This is the config file

change `port: 80` to a different port

----

Go to gotify web GUI at `http://localhost:80`

Login with username `admin` password `admin`

Click on `USERS`, create a new user and remove Admin user.

<img width=50% alt="Screen Shot 2566-01-19 at 14 37 13" src="https://user-images.githubusercontent.com/90265322/213382967-537c08d9-04c5-4487-b25a-ca23cabd5b70.png">


Click on `APPS` and click on `CREATE APPLICATION`

<img width=50% alt="Screen Shot 2566-01-19 at 14 37 58" src="https://user-images.githubusercontent.com/90265322/213383011-c30541b6-f415-45d6-8fe1-f48be5173cc6.png">


This will create a new app with a designated `token`

<img width=50% alt="Screen Shot 2566-01-19 at 14 38 05" src="https://user-images.githubusercontent.com/90265322/213383042-203353b3-1c9c-4490-96ae-282dc9f20ac3.png">

## Systemd service setup

Create `gotify.service`, `discord-gotify-fetch.service`, `discord-gotify-send.service` and `discord-gotify-send.timer`

inside `/etc/systemd/system/`.

**gotify.service** (This service keeps gotify running.)

```
[Unit]
Description=gotify notification service
After=multi-user.target

[Service]
WorkingDirectory=<path-to>/gotify-stuff
ExecStart=bash -c "./gotify-linux-amd64"
User=root

[Install]
WantedBy=multi-user.target
```
**discord-gotify-fetch.service** (This service keeps track of messages in discord.)

```
[Unit]
Description=keeps track of messages on discord
After=multi-user.target

[Service]
WorkingDirectory=<path-to>/discord-gotify-notification/
ExecStart=node index.js 
User=<your-username>

[Install]
WantedBy=multi-user.target
```
**discord-gotify-send.service** (This service sends gotify notification.)

```
[Unit]
Description=Send discord notification through gotify
After=multi-user.target

[Service]
WorkingDirectory=<path-to>/discord-gotify-notification/
ExecStart=node try.js
User=<your-username>

[Install]
WantedBy=multi-user.target
```

**discord-gotify-send.timer** (This service runs discord-gotify-send.service every 1 minutes)

```
[Unit]
Description=Send notification every 1 minutes

[Timer]
OnBootSec=1min
OnUnitActiveSec=1min
Unit=discord-gotify-send.service

[Install]
WantedBy=timers.target
```

Start the service and make it run on boot.
  
```  
sudo systemctl enable --now discord-gotify-send.timer
sudo systemctl enable --now discord-gotify-fetch.service
sudo systemctl enable --now gotify.service
```

## Android client

I'm using gotify downloaded from F-Droid on LineageOS 20.0 (Android 13)

I won't go in detail on setting up a domain.
  
Points gotify to your domain and specified port and enter your username and password that you've created when setting up gotify.

<img width="60%" alt="android client login" src="https://user-images.githubusercontent.com/90265322/213386497-3d466610-69b6-48e3-addd-268d848282aa.png">

## [Optional] Creaing a new discord bot

Follow this if you don't already have a discord bot.

Go to https://discord.com/developers/applications/ and create a new application

<img width="60%" alt="sus" src="https://user-images.githubusercontent.com/90265322/204464252-f7af47fb-664c-45b7-a71a-eca47ae0956f.png">

<img width="60%" alt="sus" src="https://user-images.githubusercontent.com/90265322/204464264-b0b876a9-1567-41ab-bfbf-f3651233ba67.png">

<img width="60%" alt="sus" src="https://user-images.githubusercontent.com/90265322/204464287-8fff2ce2-fdc1-4d07-bd10-c8fd1fda1714.png">

Add a bot

<img width="60%" alt="sus" src="https://user-images.githubusercontent.com/90265322/204464419-98855860-c009-4087-95e0-c19c90d098de.png">

Give the bot some privileges

<img width="60%" alt="sus" src="https://user-images.githubusercontent.com/90265322/204467001-3aef7e83-e355-4741-afa2-8de893b483be.png">

Reset the token

<img width="60%" alt="sus" src="https://user-images.githubusercontent.com/90265322/204464427-0f32af47-c1f9-472d-ae4e-1043b66eecca.png">

Copy the token (Token is an authentication Key, keep it safe)

<img width="60%" alt="sus" src="https://user-images.githubusercontent.com/90265322/204464446-7bb30136-55f8-452f-a4c6-4298ee499e85.png">

invite the bot to your server.

<img width="60%" alt="sus" src="https://user-images.githubusercontent.com/90265322/204468054-fcb909c3-599a-4526-a78f-ebde8f8da39a.png">

<img width="60%" alt="sus" src="https://user-images.githubusercontent.com/90265322/204468222-7e67c26a-62fe-4e48-849b-e17e0cef4524.png">
