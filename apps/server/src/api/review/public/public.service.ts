import { PrismaService } from '@app/db'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ReviewPublicService {
  constructor(private readonly db: PrismaService) {}

  async getMassagerReviews(id: string) {
    const reviews = await this.db.massagerReview.findMany({
      where: { massagerId: id },
      orderBy: { createdAt: 'desc' },
    })

    return reviews
  }

  async getPropertyReviews(id: string) {
    const reviews = await this.db.propertyReview.findMany({
      where: { propertyId: id },
      orderBy: { createdAt: 'desc' },
    })

    return reviews
  }
}
