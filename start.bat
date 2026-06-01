@echo off
title UADE Mentor - Dev

echo ====================================
echo   Iniciando UADE Mentor
echo ====================================
echo.

start "Backend - Spring Boot" cmd /k "cd /d %~dp0 && .\gradlew.bat bootRun --args="--spring.profiles.active=h2""

echo [Backend] Iniciando en puerto 8080...
echo Esperando 15 segundos para que el backend levante...
timeout /t 15 /nobreak >nul

start "Frontend - React Vite" cmd /k "cd /d %~dp0web && npm install && npm run dev"

echo [Frontend] Iniciando en puerto 5173...
echo.
echo ====================================
echo  Backend:    http://localhost:8080
echo  Frontend:   http://localhost:5173
echo  H2 Console: http://localhost:8080/h2-console
echo ====================================
echo.
echo  Usuarios de prueba:
echo    alumno1@demo.com / password123
echo    tutor1@demo.com  / password123
echo.
echo Cerra las ventanas de comandos para detener los servicios.
pause
