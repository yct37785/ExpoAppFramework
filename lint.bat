@echo off
REM ==============================================================================
REM Lint runner for Windows
REM - Runs ESLint over the whole monorepo (TS/TSX)
REM - Fails on any error; warnings are allowed (tweak with --max-warnings=0)
REM ==============================================================================

REM Ensure node_modules are installed
IF NOT EXIST "node_modules" (
  echo [lint] Installing dependencies...
  npm install
)

echo [lint] Running ESLint...
npx eslint . --ext .ts,.tsx
IF %ERRORLEVEL% NEQ 0 (
  echo [lint] ESLint found issues.
  exit /b %ERRORLEVEL%
)

echo [lint] OK
