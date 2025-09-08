@echo off
setlocal

echo [1/3] Prebuild (clean, non-interactive)...
set "CI=1"
call npx expo prebuild -p android --clean
set "CI="
if errorlevel 1 (
  echo [x] Prebuild failed
  exit /b 1
)

echo [2/3] Build & install (non-interactive)...
set "CI=1"
call npx expo run:android
set "CI="
if errorlevel 1 (
  echo [x] Build/install failed
  exit /b 1
)

echo [3/3] Start Metro (clear cache)...
call npx expo start --dev-client --clear

echo [✓] Done.
endlocal
