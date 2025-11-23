@echo off
setlocal

pushd "%~dp0"
set CLEAN_INSTALL=true
call ..\..\templates\run-android.bat

endlocal
pause