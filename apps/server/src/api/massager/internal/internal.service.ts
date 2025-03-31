import { Context, getUserFromContext } from '@app/common'
import { PrismaService } from '@app/db'
import { Injectable, NotFoundException } from '@nestjs/common'

import { UpdateProfileArgs } from './internal.dto'

@Injectable()
export class MassagerInternalService {
  constructor(private readonly db: PrismaService) { }

  async getProfile(ctx: Context) {
    const user = getUserFromContext(ctx)

    const massager = await this.db.massager.findUnique({
      where: { userId: user.id },
    })
    if (!massager) {
      throw new NotFoundException('Profile not found')
    }

    return massager
  }

  async updateProfile(args: UpdateProfileArgs, ctx: Context) {
    const massager = await this.getProfile(ctx)

    await this.db.massager.update({
      where: { id: massager.id },
      data: args,
    })
  }

  async getDashboardReviews(ctx: Context) {
    const massager = await this.getProfile(ctx)

    const reviews = await this.db.massagerReview.findMany({
      where: { massagerId: massager.id },
      take: 3,
      orderBy: { createdAt: 'desc' },
    })

    return reviews
  }

  // CTA

  async getStats(ctx: Context) {
    const massager = await this.getProfile(ctx);

    if (!massager) {
      throw new NotFoundException('Massager not found');
    }

    const bookings = await this.db.booking.findMany({
      where: {
        massagerId: massager.id,
        status: { in: ['CONFIRMED', 'COMPLETED'] },
      },
      select: {
        id: true,
        createdAt: true,
      },
    });

    const dailyBookingCount: Record<string, number> = {};

    bookings.forEach(booking => {
      const date = booking.createdAt.toISOString().split('T')[0];
      dailyBookingCount[date] = (dailyBookingCount[date] || 0) + 1;
    });

    const dailyStats = Object.entries(dailyBookingCount).map(([date, count]) => ({
      date,
      totalIncome: count * 200,
      totalBookings: count,
    }));

    const totalIncomeAllDays = dailyStats.reduce((sum, day) => sum + day.totalIncome, 0);
    const totalBookingsAllDays = dailyStats.reduce((sum, day) => sum + day.totalBookings, 0);

    return dailyStats.map(day => ({ ...day, totalIncomeAllDays, totalBookingsAllDays }));
  }



  // async getStats(ctx: Context) {
  //   const massager = await this.getProfile(ctx)

  //   const bookings = await this.db.booking.findMany({
  //     where: { massagerId: massager.id, status: 'COMPLETED' },
  //     select: {
  //       rating: true,
  //       paymentTransaction: { select: { amount: true } },
  //     },
  //   })

  //   const income = bookings.reduce(
  //     (acc, booking) => acc + (booking.paymentTransaction?.amount ?? 0),
  //     0,
  //   )
  //   const count = bookings.length
  //   const rating = (
  //     bookings.reduce((acc, booking) => acc + (booking.rating ?? 0), 0) / count
  //   ).toFixed(1)

  //   return {
  //     income,
  //     count,
  //     rating,
  //   }
  // }

  // Charts
  // async getChartStats(ctx: Context) { }

  async getDashboardBookings(ctx: Context) {
    const massager = await this.getProfile(ctx)

    const bookings = await this.db.booking.findMany({
      where: {
        massagerId: massager.id,
        status: 'COMPLETED',
      },
      orderBy: { createdAt: 'desc' },
    })

    return bookings
  }

  async getBookings(ctx: Context) {
    const massager = await this.getProfile(ctx)

    const bookings = await this.db.booking.findMany({
      where: { massagerId: massager.id },
      orderBy: { createdAt: 'desc' },
    })

    return bookings
  }
}
