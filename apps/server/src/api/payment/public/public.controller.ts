import { Body, Controller, HttpStatus, Post } from '@nestjs/common'

import { StripeWebhook } from './public.dto'
import { PaymentPublicService } from './public.service'

@Controller('/payment/public')
export class PaymentPublicController {
  constructor(private readonly service: PaymentPublicService) {}

  @Post('/webhook')
  async handleWebhook(@Body() args: StripeWebhook) {
    await this.service.handleWebhook(args)

    return { statusCode: HttpStatus.OK }
  }
}
