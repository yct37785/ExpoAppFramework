@echo off
setlocal
pushd "%~dp0"
call ..\..\templates\run-full-rebuild-android.bat
endlocal