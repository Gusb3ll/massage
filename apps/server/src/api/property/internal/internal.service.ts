import { Injectable } from '@nestjs/common'
import { PrismaService } from '@app/db'
import { CreatePropertyArgs, UpdatePropertyArgs } from './internal.dto'
import { Context, getUserFromContext } from '@app/common'

@Injectable()
export class PropertyInternalService {
  constructor(private readonly db: PrismaService) {}

  async createProperty(args: CreatePropertyArgs, ctx: Context) {
    try {
      const user = getUserFromContext(ctx)
      if (!user) {
        throw new Error('User not found')
      }

      const property = await this.db.property.create({
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

      return property
    } catch (e) {
      throw new Error(`Failed to create property:` + e)
    }
  }

  async updateProperty(args: UpdatePropertyArgs, ctx: Context) {
    try {
      const user = getUserFromContext(ctx)

      if (!user) {
        throw new Error('User not found')
      }

      const updatedProperty = await this.db.property.update({
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

      return updatedProperty
    } catch (e) {
      throw new Error(`Failed to update property:` + e)
    }
  }
}
