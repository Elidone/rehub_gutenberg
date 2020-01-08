cls
@echo off
color 0a
title Control Panel

:parse
IF "%~1"=="" GOTO Start
IF "%~1"=="1" goto build
IF "%~1"=="2" goto debug
IF "%~1"=="3" goto zip
IF "%~1"=="9" goto install
SHIFT
GOTO parse

:Start
cls
echo Chose operation:
echo 1 - Build
echo 2 - Debug
echo 3 - Create ZIP
echo 0 - Exit
choice /c 1234567890 /n
if %errorlevel%==10 goto exit
if %errorlevel%==1 goto build
if %errorlevel%==2 goto debug
if %errorlevel%==3 goto zip
if %errorlevel%==9 goto install
goto Start

:build
cls
npm run build
pause
exit


:debug
cls
npm run dev
pause
exit

:zip
cls
del *.zip
7z a -tzip ./gutenberg.zip @src/scripts/listfile.txt
pause
exit

:translate
gulp
pause
exit

:exit
exit

:install
cls
npm install
exit
