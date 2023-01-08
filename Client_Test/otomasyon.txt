@echo on
echo off
color a
title Alper Beşli
cls
echo Downloading Github Desktop
curl -o GitHubDesktopSetup-x64.exe https://central.github.com/deployments/desktop/desktop/latest/win32 --ssl-no-revoke
echo GitHub Desktop install will start 
pause
START ./GitHubDesktopSetup-x64.exe
echo [OPEN GITHUB FIRST, DONE CONFIGURATIONS REQUIRED, DON'T ENTER SPACE WITHOUT DONE, YOU CAN ASK ME WHAT TO DO.] 
pause
pasue
pause
pause
pause
echo Downloading Node.js 
curl -o node-v18.13.0-x64.msi https://nodejs.org/dist/v18.13.0/node-v18.13.0-x64.msi --ssl-no-revoke
echo Node.js installer will start
pause
pause
pause
START ./node-v18.13.0-x64.msi
pause
cd SVT_Server
npm i install
pause
npm i nodemon
pause
npm start
