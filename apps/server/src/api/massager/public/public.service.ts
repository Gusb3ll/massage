import { PrismaService } from '@app/db'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class MassagerPublicService {
  constructor(private readonly db: PrismaService) {}

  async getMassagers() {
    const massagers = await this.db.massager.findMany({
      include: { user: true },
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
      ...massager.user,
    }
  }
}
