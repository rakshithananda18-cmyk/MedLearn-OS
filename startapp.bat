@echo off
rem MedLearn OS: double-click to run the app locally, on this or any Windows computer.
rem  1. Checks for Node.js and Docker Desktop and offers to install them (winget) if missing.
rem  2. Installs the project's packages and does first-time setup when needed.
rem  3. Starts Docker, the local database and the web app, and opens the browser.
rem Press Ctrl+C in this window to stop everything it started.
setlocal
title MedLearn OS
rem UTF-8 so progress symbols from the tools display correctly.
chcp 65001 >nul
cd /d "%~dp0"

rem ---- Node.js (needs version 24 or newer; start.mjs checks the exact version) ----
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed.
  call :install "OpenJS.NodeJS.LTS" "Node.js LTS"
  goto :end
)

rem ---- Docker Desktop (runs the local database) ----
where docker >nul 2>nul
if errorlevel 1 (
  if not exist "%ProgramFiles%\Docker\Docker\Docker Desktop.exe" (
    echo Docker Desktop is not installed.
    call :install "Docker.DockerDesktop" "Docker Desktop"
    goto :end
  )
)

rem ---- pnpm (comes with Node.js through Corepack) ----
where pnpm >nul 2>nul
if errorlevel 1 (
  echo Setting up pnpm...
  call corepack enable --install-directory "%APPDATA%\npm" pnpm
  if errorlevel 1 call npm install --global pnpm
  where pnpm >nul 2>nul
  if errorlevel 1 (
    echo pnpm was installed but this window cannot see it yet. Close this window and run startapp.bat again.
    goto :end
  )
)

rem ---- Project packages and first-time setup ----
if not exist "node_modules\" (
  echo Installing project packages...
  call pnpm install
  if errorlevel 1 goto :failed
)

if not exist "apps\web\.env.local" (
  echo First-time setup: local database and test browser...
  call pnpm bootstrap
  if errorlevel 1 goto :failed
)

rem ---- Run ----
node scripts\start.mjs %*
goto :end

rem ---- Offers to install a program with winget, then asks the user to re-run ----
:install
where winget >nul 2>nul
if errorlevel 1 (
  echo Please install %~2 manually, then run this again.
  exit /b 1
)
choice /c YN /m "Install %~2 now with winget"
if errorlevel 2 (
  echo Please install %~2, then run this again.
  exit /b 1
)
winget install -e --id %~1
echo.
echo When the installation has finished: close this window, then run startapp.bat again.
echo (Docker Desktop may ask you to restart Windows; open it once afterwards.)
exit /b 0

:failed
echo.
echo Setup failed. Read the messages above, fix the problem, then run this again.

:end
echo.
pause