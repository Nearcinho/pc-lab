@echo off
cd /d C:\Users\AERO\nexa
"C:\Program Files\nodejs\npm.cmd" run prices:update >> data\prices-update.log 2>&1
