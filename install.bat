@echo off
REM Run cross-platform setup (sync first, then install)
call npm run setup
set ERR=%ERRORLEVEL%

echo.
if %ERR% neq 0 (
  echo [install] FAILED with exit code %ERR%.
  echo Press any key to close...
) else (
  echo [install] Finished successfully.
  echo Press any key to close...
)
pause >nul
exit /b %ERR%
