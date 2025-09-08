@echo off
setlocal ENABLEDELAYEDEXPANSION

REM =========================================
REM Always-do-a-fresh-rebuild Android script
REM Steps:
REM  1) Verify Firebase files exist
REM  2) Expo prebuild (clean) for Android
REM  3) Uninstall currently installed app (best effort)
REM  4) Build & install dev client
REM  5) Start Metro with --clear
REM =========================================

REM ---- Move to the app folder (script location) ----
set APP_DIR=%~dp0
pushd "%APP_DIR%"

REM ---- 1) Check required Firebase files (Android) ----
if not exist ".\google-services.json" (
  echo [!] Missing google-services.json in this app folder: %CD%
  echo     Place your Firebase Android config at: %CD%\google-services.json
  exit /b 1
)

REM ---- 2) Prebuild (clean) ----
echo [i] Regenerating native Android project (expo prebuild --clean)...
call npx expo prebuild -p android --clean
if errorlevel 1 (
  echo [!] expo prebuild failed
  exit /b 1
)

REM ---- 3) Uninstall currently installed app (best effort) ----
REM Get android.package from resolved Expo config
echo [i] Resolving android.package from Expo config...
call npx expo config --json > __expo_config.json 2>nul
for /f "usebackq tokens=* delims=" %%A in (`powershell -NoProfile -Command ^
  "(Get-Content '__expo_config.json' -Raw | ConvertFrom-Json).expo.android.package"`) do (
  set PKG=%%A
)
del /q __expo_config.json >nul 2>&1

if defined PKG (
  echo [i] Uninstalling %PKG% from device/emulator (if present)...
  call adb uninstall %PKG% >nul 2>&1
) else (
  echo [!] Could not detect android.package; skipping uninstall
)

REM ---- 4) Build & install dev client ----
echo [i] Building and installing (npx expo run:android)...
call npx expo run:android
if errorlevel 1 (
  echo [!] expo run:android failed
  exit /b 1
)

REM ---- 5) Start Metro with cache cleared ----
echo [i] Starting Metro with cache reset (Ctrl+C to stop)...
call npx expo start --dev-client --clear

echo.
echo [✓] Fresh rebuild complete.
pause
endlocal
