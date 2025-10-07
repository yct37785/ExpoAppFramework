@echo off
REM ==============================================================================
REM Lint runner for Windows (ESLint v9 flat config)
REM ==============================================================================

IF NOT EXIST "node_modules" (
  echo [lint] Installing dependencies...
  npm install
)

echo [lint] Running ESLint...
npx eslint . --ext .ts,.tsx
IF %ERRORLEVEL% NEQ 0 (
  echo.
  echo [lint] ESLint found issues.
  echo Press any key to close...
  pause >nul
  exit /b %ERRORLEVEL%
)

echo [lint] OK
pause
