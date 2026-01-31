@echo off
powershell -ExecutionPolicy Bypass -File "%~dp0run_presentation.ps1"
if %ERRORLEVEL% neq 0 (
    echo.
    echo PowerShell script failed to start. 
    echo Please right-click 'run_presentation.ps1' and select 'Run with PowerShell'.
    pause
)
