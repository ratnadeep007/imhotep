# Imhotep

Project to manage hospital.

### How to run

1. clone this repo, npm install
2. add `DATABASE_URL` (postgres) for database
3. System uses email magic link for login so add following environment variables:
- SMTP_HOST
- SMTP_PORT
- SMTP_USER
- SMTP_PASSWORD
- SMTP_FROM

you can use coackroach db (free) for postgres database and sendinblue (free) 300 emails per day.
