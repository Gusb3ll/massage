const NODE_ENV = process.env.NODE_ENV ?? 'development'
const DATABASE_URL = process.env.DATABASE_URL ?? ''
const ENTROPY = process.env.ENTROPY ?? ''
const MAILER_HOST = process.env.MAILER_HOST ?? ''
const MAILER_USERNAME = process.env.MAILER_USERNAME ?? ''
const MAILER_PASSWORD = process.env.MAILER_PASSWORD ?? ''

if (
  !NODE_ENV ||
  !DATABASE_URL ||
  !ENTROPY ||
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
