import { Module } from '@nestjs/common'

import { PaymentInternalController } from './internal/internal.controller'
import { PaymentInternalService } from './internal/internal.service'

@Module({
  controllers: [PaymentInternalController],
  providers: [PaymentInternalService],
})
export class PaymentModule {}
