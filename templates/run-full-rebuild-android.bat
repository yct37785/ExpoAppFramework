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

echo [2/2] Build ^& install (Metro will start automatically)...
REM IMPORTANT: do NOT set CI here, so Metro starts in watch mode
call npx expo run:android --variant debugOptimized
REM npx expo run:android --variant debugOptimized
if errorlevel 1 (
  echo [x] Build/install failed
  exit /b 1
)

endlocal
