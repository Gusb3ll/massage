const NODE_ENV = process.env.NODE_ENV ?? 'development'
const DATABASE_URL = process.env.DATABASE_URL ?? ''
const ENTROPY = process.env.ENTROPY ?? ''
const MAILER_HOST = process.env.MAILER_HOST ?? ''
const MAILER_USERNAME = process.env.MAILER_USERNAME ?? ''
const MAILER_PASSWORD = process.env.MAILER_PASSWORD ?? ''
const MINIO_ENDPOINT = process.env.MINIO_ENDPOINT ?? ''
const MINIO_BUCKET = process.env.MINIO_BUCKET ?? ''
const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY ?? ''
const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY ?? ''

if (
  !NODE_ENV ||
  !DATABASE_URL ||
  !ENTROPY ||
  !MAILER_HOST ||
  !MAILER_USERNAME ||
  !MAILER_PASSWORD ||
  !MINIO_ENDPOINT ||
  !MINIO_BUCKET ||
  !MINIO_ACCESS_KEY ||
  !MINIO_SECRET_KEY
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
  MINIO_ENDPOINT,
  MINIO_BUCKET,
  MINIO_ACCESS_KEY,
  MINIO_SECRET_KEY,
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
