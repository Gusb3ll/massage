import { Context, getUserFromContext } from '@app/common'
import { PrismaService } from '@app/db'
import { Injectable, NotFoundException } from '@nestjs/common'

import { CreateChatArgs } from './internal.dto'

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
      include: { massager: true, property: true },
      orderBy: { createdAt: 'desc' },
    })

    return bookings
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
}
