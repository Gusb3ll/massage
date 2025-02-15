import { Context, getUserFromContext } from '@app/common'
import { PrismaService } from '@app/db'
import { Injectable, NotFoundException } from '@nestjs/common'

import { CreatePropertyArgs, UpdatePropertyArgs } from './internal.dto'

@Injectable()
export class PropertyInternalService {
  constructor(private readonly db: PrismaService) {}

  private async getPropertyOwner(userId: string) {
    const owner = await this.db.propertyOwner.findUnique({
      where: { userId },
    })
    if (!owner) {
      throw new NotFoundException('Owner not found')
    }

    return owner
  }

  async createProperty(args: CreatePropertyArgs, ctx: Context) {
    const user = getUserFromContext(ctx)

    const owner = await this.getPropertyOwner(user.id)
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
        ownerId: owner.id,
      },
    })
  }

  async updateProperty(id: string, args: UpdatePropertyArgs, ctx: Context) {
    const user = getUserFromContext(ctx)

    const owner = await this.getPropertyOwner(user.id)
    const property = await this.db.property.findFirst({
      where: { id, ownerId: owner.id },
    })
    if (!property) {
      throw new NotFoundException('Property not found')
    }

    await this.db.property.update({
      where: { id },
      data: args,
    })
  }

  async deleteProperty(id: string, ctx: Context) {
    const user = getUserFromContext(ctx)

    const owner = await this.getPropertyOwner(user.id)
    const property = await this.db.property.findFirst({
      where: { id, ownerId: owner.id },
    })
    if (!property) {
      throw new NotFoundException('Property not found')
    }

    await this.db.property.delete({
      where: { id },
    })
  }
}
