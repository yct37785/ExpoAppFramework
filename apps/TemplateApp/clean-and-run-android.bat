@echo off
setlocal
pushd "%~dp0"
call ..\..\templates\clean-and-run-android.bat
endlocal