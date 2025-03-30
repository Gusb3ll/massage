import { PrismaService } from '@app/db'
import { BadRequestException, Injectable } from '@nestjs/common'

import { StripeWebhook } from './public.dto'

@Injectable()
export class PaymentPublicService {
  constructor(private readonly db: PrismaService) {}

  async handleWebhook(args: StripeWebhook) {
    const { type, data } = args

    if (!type || !data) {
      throw new BadRequestException()
    }

    const { object } = data

    const transaction = await this.db.bookingPaymentTransaction.findFirst({
      where: { extId: object.id },
    })
    if (!transaction) {
      throw new BadRequestException()
    }
    if (transaction.status === 'COMPLETED') {
      throw new BadRequestException()
    }

    if (
      type !== 'checkout.session.completed' ||
      object.payment_status !== 'paid'
    ) {
      return
    }

    await this.db.bookingPaymentTransaction.update({
      where: { id: transaction.id },
      data: { status: 'COMPLETED' },
    })
    await this.db.booking.update({
      where: { id: transaction.bookingId },
      data: { status: 'CONFIRMED' },
    })
  }
}
