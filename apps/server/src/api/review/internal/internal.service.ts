import { Context, getUserFromContext } from '@app/common'
import { PrismaService } from '@app/db'
import { Injectable } from '@nestjs/common'

import { ReviewArgs } from './internal.dto'

@Injectable()
export class ReviewInternalService {
  constructor(private readonly db: PrismaService) {}

  async reviewMassager(args: ReviewArgs, ctx: Context) {
    const user = getUserFromContext(ctx)
    const { id, rating, description } = args

    await this.db.massagerReview.create({
      data: {
        massagerId: id,
        rating,
        description,
        userId: user.id,
      },
    })
  }

  async reviewProperty(args: ReviewArgs, ctx: Context) {
    const user = getUserFromContext(ctx)
    const { id, rating, description } = args

    await this.db.propertyReview.create({
      data: {
        propertyId: id,
        rating,
        description,
        userId: user.id,
      },
    })
  }
}
