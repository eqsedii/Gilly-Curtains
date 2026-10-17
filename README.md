# Gilly Admin: simple sign up / log in
Upload admin/index.html to GitHub (admin folder). Run supabase/admins-update.sql once in Supabase SQL Editor. Nothing else to run, ever.

Sign up: email > 6-digit code > set password > in.
Log in: email + password. Forgot password: code > new password > in.
First 3 sign-ups become admins (you count as 1). Then sign-up closes.
Needs Resend SMTP + the code email template in Supabase (Authentication > Emails), and Allow new users to sign up = ON.
Template (Confirm signup AND Magic Link), subject "Your Gilly Interiors Admin code":
<div style="font-family:Arial,sans-serif;max-width:420px;margin:auto;padding:24px;border:1px solid #eee;border-radius:12px"><h2 style="color:#0a3ca8;margin:0 0 8px">Gilly Interiors Admin System</h2><p>Use this code to sign in or set your password:</p><p style="font-size:34px;letter-spacing:8px;font-weight:bold;margin:16px 0">{{ .Token }}</p><p style="color:#666;font-size:13px">The code expires in 1 hour. If you did not ask for it, ignore this email.</p></div>
