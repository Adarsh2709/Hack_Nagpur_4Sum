# BIOKEY_GUARD - TOTAL SYSTEM INITIALIZATION (PowerShell Version)
$ErrorActionPreference = "Continue"

Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "   BIOKEY_GUARD - TOTAL SYSTEM INITIALIZATION" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "Location: $PSScriptRoot"
Write-Host ""

# Kill any existing processes (silent cleanup)
$ports = 5173, 8080, 5005
foreach ($p in $ports) {
    $proc = Get-NetTCPConnection -LocalPort $p -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
    if ($proc) { Stop-Process -Id $proc -Force -ErrorAction SilentlyContinue }
}

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
Write-Host "All requirements found." -ForegroundColor Green
Write-Host "[!] Using MongoDB Atlas Cloud Configuration..." -ForegroundColor Green

# 1. Launch ML Service
Write-Host "[1/3] Launching BIOMETRIC ML SERVICE..." -ForegroundColor Yellow
$mlPath = Join-Path $PSScriptRoot "secure-auth-system\ml-python"
if (Test-Path "$mlPath\app.py") {
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$mlPath'; Write-Host 'Starting ML Service...'; python app.py"
}

# 2. Launch Backend
Write-Host "[2/3] Launching SECURE_AUTH BACKEND..." -ForegroundColor Yellow
$backendPath = Join-Path $PSScriptRoot "secure-auth-system\backend"
$jarFile = Join-Path $backendPath "target\secure-auth-system-0.0.1-SNAPSHOT.jar"

if (Test-Path $jarFile) {
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'Starting Backend...'; java -jar '$jarFile'"
} elseif (Test-Path $backendPath) {
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; Write-Host 'Starting Backend via Maven...'; mvn spring-boot:run"
}

# 3. Launch Frontend
Write-Host "[3/3] Launching BIOKEY_FRONTEND..." -ForegroundColor Yellow
$frontendPath = Join-Path $PSScriptRoot "frontend"
if (Test-Path $frontendPath) {
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; Write-Host 'Starting Frontend...'; npm run dev"
}

Write-Host "`n[!] Verifying Database Readiness (MongoDB Atlas)..." -ForegroundColor Yellow
$maxRetries = 15
$retryCount = 0
$dbConnected = $false

while ($retryCount -lt $maxRetries -and -not $dbConnected) {
    try {
        $resp = Invoke-WebRequest -Uri "http://localhost:8080/api/auth/health" -Method Get -ErrorAction Stop -UseBasicParsing
        $json = $resp.Content | ConvertFrom-Json
        if ($json.database -eq "CONNECTED") {
            $dbConnected = $true
            Write-Host "[+] DATABASE CONNECTED: BiometricDB" -ForegroundColor Green
        }
    } catch {
        Write-Host "." -NoNewline -ForegroundColor Yellow
    }
    if (-not $dbConnected) {
        Start-Sleep -Seconds 2
        $retryCount++
    }
}

if (-not $dbConnected) {
    Write-Host "`n[!] WARNING: DB still initializing, but proceeding to avoid delay." -ForegroundColor Green
}

Write-Host "`n======================================================" -ForegroundColor Cyan
Write-Host "   INITIALIZATION COMPLETE. SYSTEM READY." -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host " ACCESS LINK:" -ForegroundColor White
Write-Host " --> FRONTEND: http://localhost:5173" -ForegroundColor Green
Write-Host ""
Write-Host " [!] IMPORTANT: If registration fails, ensure your Atlas credentials" -ForegroundColor Yellow
Write-Host "     in [backend/src/main/resources/application.yml] are correct." -ForegroundColor Yellow
Write-Host ""
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host " Service monitoring windows are open. Do not close them." -ForegroundColor White

Write-Host ""
Read-Host "Press Enter to exit this launcher window (services will stay running)"
