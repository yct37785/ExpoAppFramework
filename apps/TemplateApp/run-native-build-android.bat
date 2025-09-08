@echo off
setlocal
pushd "%~dp0"
call ..\..\templates\run-native-build-android.bat
endlocal