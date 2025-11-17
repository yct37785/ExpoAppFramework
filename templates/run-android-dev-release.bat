@echo off
setlocal

echo [1/1] Starting Expo in local "dev-release" mode (no devtools, minified JS)...

REM If you're in a monorepo and need workspace root support, uncomment this:
REM set "EXPO_USE_METRO_WORKSPACE_ROOT=1"

REM Start Expo in production-like mode and open the Android app
call npx expo start --dev false --minify --android
if errorlevel 1 (
  echo [x] Expo start (dev-release) failed
  exit /b 1
)

endlocal
