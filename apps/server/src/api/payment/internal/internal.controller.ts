import { Context } from '@app/common'
import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common'

import { CreatePaymentArgs } from './internal.dto'
import { PaymentInternalService } from './internal.service'

@Controller('/payment/internal')
export class PaymentInternalController {
  constructor(private readonly service: PaymentInternalService) { }

  @Post('/')
  async createPayment(@Body() args: CreatePaymentArgs, @Req() ctx: Context) {
    const res = await this.service.createPayment(args, ctx)

    return { statusCode: HttpStatus.CREATED, data: res }
  }
}
