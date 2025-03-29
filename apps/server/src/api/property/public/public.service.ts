import { AuthService } from '@app/auth'
import { PrismaService } from '@app/db'
import { Injectable, NotFoundException } from '@nestjs/common'

import { getPropertyQueryParams } from './public.dto'
@Injectable()
export class PropertyPublicService {
  constructor(
    private readonly db: PrismaService,
    private readonly authService: AuthService,
  ) { }

  async getProperty(id: string) {
    const property = await this.db.property.findUnique({
      where: { id },
      include: {
        owner: {
          include: { user: true },
        },
      },
    })
    if (!property) {
      throw new NotFoundException('Property not found')
    }

    return {
      ...property,
      owner: {
        id: property.owner.id,
        firstName: property.owner.user.firstName,
        lastName: property.owner.user.lastName,
        profileImage: property.owner.user.profileImage,
      },
    }
  }

  async getProperties(args: getPropertyQueryParams) {
    const { search } = args
    const properties = await this.db.property.findMany({
      where: {
        ...search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { address: { contains: search, mode: 'insensitive' } },
          ],
        },
      },
    })

    return properties
  }
}
