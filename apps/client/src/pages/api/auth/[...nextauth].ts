import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { User as BaseUser, getMe, login } from '@/services/user'

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    phoneNumber: string
    firstName: string
    lastName: string
    gender: string
    dateOfBirth: string
    role: 'USER' | 'MASSAGER' | 'PROPERTY_OWNER' | 'ADMIN'
    isEmailVerified: boolean
    profileImage: string
    massager: {
      coverImage: string
      massageImages: string[]
      certificates: string[]
      vaccineCertificates: string[]
      status: 'AVAILABLE' | 'OCCUPIED' | 'UNAVAILABLE'
      languages: string[]
      skills: string[]
    } | null
    owner: {
      id: string
      coverImage: string
    } | null
    accessToken: string
  }

  interface Session {
    user: User
    expires: string
  }
}

const options: NextAuthOptions = {
  providers: [
    Credentials({
      id: 'credentials',
      credentials: {
        email: { type: 'text' },
        password: { type: 'password' },
        token: { type: 'text' },
      },
      authorize: async (credentials, req) => {
        if (!credentials) {
          throw new Error('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน')
        }

        const headers = req.headers && {
          Referer: req.headers.Referer as string,
          'User-Agent': req.headers['user-agent'] as string,
        }

        const { accessToken } = await login(credentials, { ...headers })
        const user = await getMe(accessToken, { ...headers })

        return { accessToken, ...user }
      },
    }),
    Credentials({
      id: 'credentials-token',
      credentials: {
        accessToken: { type: 'text' },
      },
      authorize: async (credentials, req) => {
        if (!credentials) {
          throw new Error('โทเคนไม่ถูกต้อง')
        }

        const headers = req.headers && {
          Referer: req.headers.Referer as string,
          'User-Agent': req.headers['user-agent'] as string,
        }

        const { accessToken } = credentials
        const user = await getMe(credentials.accessToken, { ...headers })

        return { accessToken, ...user }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger }) => {
      if (trigger === 'update') {
        const _user = await getMe(
          (token as { accessToken: string }).accessToken,
          {},
        )

        return { ...token, ...user, ..._user }
      }

      return { ...token, ...user }
    },
    session: async ({ session, token }) => {
      const _token = token as BaseUser & { accessToken: string }

      session.user = _token

      return session
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
  },
}

const auth = async (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, options)
}

export default auth
