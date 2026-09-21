@echo off
set GIT=C:\Users\arsha\AppData\Local\MinGit\cmd\git.exe
cd /d "c:\Users\arsha\Downloads\careercompass-vercel"

%GIT% config user.email "arshxaryan@users.noreply.github.com"
%GIT% config user.name "arshxaryan"
%GIT% branch -m main
%GIT% add .
%GIT% commit -m "Initial commit: CareerCompass student career advisor"
%GIT% remote remove origin 2>nul
%GIT% remote add origin https://github.com/arshxaryan/career-advisor.git
%GIT% push -u origin main
