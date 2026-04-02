@echo off
echo ================================================
echo  PU Assistant AI - Database Seeder
echo ================================================
echo.
echo This will seed the database with:
echo  - 15+ Poornima University knowledge entries
echo  - 8 sample FAQs
echo  - 5 university notices
echo  - Demo admin and student accounts
echo.

:: Start MongoDB
net start MongoDB >nul 2>&1

SET PATH=C:\Program Files\nodejs;%PATH%
cd /d "%~dp0backend"
node seed/seed.js

echo.
pause
