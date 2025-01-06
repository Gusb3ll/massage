import { PrismaService } from '@app/db'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PropertyPublicService {
    constructor(
        private readonly db: PrismaService,
    ) { }

    async getProperty(id: string) {
        const property = await this.db.property.findUnique({
            where: {
                id,
            },
        })

        return { data: property }
    }
}
