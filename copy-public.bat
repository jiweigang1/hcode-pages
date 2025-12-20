@echo off
REM Windows batch script to copy all files from public directory to D:\Javaworks\hawa-code-pages
REM This script copies the generated Hexo site files to the target directory

setlocal enabledelayedexpansion

REM Configuration
set "SOURCE_DIR=public"
set "TARGET_DIR=D:\Javaworks\hawa-code-pages"

REM Check if source directory exists
if not exist "%SOURCE_DIR%" (
    echo Error: Source directory '%SOURCE_DIR%' does not exist!
    echo Please run 'npm run build' first to generate the public directory.
    pause
    exit /b 1
)

REM Check if target directory exists, create if it doesn't
if not exist "%TARGET_DIR%" (
    echo Creating target directory: %TARGET_DIR%
    mkdir "%TARGET_DIR%"
)

REM Copy all files from public to target directory
echo Copying files from %SOURCE_DIR% to %TARGET_DIR%...

REM Use robocopy for efficient copying (Windows built-in)
if exist "%SYSTEMROOT%\System32\robocopy.exe" (
    echo Using robocopy for efficient copying...
    robocopy "%SOURCE_DIR%" "%TARGET_DIR%" /E /COPY:DAT /R:3 /W:5 /NP /NFL /NDL
    if !errorlevel! LEQ 7 (
        echo ✅ Successfully copied all files to %TARGET_DIR%
    ) else (
        echo ❌ Error occurred during copying! Error level: !errorlevel!
        pause
        exit /b 1
    )
) else (
    echo Using xcopy for copying...
    xcopy "%SOURCE_DIR%\*" "%TARGET_DIR%\" /E /Y /I /H
    if !errorlevel! EQU 0 (
        echo ✅ Successfully copied all files to %TARGET_DIR%
    ) else (
        echo ❌ Error occurred during copying! Error level: !errorlevel!
        pause
        exit /b 1
    )
)

REM Show some statistics
echo.
echo Files copied. First 10 files in target:
for /f "tokens=*" %%i in ('dir "%TARGET_DIR%" /s /b /a-d ^| head -10 2^>nul') do echo %%i
echo ...

REM Count total files
set file_count=0
for /f %%i in ('dir "%TARGET_DIR%" /s /b /a-d 2^>nul ^| find /c /v ""') do set file_count=%%i
echo Total files in target: %file_count%

echo.
echo Done!
pause