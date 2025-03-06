import { UnauthorizedException } from '@nestjs/common'
import { FastifyRequest } from 'fastify'

export type Context = FastifyRequest & {
  raw: {
    user: {
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
    } | null
  }
}

export const getUserFromContext = (ctx: Context) => {
  const user = ctx.raw.user
  if (!user) {
    throw new UnauthorizedException('Unauthorized')
  }

  return user
}
