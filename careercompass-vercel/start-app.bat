@echo off
setlocal

cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo Node.js is required to run CareerCompass.
  echo Install Node.js 18 or newer from https://nodejs.org/ and run this file again.
  pause
  exit /b 1
)

echo ======================================================
echo           CareerCompass - Career Advisor Guide
echo ======================================================
echo Starting local server at http://localhost:3000 ...
echo Close this window to stop the server.
echo.

:: Open the browser after 1 second
start "" cmd /c "timeout /t 1 /nobreak >nul & start http://localhost:3000"

node server.js

if errorlevel 1 (
  echo.
  echo CareerCompass server stopped with an error. Check above.
  pause
)

endlocal