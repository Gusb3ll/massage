import { PrismaService } from '@app/db'
import { Injectable, NotFoundException } from '@nestjs/common'

import { getMassagerQueryParams } from './public.dto'

@Injectable()
export class MassagerPublicService {
  constructor(private readonly db: PrismaService) {}

  async getMassagers(args: getMassagerQueryParams) {
    const { search } = args

    const massagers = await this.db.massager.findMany({
      where: {
        ...(search && {
          user: {
            OR: [
              { firstName: { contains: search, mode: 'insensitive' } },
              { lastName: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
            ],
          },
        }),
      },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    })

    return massagers.map(m => ({
      ...m,
      profileImage: m.user.profileImage,
      firstName: m.user.firstName,
      lastName: m.user.lastName,
      gender: m.user.gender,
    }))
  }

  async getMassager(id: string) {
    const massager = await this.db.massager.findUnique({
      where: { id },
      include: { user: true },
    })
    if (!massager) {
      throw new NotFoundException('Massager not found')
    }

    return {
      ...massager,
      profileImage: massager.user.profileImage,
      firstName: massager.user.firstName,
      lastName: massager.user.lastName,
      gender: massager.user.gender,
      dateOfBirth: massager.user.dateOfBirth,
    }
  }
}
