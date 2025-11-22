@echo off
setlocal

echo [1/1] Build ^& install (Metro will start automatically)...
REM IMPORTANT: do NOT set CI here, so Metro starts in watch mode
call npx expo run:android --variant debug
REM npx expo run:android --variant debugOptimized
if errorlevel 1 (
  echo [x] Build/install failed
  exit /b 1
)

endlocal
