@echo off
setlocal
cd /d "%~dp0"

echo ======================================================
echo           CareerCompass - Push to GitHub
echo ======================================================
echo.

where git >nul 2>&1
if errorlevel 1 (
  echo Error: Git is not installed or not in PATH.
  echo Install Git from https://git-scm.com/ and try again.
  pause
  exit /b 1
)

echo Configuring Git author...
git config user.email "arshxaryan@users.noreply.github.com"
git config user.name "arshxaryan"

echo Renaming default branch to main...
git branch -m main 2>nul

echo Staging files (respecting .gitignore)...
git add .

echo Committing files...
git commit -m "Initial commit: CareerCompass student career advisor & learning route planner"

echo Setting up remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/arshxaryan/career-advisor.git

echo.
echo Pushing code to https://github.com/arshxaryan/career-advisor.git ...
git push -u origin main

if errorlevel 1 (
  echo.
  echo ------------------------------------------------------
  echo Push encountered a warning or existing commit conflict.
  echo If the GitHub repo already has a README or commits:
  echo Run: git pull origin main --rebase
  echo Then run this script again.
  echo ------------------------------------------------------
  pause
  exit /b 1
)

echo.
echo ======================================================
echo [SUCCESS] CareerCompass pushed to GitHub successfully!
echo Repository: https://github.com/arshxaryan/career-advisor
echo ======================================================
pause
endlocal
