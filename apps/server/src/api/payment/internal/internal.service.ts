import { Context, getUserFromContext } from '@app/common'
import { PrismaService } from '@app/db'
import { Injectable, NotFoundException } from '@nestjs/common'
import { init } from '@paralleldrive/cuid2'
import Stripe from 'stripe'

import { CreatePaymentArgs } from './internal.dto'

@Injectable()
export class PaymentInternalService {
  constructor(private readonly db: PrismaService) {}

  async createPayment(args: CreatePaymentArgs, ctx: Context) {
    const user = getUserFromContext(ctx)
    const { bookingId } = args

    const booking = await this.db.booking.findFirst({
      where: { id: bookingId, userId: user.id },
      include: { paymentTransaction: true, property: true },
    })
    if (!booking) {
      throw new NotFoundException('Booking not found')
    }

    const transaction = booking.paymentTransaction
    if (
      transaction?.status === 'COMPLETED' ||
      transaction?.status === 'CANCELED'
    ) {
      throw new NotFoundException('Transaction already completed or canceled')
    }

    if (transaction) {
      return { paymentLink: transaction.paymentLink }
    }

    const baseAmount = 20
    const massagerAmount = 200
    const totalAmount = booking.property.price + baseAmount + massagerAmount

    const stripe = new Stripe(
      'sk_test_51R8Rlz4UZUhNYib3QI89mqn6o6MHxyrqL8l0lItGEdGMBSef3QYeuAtiVQdNxFH16G5armm1bEKrZFQ1oQ6oJk2t00qvKM7dDS',
      { apiVersion: '2025-02-24.acacia' },
    )

    const referenceNo = `MAS-${init({ length: 6 })().toUpperCase()}`
    const session = await stripe.checkout.sessions.create({
      line_items: [
        { price: 'price_1R8RxF4UZUhNYib3WDngqM2L', quantity: totalAmount },
      ],
      mode: 'payment',
      currency: 'THB',
      success_url: 'https://massage.lico.moe/success',
      cancel_url: 'https://massage.lico.moe/cancel',
      client_reference_id: referenceNo,
    })

    await this.db.bookingPaymentTransaction.create({
      data: {
        bookingId: booking.id,
        status: 'PENDING',
        extId: session.id,
        paymentLink: session.url!,
        method: 'STRIPE',
        amount: totalAmount,
        referenceNo,
      },
    })

    return { paymentLink: session.url }
  }
}
