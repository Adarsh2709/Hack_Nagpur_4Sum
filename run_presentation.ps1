# BIOKEY_GUARD - TOTAL SYSTEM INITIALIZATION (PowerShell Version)
$ErrorActionPreference = "Continue"

Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "   BIOKEY_GUARD - TOTAL SYSTEM INITIALIZATION" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "Location: $PSScriptRoot"
Write-Host ""

# 0. Check Requirements
Write-Host "[0/3] CHECKING SYSTEM REQUIREMENTS..." -ForegroundColor Yellow
$py = Get-Command python -ErrorAction SilentlyContinue
$npm = Get-Command npm -ErrorAction SilentlyContinue

if (-not $py) { Write-Host "[!] ERROR: Python not found!" -ForegroundColor Red; $fail = $true }
if (-not $npm) { Write-Host "[!] ERROR: Node.js (npm) not found!" -ForegroundColor Red; $fail = $true }

if ($fail) {
    Write-Host "`nPlease install missing software before continuing." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit
}
Write-Host "All requirements found.`n" -ForegroundColor Green

# 1. Launch ML Service
Write-Host "[1/3] Launching BIOMETRIC ML SERVICE..." -ForegroundColor Yellow
$mlPath = Join-Path $PSScriptRoot "secure-auth-system\ml-python"
if (Test-Path "$mlPath\app.py") {
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$mlPath'; Write-Host 'Starting ML Service...'; python app.py"
} else {
    Write-Host "ERROR: ML Service folder or app.py not found at $mlPath" -ForegroundColor Red
}

# 2. Launch Backend
Write-Host "[2/3] Launching SECURE_AUTH BACKEND..." -ForegroundColor Yellow
$backendPath = Join-Path $PSScriptRoot "secure-auth-system\backend"
if (Test-Path $backendPath) {
    $cmd = if (Test-Path "$backendPath\mvnw") { "./mvnw spring-boot:run" } else { "mvn spring-boot:run" }
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; Write-Host 'Starting Backend...'; $cmd"
} else {
    Write-Host "ERROR: Backend folder not found at $backendPath" -ForegroundColor Red
}

# 3. Launch Frontend
Write-Host "[3/3] Launching BIOKEY_FRONTEND..." -ForegroundColor Yellow
$frontendPath = Join-Path $PSScriptRoot "frontend"
if (Test-Path $frontendPath) {
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; Write-Host 'Starting Frontend...'; npm run dev"
} else {
    Write-Host "ERROR: Frontend folder not found at $frontendPath" -ForegroundColor Red
}

Write-Host "`n======================================================" -ForegroundColor Cyan
Write-Host "   INITIALIZATION COMPLETE. 3 WINDOWS OPENED." -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan
Read-Host "Press Enter to close this window"
