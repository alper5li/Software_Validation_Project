@echo off 
color a 
cls 
title Alper Beşli	
cls
echo Downloading Node.js Enviroment if needed
curl -o node-v18.13.0-x64.msi https://nodejs.org/dist/v18.13.0/node-v18.13.0-x64.msi --ssl-no-revoke
echo Node.js installer will start
pause
START ./node-v18.13.0-x64.msi
cd SVT_Server
npm i install
npm i nodemon