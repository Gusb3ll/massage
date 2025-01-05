import { Context, getUserFromContext } from '@app/common'
import { PrismaService } from '@app/db'
import { Injectable } from '@nestjs/common'

import { CreatePropertyArgs, UpdatePropertyArgs } from './internal.dto'

@Injectable()
export class PropertyInternalService {
  constructor(private readonly db: PrismaService) {}

  async createProperty(args: CreatePropertyArgs, ctx: Context) {
    const user = getUserFromContext(ctx)
    await this.db.property.create({
      data: {
        name: args.name,
        description: args.description,
        price: args.price,
        address: args.address,
        images: args.images,
        rooms: args.rooms,
        roomWidth: args.roomWidth,
        roomHeight: args.roomHeight,
        ownerId: user.id,
      },
    })
  }

  async updateProperty(args: UpdatePropertyArgs) {
    await this.db.property.update({
      where: {
        id: args.id,
      },
      data: {
        name: args.name,
        description: args.description,
        price: args.price,
        address: args.address,
        images: args.images,
        rooms: args.rooms,
        roomWidth: args.roomWidth,
        roomHeight: args.roomHeight,
      },
    })
  }
}
