# Starts backend and frontend in new PowerShell windows
# Usage: .\scripts\run-dev.ps1

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

# Start backend (Gradle bootRun) in new PowerShell window
Start-Process -FilePath "powershell" -ArgumentList @("-NoExit","-Command","cd '$repoRoot'; .\\gradlew.bat bootRun") -WorkingDirectory $repoRoot

# Start frontend (Vite) in new PowerShell window
Start-Process -FilePath "powershell" -ArgumentList @("-NoExit","-Command","cd '$repoRoot\\web'; pnpm install; pnpm run dev") -WorkingDirectory (Join-Path $repoRoot 'web')
