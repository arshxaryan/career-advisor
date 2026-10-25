@echo off
setlocal

cd /d "%~dp0"

echo ======================================================
echo           CareerCompass - Deploy to Firebase
echo ======================================================
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo Error: Node.js is required. Install from https://nodejs.org/
  pause
  exit /b 1
)

echo Step 1: Logging in to Firebase (browser will open if not already logged in)...
cmd /c "npx --yes firebase-tools login"

echo.
echo Step 2: Deploying CareerCompass to Firebase Hosting...
cmd /c "npx --yes firebase-tools deploy --only hosting"

if errorlevel 1 (
  echo.
  echo Deployment encountered an issue. Check the error message above.
  pause
  exit /b 1
)

echo.
echo ======================================================
echo [SUCCESS] Your app has been published to Firebase Hosting!
echo ======================================================
pause
endlocal
