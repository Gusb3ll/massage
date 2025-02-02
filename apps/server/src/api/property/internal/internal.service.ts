import { Context, getUserFromContext } from '@app/common'
import { PrismaService } from '@app/db'
import { Injectable, NotFoundException } from '@nestjs/common'

import { CreatePropertyArgs, UpdatePropertyArgs } from './internal.dto'

@Injectable()
export class PropertyInternalService {
  constructor(private readonly db: PrismaService) { }

  getMe(ctx: Context) {
    const user = getUserFromContext(ctx)

    return user
  }

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

  async updateProperty(args: UpdatePropertyArgs, ctx: Context) {
    const user = getUserFromContext(ctx)

    const property = await this.db.property.findFirst({
      where: {
        owner: {
          userId: user.id,
        },
      },
    })
    if (!property) {
      throw new NotFoundException('Property not found')
    }

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

  async deleteProperty(id: string, ctx: Context) {
    const user = getUserFromContext(ctx)

    const property = await this.db.property.findFirst({
      where: {
        owner: {
          userId: user.id,
        },
      },
    })
    if (!property) {
      throw new NotFoundException('Property not found')
    }
    await this.db.property.delete({
      where: { id },
    })
  }
}
