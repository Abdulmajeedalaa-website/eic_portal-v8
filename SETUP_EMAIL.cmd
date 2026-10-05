@echo off
setlocal
cd /d "%~dp0"
where npx.cmd >nul 2>nul
if errorlevel 1 (
  echo Install Node.js LTS from https://nodejs.org/ then reopen this file.
  pause
  exit /b 1
)
echo Step 1: Sign in to the Cloudflare account that owns eicportal1.
call npx.cmd wrangler login
if errorlevel 1 goto failed
echo Step 2: Paste your Resend API key when Wrangler asks for the secret.
echo First verify eicportal.com in Resend Domains and ensure the receiving mailbox exists.
call npx.cmd wrangler secret put RESEND_API_KEY --name eicportal1
if errorlevel 1 goto failed
echo Step 3: Set the verified sender. Enter contact@eicportal.com when prompted.
call npx.cmd wrangler secret put EMAIL_FROM --name eicportal1
if errorlevel 1 goto failed
echo Step 4: Deploy this website and the email Worker to eicportal1.
call npx.cmd wrangler deploy
if errorlevel 1 goto failed
echo Setup commands completed. Open the published site and test both forms.
echo Confirm delivery in your contact@eicportal.com inbox and Resend Emails dashboard.
pause
exit /b 0
:failed
echo Setup stopped because a command failed. Keep this window open and review the error.
echo Do not share your API key in a screenshot or chat.
pause
exit /b 1
