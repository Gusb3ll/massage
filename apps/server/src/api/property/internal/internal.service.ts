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

  async getPropertyStats(ctx: Context) {
    const user = getUserFromContext(ctx)

    const owner = await this.getPropertyOwner(user.id)
    const properties = await this.db.property.findMany({
      where: { ownerId: owner.id },
      include: {
        bookings: {
          select: {
            bookingDate: true,
          },
        },
        _count: {
          select: {
            bookings: true,
          },
        },
      },
    })

    const dailyStats: Record<
      string,
      { totalIncome: number; totalBookings: number }
    > = {}

    properties.forEach(property => {
      property.bookings.forEach(booking => {
        const startDate = new Date(booking.bookingDate)
        const endDate = new Date(startDate)
        endDate.setDate(endDate.getDate() + 1)

        const totalIncome = property.price
        const date = startDate.toISOString().split('T')[0]

        if (!dailyStats[date]) {
          dailyStats[date] = { totalIncome: 0, totalBookings: 0 }
        }
        dailyStats[date].totalIncome += totalIncome
        dailyStats[date].totalBookings += 1
      })
    })

    const totalIncomeAllDays = Object.values(dailyStats).reduce(
      (sum, day) => sum + day.totalIncome,
      0,
    )
    const totalBookingsAllDays = Object.values(dailyStats).reduce(
      (sum, day) => sum + day.totalBookings,
      0,
    )

    return Object.entries(dailyStats).map(([date, stats]) => ({
      date,
      totalIncome: stats.totalIncome,
      totalBookings: stats.totalBookings,
      totalIncomeAllDays,
      totalBookingsAllDays,
    }))
  }
}
