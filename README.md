# discord-gotify-notification
Use gotify as a notification service for discord due to the official discord client notification not working on lineageOS.

## Prerequisites
• linuxOS (Tested on Ubuntu-x86_64 22.04 and Arch-x86_64 6.1.3)

• Node v19.4.0

• Gotify

## Config

The config file is called `perm.json`

**exclusionList**
excludes messages from inserted IDs

To add more IDs use comma `,`

```
["696969696969696969, 420420420420420420"]
```

**excludeBot**
When set to `true`, messages sent by bots won't be notified.

## Setting up gotify

make a new directory in `$HOME` folder.

```
cd $HOME
mkdir gotify-stuff
cd gotify-stuff
```
Download the zip with the from https://github.com/gotify/server/releases Releases. (Replace v2.2.4 with a newer version if exists)

`wget https://github.com/gotify/server/releases/download/v2.2.4/gotify-linux-amd64.zip`

Unzip the archive.

`unzip gotify-linux-amd64.zip`

Make the binary executable.

`chmod +x gotify-linux-amd64.zip`

Execute gotify/server. (By default gotify server starts port 80)

`sudo ./gotify-linux-amd64.zip`

----

[Optional] if you already have a web server running on port 80 get the configuration file into the same directory as gotify server executable.

`wget -O config.yml https://raw.githubusercontent.com/gotify/server/master/config.example.yml`

change `port: 80` to a different port

----

Go to gotify web GUI at `http://localhost:80`

Login with username `admin` password `admin`

Click on `USERS`, create a new user and remove Admin user.

Click on `APPS` and click on `CREATE APPLICATION`

This will create a new app with a designated `token`

## Setting up the discord bot

If you already have one, just use that.

Clone this repo to anywhere that suits you

```
cd ~/Documents
git clone https://github.com/sand1234560/discord-gotify-notification
cd discord-gotify-notification
```

create a new file named .env using any text editor (nano in this case)

```nano .env```

Enter your bot token (TOKEN=<your-bot-token>)

![Screenshot from 2022-11-29 20-22-25](https://user-images.githubusercontent.com/90265322/204540382-19d9a770-e4ac-40e3-b326-691acdb81aad.png)

<b>Ctrl+O</b>, <b>Enter</b>, <b>Ctrl+X</b> to save and exit nano

## Run as a systemd service
create `gotify.service`, 
`gotify-discord-fetch.service`,
`gotify-discord-send.service` and
`gotify-discord-send.timer`
in `/etc/systemd/system/`

**gotify.service**

```
[Unit]
Description=gotify notification service
After=multi-user.target

[Service]
WorkingDirectory=<path-to-gotify-stuff>
ExecStart=bash -c "./gotify-linux-amd64"
User=root

[Install]
WantedBy=multi-user.target
```
**gotify-discord-fetch.service**

```
[Unit]
Description=keeps track of messages on discord
After=multi-user.target

[Service]
WorkingDirectory=<path-to>/discord-gotify-notif/
ExecStart=node index.js 
User=User=<your-username>

[Install]
WantedBy=multi-user.target
```
**gotify-discord-send.service**

```
[Unit]
Description=Send discord notification through gotify
After=multi-user.target

[Service]
WorkingDirectory=<path-to>/discord-gotify-notif/
ExecStart=node try.js
User=<your-username>

[Install]
WantedBy=multi-user.target
```

**gotify-discord-send.timer**

```
[Unit]
Description=Send notification every 5 minutes

[Timer]
OnBootSec=5min
OnUnitActiveSec=5min
Unit=gotify-discord-send.service

[Install]
WantedBy=timers.target
```

Start the service
  
```  
sudo systemctl enable --now gotify-discord-send.timer
sudo systemctl enable --now gotify-discord-fetch.service
sudo systemctl enable --now gotify.service
```

## On android
I'm using gotify downloaded from F-Droid on LineageOS 20.0 (Android 13)

I won't go in detail on setting up a domain.
  
Points gotify to your domain and specified port and enter your user and password that you've created when setting up gotify.

<img width="50%" alt="android credentials page" src="https://user-images.githubusercontent.com/90265322/213349929-97b8770f-ce84-4e55-8ccb-eeae04d66596.png">

### Done
