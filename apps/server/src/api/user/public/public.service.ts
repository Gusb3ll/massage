import { AuthService } from '@app/auth'
import { PrismaService } from '@app/db'
import { BadRequestException, Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { init } from '@paralleldrive/cuid2'

import { LoginArgs, RegisterArgs, VerifyEmailArgs } from './public.dto'

@Injectable()
export class UserPublicService {
  constructor(
    private readonly db: PrismaService,
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
  ) { }

  async register(args: RegisterArgs) {
    const { email, password, ...rest } = args

    const exist = await this.db.user.findUnique({ where: { email } })
    if (exist) {
      throw new BadRequestException('User already exists.')
    }

    await this.db.$transaction(async tx => {
      const hashedPassword = await this.authService.hashPassword(password)
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          ...rest,
        },
      })

      if (rest.role === 'MASSAGER') {
        await tx.massager.create({
          data: {
            coverImage: 'https://placehold.co/1500x500',
            profileImage: 'https://placehold.co/256x256',
            userId: user.id,
          },
        })
      } else if (rest.role === 'PROPERTY_OWNER') {
        await tx.propertyOwner.create({
          data: {
            coverImage: 'https://placehold.co/1500x500',
            profileImage: 'https://placehold.co/256x256',
            userId: user.id,
          },
        })
      }

      const token = await init({ fingerprint: 'email-verify' })()
      await tx.emailVerify.create({
        data: {
          token,
          userId: user.id,
        },
      })
      await this.mailerService.sendMail({
        from: 'no-reply@lico.moe',
        to: args.email,
        subject: '[Massage] Email verification',
        html: `Please verify your email by clicking <a href="https://massage.lico.moe/verify/${token}">here</a>`,
      })
    })
  }

  async login(args: LoginArgs) {
    const user = await this.db.user.findUnique({
      where: { email: args.email },
    })
    if (!user) {
      throw new BadRequestException('Invalid email or password.')
    }

    if (!user.isEmailVerified) {
      const existToken = await this.db.emailVerify.findFirst({
        where: { userId: user.id },
      })
      if (existToken) {
        await this.mailerService.sendMail({
          from: 'no-reply@lico.moe',
          to: args.email,
          subject: '[Massage] Email verification',
          html: `Please verify your email by clicking <a href="https://massage.lico.moe/verify/${existToken.token}">here</a>`,
        })
      }

      throw new BadRequestException('Please verify your email first.')
    }

    const isPasswordValid = await this.authService.verifyPassword(
      args.password,
      user.password,
    )
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password.')
    }

    return { accessToken: this.authService.generateToken(user.id) }
  }

  async verifyEmail(args: VerifyEmailArgs) {
    const existToken = await this.db.emailVerify.findUnique({
      where: { token: args.token },
    })
    if (!existToken) {
      throw new BadRequestException('Invalid token.')
    }

    const user = await this.db.user.findUnique({
      where: { id: existToken.userId },
    })
    if (!user) {
      throw new BadRequestException('Invalid token.')
    }
    if (user.isEmailVerified) {
      throw new BadRequestException('Email already verified.')
    }

    await this.db.$transaction(async tx => {
      await tx.user.update({
        where: { id: user.id },
        data: { isEmailVerified: true },
      })
      await tx.emailVerify.delete({
        where: { token: args.token },
      })
    })
  }
}
