import { AuthService } from '@app/auth'
import { PrismaService } from '@app/db'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class PropertyPublicService {
  constructor(
    private readonly db: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async getProperty(id: string) {
    const property = await this.db.property.findUnique({
      where: { id },
    })
    if (!property) {
      throw new NotFoundException('Property not found')
    }

    return property
  }

  async getProperties() {
    const properties = await this.db.property.findMany()

    return properties
  }
}
