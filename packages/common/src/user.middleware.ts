import { AuthService } from '@app/auth'
import { PrismaService } from '@app/db'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'

import { Context } from './utils'

type Request = FastifyRequest & Context['raw']

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly db: PrismaService,
  ) {}

  async use(req: Request, _res: FastifyReply, next: () => void) {
    try {
      const token = req.headers.authorization?.split(' ')[1]
      if (!token) {
        throw new Error()
      }

      const { id } = this.authService.verifyToken(token)
      const user = await this.db.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          phoneNumber: true,
          firstName: true,
          lastName: true,
          gender: true,
          dateOfBirth: true,
          role: true,
          isEmailVerified: true,
          profileImage: true,
          massager: true,
          owner: true,
        },
      })

      req.user = user
    } catch {
      req.user = null
    }

    return next()
  }
}
