import { Context, getUserFromContext } from '@app/common'
import { env } from '@app/config'
import { PrismaService } from '@app/db'
import { MultipartFile } from '@fastify/multipart'
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { init } from '@paralleldrive/cuid2'
import { MinioService } from 'nestjs-minio-client'
import sharp from 'sharp'

import { UpdateProfileArgs } from './internal.dto'

@Injectable()
export class MassagerInternalService {
  constructor(
    private readonly db: PrismaService,
    private readonly minioService: MinioService,
  ) {}

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

  async getStats(ctx: Context) {
    const massager = await this.getProfile(ctx)

    if (!massager) {
      throw new NotFoundException('Massager not found')
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
    })

    const dailyBookingCount: Record<string, number> = {}

    bookings.forEach(booking => {
      const date = booking.createdAt.toISOString().split('T')[0]
      dailyBookingCount[date] = (dailyBookingCount[date] || 0) + 1
    })

    const dailyStats = Object.entries(dailyBookingCount).map(
      ([date, count]) => ({
        date,
        totalIncome: count * 200,
        totalBookings: count,
      }),
    )

    const totalIncomeAllDays = dailyStats.reduce(
      (sum, day) => sum + day.totalIncome,
      0,
    )
    const totalBookingsAllDays = dailyStats.reduce(
      (sum, day) => sum + day.totalBookings,
      0,
    )

    return dailyStats.map(day => ({
      ...day,
      totalIncomeAllDays,
      totalBookingsAllDays,
    }))
  }

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

  private async deleteOldImage(imageUrl: string) {
    try {
      const isOldImage = imageUrl.includes(env.MINIO_ENDPOINT)
      if (isOldImage) {
        const path = imageUrl.split(
          `${env.MINIO_ENDPOINT}/${env.MINIO_BUCKET}/`,
        )[1]

        await this.minioService.client.removeObject(env.MINIO_BUCKET, path)
      }
    } catch {
      //
    }
  }

  async uploadAvatar(ctx: Context, file?: MultipartFile) {
    const user = getUserFromContext(ctx)
    if (!file || file.file.bytesRead === 0) {
      throw new NotFoundException('ไม่พบไฟล์นี้')
    }

    try {
      await this.deleteOldImage(user.profileImage)
      const path = `${user.id}/avatar_${init({ length: 6 })()}.webp`

      const buffer = await file.toBuffer()
      const webpBuffer = await sharp(buffer, { pages: -1 })
        .withMetadata()
        .toFormat('webp')
        .webp({ quality: 80 })
        .toBuffer()

      await this.minioService.client.putObject(
        env.MINIO_BUCKET,
        path,
        webpBuffer,
        { 'Content-Type': 'image/webp' },
      )
      await this.db.user.update({
        where: { id: user.id },
        data: {
          profileImage: `https://${env.MINIO_ENDPOINT}/${env.MINIO_BUCKET}/${path}`,
        },
      })
    } catch {
      throw new InternalServerErrorException(
        'ไม่สามารถอัพโหลดไฟล์นี้ได้ โปรดลองใหม่อีกครั้ง',
      )
    }
  }

  async uploadFile(ctx: Context, file?: MultipartFile) {
    const user = getUserFromContext(ctx)
    if (!file || file.file.bytesRead === 0) {
      throw new NotFoundException('ไม่พบไฟล์นี้')
    }

    try {
      const path = `${user.id}/file/${init({ length: 12 })()}.webp`

      const buffer = await file.toBuffer()
      const webpBuffer = await sharp(buffer, { pages: -1 })
        .withMetadata()
        .toFormat('webp')
        .webp({ quality: 80 })
        .toBuffer()

      await this.minioService.client.putObject(
        env.MINIO_BUCKET,
        path,
        webpBuffer,
        { 'Content-Type': 'image/webp' },
      )

      return {
        url: `https://${env.MINIO_ENDPOINT}/${env.MINIO_BUCKET}/${path}`,
      }
    } catch {
      throw new InternalServerErrorException(
        'ไม่สามารถอัพโหลดไฟล์นี้ได้ โปรดลองใหม่อีกครั้ง',
      )
    }
  }
}
