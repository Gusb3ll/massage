import { Context } from '@app/common'
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common'

import { CreateBookingArgs, CreateChatArgs, GetBookingQueryParams } from './internal.dto'
import { BookingInternalService } from './internal.service'

@Controller('/booking/internal')
export class BookingInternalController {
  constructor(private readonly service: BookingInternalService) { }

  @Get('/list')
  async getBookings(@Query() args: GetBookingQueryParams, @Req() ctx: Context) {
    const res = await this.service.getBookings(args, ctx)

    return { statusCode: HttpStatus.OK, data: res }
  }

  @Get('/:id')
  async getBooking(@Param('id') id: string) {
    const res = await this.service.getBooking(id)

    return { statusCode: HttpStatus.OK, data: res }
  }

  @Get('/chat/:bookingId')
  async getChat(@Param('bookingId') bookingId: string) {
    const res = await this.service.getChat(bookingId)

    return { statusCode: HttpStatus.OK, data: res }
  }

  @Post('/chat')
  async createChat(@Body() args: CreateChatArgs) {
    const res = await this.service.createChat(args)

    return { statusCode: HttpStatus.OK, data: res }
  }

  // Massager
  @Get('/massager/list')
  async getMassagerBookings(@Req() ctx: Context) {
    const res = await this.service.getMassagerBookings(ctx)

    return { statusCode: HttpStatus.OK, data: res }
  }

  @Post('/confirm/:id')
  async confirmBooking(@Param('id') id: string) {
    await this.service.confirmBooking(id)

    return { statusCode: HttpStatus.OK }
  }

  @Post('/cancel/:id')
  async cancelBooking(@Param('id') id: string) {
    await this.service.cancelBooking(id)

    return { statusCode: HttpStatus.OK }
  }

  @Post('/')
  async createBooking(@Body() args: CreateBookingArgs, @Req() ctx: Context) {
    await this.service.createBooking(args, ctx)

    return { statusCode: HttpStatus.CREATED }
  }
}
