const NODE_ENV = process.env.NODE_ENV ?? 'development'
const DATABASE_URL = process.env.DATABASE_URL ?? ''
const ENTROPY = process.env.ENTROPY ?? ''
const NEXT_PUBLIC_ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT ?? ''
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET ?? ''
const NEXTAUTH_URL = process.env.NEXTAUTH_URL ?? ''
const MAILER_HOST = process.env.MAILER_HOST ?? ''
const MAILER_USERNAME = process.env.MAILER_USERNAME ?? ''
const MAILER_PASSWORD = process.env.MAILER_PASSWORD ?? ''

if (
  !NODE_ENV ||
  !DATABASE_URL ||
  !ENTROPY ||
  !NEXT_PUBLIC_ENDPOINT ||
  !NEXTAUTH_SECRET ||
  !NEXTAUTH_URL ||
  !MAILER_HOST ||
  !MAILER_USERNAME ||
  !MAILER_PASSWORD
) {
  throw new Error('Missing environment variables')
}

export const env = {
  NODE_ENV,
  DATABASE_URL,
  ENTROPY,
  NEXT_PUBLIC_ENDPOINT,
  NEXTAUTH_SECRET,
  NEXTAUTH_URL,
  MAILER_HOST,
  MAILER_USERNAME,
  MAILER_PASSWORD,
}

export const mailerConfig = {
  transport: {
    host: MAILER_HOST,
    port: 465,
    auth: {
      user: MAILER_USERNAME,
      pass: MAILER_PASSWORD,
    },
    secure: true,
  },
}
