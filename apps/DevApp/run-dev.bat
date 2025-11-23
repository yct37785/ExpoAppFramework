@echo off
setlocal

pushd "%~dp0"
call npx expo run:android --variant debugOptimized

endlocal