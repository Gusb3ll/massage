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

    return bookings.map(booking => {
      const property = booking.property
      const massager = booking.massager

      return {
        ...booking,
        massager: {
          id: massager.id,
          firstName: massager.user.firstName,
          lastName: massager.user.lastName,
          profileImage: massager.user.profileImage,
          gender: massager.user.gender,
          dateOfBirth: massager.user.dateOfBirth,
        },
        property: {
          id: property.id,
          name: property.name,
          images: property.images,
          price: property.price,
          address: property.address,
          rooms: property.rooms,
          roomWidth: property.roomWidth,
          roomHeight: property.roomHeight,
          owner: {
            id: property.owner.id,
            firstName: property.owner.user.firstName,
            lastName: property.owner.user.lastName,
            profileImage: property.owner.user.profileImage,
          },
        },
      }
    })
  }

  async getMassagerBookings(ctx: Context) {
    const massager = await this.getMassager(ctx)

    const bookings = await this.db.booking.findMany({
      where: { massagerId: massager.id },
      include: {
        user: true,
        massager: { include: { user: true } },
        property: { include: { owner: { include: { user: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    })

    return bookings.map(booking => {
      const property = booking.property
      const massager = booking.massager

      return {
        ...booking,
        user: {
          id: booking.user.id,
          firstName: booking.user.firstName,
          lastName: booking.user.lastName,
          profileImage: booking.user.profileImage,
        },
        massager: {
          id: massager.id,
          firstName: massager.user.firstName,
          lastName: massager.user.lastName,
          profileImage: massager.user.profileImage,
          gender: massager.user.gender,
          dateOfBirth: massager.user.dateOfBirth,
        },
        property: {
          id: property.id,
          name: property.name,
          images: property.images,
          price: property.price,
          address: property.address,
          rooms: property.rooms,
          roomWidth: property.roomWidth,
          roomHeight: property.roomHeight,
          owner: {
            id: property.owner.id,
            firstName: property.owner.user.firstName,
            lastName: property.owner.user.lastName,
            profileImage: property.owner.user.profileImage,
          },
        },
      }
    })
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
