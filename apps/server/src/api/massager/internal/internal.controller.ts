import { Context } from '@app/common'
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  Req,
} from '@nestjs/common'

import { UpdateProfileArgs } from './internal.dto'
import { MassagerInternalService } from './internal.service'

@Controller('/massager/internal')
export class MassagerInternalController {
  constructor(private readonly service: MassagerInternalService) {}

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

  @Post('/avatar')
  async uploadAvatar(@Req() ctx: Context) {
    const file = await ctx.file()
    await this.service.uploadAvatar(ctx, file)

    return { statusCode: HttpStatus.OK }
  }
}
