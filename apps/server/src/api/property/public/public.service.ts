import { AuthService } from '@app/auth'
import { PrismaService } from '@app/db'
import { Injectable, NotFoundException } from '@nestjs/common'

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
          include: { user: true }
        }
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
      }
    }
  }

  async getProperties() {
    const properties = await this.db.property.findMany()

    return properties
  }
}
