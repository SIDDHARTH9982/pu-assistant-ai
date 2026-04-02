@echo off
echo ================================================
echo   PU Assistant AI - Starting All Services
echo ================================================
echo.

SET MONGO_PATH=C:\mongodb\mongodb-win32-x86_64-windows-7.0.9\bin\mongod.exe
SET MONGO_DATA=C:\mongodb\data\db
SET NODE_PATH=C:\Program Files\nodejs
SET PROJECT_DIR=%~dp0

:: ── Step 1: Start MongoDB ──────────────────────────────
echo [1/3] Starting MongoDB...
if exist "%MONGO_PATH%" (
    tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe" >NUL
    if "%ERRORLEVEL%"=="0" (
        echo      MongoDB is already running. Skipping.
    ) else (
        start /B "" "%MONGO_PATH%" --dbpath "%MONGO_DATA%" --port 27017 --bind_ip 127.0.0.1
        timeout /t 3 /nobreak >nul
        echo      MongoDB started on port 27017
    )
) else (
    echo [WARN] MongoDB not found. Trying Windows Service...
    net start MongoDB >nul 2>&1
)

:: ── Step 2: Start Backend ──────────────────────────────
echo [2/3] Starting Backend API (port 5000)...
start "PU Assistant - Backend" cmd /k "SET PATH=%NODE_PATH%;%PATH% && cd /d "%PROJECT_DIR%backend" && node server.js"
timeout /t 4 /nobreak >nul

:: ── Step 3: Start Frontend ─────────────────────────────
echo [3/3] Starting Frontend Dev Server (port 5173)...
start "PU Assistant - Frontend" cmd /k "SET PATH=%NODE_PATH%;%PATH% && cd /d "%PROJECT_DIR%frontend" && npm run dev"
timeout /t 3 /nobreak >nul

:: ── Open Browser ───────────────────────────────────────
start "" "http://localhost:5173"

echo.
echo ================================================
echo   PU ASSISTANT AI IS RUNNING!
echo.
echo   Open in browser:  http://localhost:5173
echo   Backend API:       http://localhost:5000
echo.
echo   LOGIN CREDENTIALS:
echo   Student:  student@poornima.org / Student@123
echo   Admin:    admin@poornima.org   / Admin@PU2024
echo.
echo   Close the two terminal windows to stop servers.
echo ================================================
echo.
pause
