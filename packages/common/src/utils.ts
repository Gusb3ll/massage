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
