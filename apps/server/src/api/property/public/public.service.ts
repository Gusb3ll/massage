import { AuthService } from '@app/auth'
import { PrismaService } from '@app/db'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PropertyPublicService {
    constructor(
        private readonly db: PrismaService,
        private readonly authService: AuthService,
    ) { }

    async getProperty(id: string) {
        const property = await this.db.property.findUnique({
            where: {
                id,
            },
        })

        return { property }
    }
}