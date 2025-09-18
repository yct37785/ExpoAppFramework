@echo off
setlocal
pushd "%~dp0"
call .\android\gradlew signingReport
popd
endlocal
