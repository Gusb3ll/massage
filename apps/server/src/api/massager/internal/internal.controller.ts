import { Context } from '@app/common'
import { Body, Controller, Get, HttpStatus, Patch, Req } from '@nestjs/common'

import { UpdateProfileArgs } from './internal.dto'
import { MassagerInternalService } from './internal.service'

@Controller('/massage/internal')
export class MassagerInternalController {
  constructor(private readonly service: MassagerInternalService) {}

  @Get('/')
  async getProfile(@Req() ctx: Context) {
    const res = await this.service.getProfile(ctx)

    return { statusCode: HttpStatus.OK, data: res }
  }

  @Patch('/')
  async updateProfile(@Body() args: UpdateProfileArgs, @Req() ctx: Context) {
    await this.service.updateProfile(args, ctx)

    return { statusCode: HttpStatus.OK }
  }

  @Get('/dashboard/reviews')
  async getDashboardReviews(@Req() ctx: Context) {
    const res = await this.service.getDashboardReviews(ctx)

    return { statusCode: HttpStatus.OK, data: res }
  }

  @Get('/dashboard/stats')
  async getStats(@Req() ctx: Context) {
    const res = await this.service.getStats(ctx)

    return { statusCode: HttpStatus.OK, data: res }
  }

  @Get('/dashboard/bookings')
  async getDashboardBookings(@Req() ctx: Context) {
    const res = await this.service.getDashboardBookings(ctx)

    return { statusCode: HttpStatus.OK, data: res }
  }

  @Get('/bookings')
  async getBookings(@Req() ctx: Context) {
    const res = await this.service.getBookings(ctx)

    return { statusCode: HttpStatus.OK, data: res }
  }
}
