@echo off
setlocal

echo [1/1] Starting Expo in local "dev-release" mode (no devtools, minified JS)...

REM If you're in a monorepo and need workspace-root support, uncomment this:
REM set "EXPO_USE_METRO_WORKSPACE_ROOT=1"

REM Start Expo in "release-like" mode and open the Android app
npx expo start --no-dev --minify --android

endlocal
