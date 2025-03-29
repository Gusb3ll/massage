import { Context, getUserFromContext } from '@app/common'
import { PrismaService } from '@app/db'
import { Injectable, NotFoundException } from '@nestjs/common'

import { CreateBookingArgs, CreateChatArgs } from './internal.dto'

@Injectable()
export class BookingInternalService {
  constructor(private readonly db: PrismaService) {}

  private async getMassager(ctx: Context) {
    const user = getUserFromContext(ctx)

    const massager = await this.db.massager.findUnique({
      where: { userId: user.id },
    })
    if (!massager) {
      throw new NotFoundException('Massager not found')
    }

    return massager
  }

  async getBookings(ctx: Context) {
    const user = getUserFromContext(ctx)

    const bookings = await this.db.booking.findMany({
      where: { userId: user.id },
      include: {
        massager: { include: { user: true } },
        property: { include: { owner: { include: { user: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    })

    return bookings.map(booking => ({
      ...booking,
      massager: booking.massager
        ? {
            id: booking.massager.id,
            firstName: booking.massager.user.firstName,
            lastName: booking.massager.user.lastName,
            profileImage: booking.massager.user.profileImage,
            gender: booking.massager.user.gender,
            dateOfBirth: booking.massager.user.dateOfBirth,
          }
        : null,
      property: booking.property?.owner
        ? {
            id: booking.property.owner.id,
            firstName: booking.property.owner.user.firstName,
            lastName: booking.property.owner.user.lastName,
            profileImage: booking.property.owner.user.profileImage,
            name: booking.property.name,
            price: booking.property.price,
            address: booking.property.address,
            images: booking.property.images,
            rooms: booking.property.rooms,
            roomWidth: booking.property.roomWidth,
            roomHeight: booking.property.roomHeight,
          }
        : null,
    }))
  }

  async getMassagerBookings(ctx: Context) {
    const massager = await this.getMassager(ctx)

    const bookings = await this.db.booking.findMany({
      where: { massagerId: massager.id },
      include: { user: true, property: true },
      orderBy: { createdAt: 'desc' },
    })

    return bookings
  }

  async getBooking(id: string) {
    const booking = await this.db.booking.findUnique({
      where: { id },
      include: { massager: true, property: true },
    })
    if (!booking) {
      throw new NotFoundException('Booking not found')
    }

    return booking
  }

  async getChat(bookingId: string) {
    const chats = await this.db.bookingChat.findMany({
      where: { bookingId },
      orderBy: { createdAt: 'asc' },
    })

    return chats
  }

  async createChat(args: CreateChatArgs) {
    const { bookingId, message, actor } = args

    const booking = await this.db.booking.findUnique({
      where: { id: bookingId },
    })
    if (!booking) {
      throw new NotFoundException('Booking not found')
    }

    await this.db.bookingChat.create({
      data: { bookingId, message, actor },
    })
  }

  async confirmBooking(id: string) {
    await this.db.booking.update({
      where: { id },
      data: { status: 'PENDING_PAYMENT' },
    })
  }

  async cancelBooking(id: string) {
    await this.db.booking.update({
      where: { id },
      data: { status: 'CANCELED' },
    })
  }

  async createBooking(args: CreateBookingArgs, ctx: Context) {
    const user = getUserFromContext(ctx)
    const { massagerId, propertyId, bookingDate } = args

    const massager = await this.db.massager.findUnique({
      where: { id: massagerId },
    })
    if (!massager) {
      throw new NotFoundException('Massager not found')
    }

    const property = await this.db.property.findUnique({
      where: { id: propertyId },
    })
    if (!property) {
      throw new NotFoundException('Property not found')
    }
    // if (massager.status === 'UNAVAILABLE' || massager.status === 'OCCUPIED') {
    //   throw new NotFoundException('Massager is unavailable')
    // }

    await this.db.booking.create({
      data: {
        userId: user.id,
        massagerId,
        propertyId,
        bookingDate,
        status: 'PENDING_MASSAGER',
      },
    })
  }
}
