@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (echo Install Node.js LTS from https://nodejs.org/ & pause & exit /b 1)
if not exist ".env" (copy ".env.example" ".env" >nul & notepad ".env" & echo Save .env, then run start.bat again. & pause & exit /b 0)
findstr /C:"your_api_key_here" ".env" >nul
if not errorlevel 1 (echo Add your API key to .env, save, then run again. & pause & exit /b 1)
if not exist "node_modules" call npm install
call npm start
pause
