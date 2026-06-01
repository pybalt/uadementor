# ============================================================
#  UADE Mentor — Script de desarrollo
#  Levanta backend (Spring Boot + H2) y frontend (Vite) juntos
#  Uso: .\scripts\run-dev.ps1
# ============================================================

$repoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$webDir   = Join-Path $repoRoot "web"

Write-Host ""
Write-Host "  UADE Mentor - Dev Mode" -ForegroundColor Cyan
Write-Host "  Backend  -> http://localhost:8080" -ForegroundColor Green
Write-Host "  Frontend -> http://localhost:5173" -ForegroundColor Yellow
Write-Host "  H2 Console -> http://localhost:8080/h2-console" -ForegroundColor Gray
Write-Host ""
Write-Host "  Usuarios de prueba:" -ForegroundColor Gray
Write-Host "    alumno1@demo.com / password123" -ForegroundColor Gray
Write-Host "    tutor1@demo.com  / password123" -ForegroundColor Gray
Write-Host ""

# ── Backend (PowerShell con bypass) ──────────────────────────
Start-Process -FilePath "powershell" `
  -ArgumentList "-ExecutionPolicy Bypass -NoExit -Command `"cd '$repoRoot'; Write-Host 'BACKEND iniciando...' -ForegroundColor Green; .\gradlew.bat bootRun --args='--spring.profiles.active=h2'`"" `
  -WorkingDirectory $repoRoot

Start-Sleep -Seconds 2

# ── Frontend (cmd para evitar restriccion de scripts) ────────
Start-Process -FilePath "cmd" `
  -ArgumentList "/k cd /d `"$webDir`" && npm install && npm run dev" `
  -WorkingDirectory $webDir

Write-Host "  Listo! Dos ventanas abiertas." -ForegroundColor Cyan
Write-Host "  Cuando el backend arranque, abri http://localhost:5173" -ForegroundColor White
Write-Host ""
