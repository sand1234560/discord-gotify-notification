# discord-gotify-notification
Use gotify as a notification service for discord due to the official discord client notification not working on lineageOS.

## Prerequisites
• linuxOS (Tested on Ubuntu-x86_64 22.04 and Arch-x86_64 6.1.3)

• Node v19.4.0

• Gotify

## Setting up gotify

Download the zip with the from https://github.com/gotify/server/releases Releases. (Replace v2.2.4 with a newer version if exists)

`wget https://github.com/gotify/server/releases/download/v2.2.4/gotify-linux-amd64.zip`

Unzip the archive.

`unzip gotify-linux-amd64.zip`

Make the binary executable.

`chmod +x gotify-linux-amd64.zip`

Execute gotify/server. (By default gotify server starts port 80)

`sudo ./gotify-linux-amd64.zip`

[Optional] if you already have a web server running on port 80 get the configuration file into the same directory as gotify server executable.

`wget -O config.yml https://raw.githubusercontent.com/gotify/server/master/config.example.yml`

change `port: 80` to a different port

Go to gotify web GUI at `http://localhost:80`

Login with username admin password admin

Click on `USERS` and create a new user and remove Admin user

Click on `APPS` and click on `CREATE APPLICATION`

This will create a new app token

## Setting up the discord bot
