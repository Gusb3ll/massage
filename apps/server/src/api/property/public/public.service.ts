import { Injectable } from '@nestjs/common'
import { PrismaService } from '@app/db'
import { AuthService } from '@app/auth'

@Injectable()
export class PropertyPublicService {
  constructor(
    private readonly db: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async getProperty(id: string) {
    const property = await this.db.property.findUnique({
      where: {
        id,
      },
    })

    return property
  }
}
