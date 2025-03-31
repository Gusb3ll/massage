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

import {
  CreateBookingArgs,
  CreateChatArgs,
  GetBookingQueryParams,
  GetMassagerBookingQueryParams,
} from './internal.dto'
import { BookingInternalService } from './internal.service'

@Controller('/booking/internal')
export class BookingInternalController {
  constructor(private readonly service: BookingInternalService) {}

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

  @Get('/chat/:id')
  async getChat(@Param('id') id: string) {
    const res = await this.service.getChat(id)

    return { statusCode: HttpStatus.OK, data: res }
  }

  @Post('/chat/:id')
  async createChat(@Param('id') id: string, @Body() args: CreateChatArgs) {
    const res = await this.service.createChat(id, args)

    return { statusCode: HttpStatus.OK, data: res }
  }

  // Massager
  @Get('/massager/list')
  async getMassagerBookings(
    @Query() args: GetMassagerBookingQueryParams,
    @Req() ctx: Context,
  ) {
    const res = await this.service.getMassagerBookings(args, ctx)

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
