@echo off
setlocal

echo [1/2] Prebuild (clean, non-interactive)...
set "CI=1"
call npx expo prebuild -p android --clean
set "CI="
if errorlevel 1 (
  echo [x] Prebuild failed
  exit /b 1
)

echo [2/2] Build ^& install Android RELEASE build (no Metro bundler)...
REM Build the Android release variant, bundle JS, install to device/emulator, and run it
call npx expo run:android --variant release --no-bundler
if errorlevel 1 (
  echo [x] Release build/install failed
  exit /b 1
)

endlocal
