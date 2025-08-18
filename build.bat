@echo off
setlocal

echo Cleaning dist folder...

:: Remove dist inside packages/Framework
if exist "packages\Framework\dist" (
    rmdir /s /q "packages\Framework\dist"
)

echo.
echo Building framework...

:: Run tsc with the correct tsconfig path
call npx tsc -p packages\Framework\tsconfig.json

echo.
echo Build finished.
pause
