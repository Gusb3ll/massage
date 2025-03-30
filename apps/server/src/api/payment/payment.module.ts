import { Module } from '@nestjs/common'

import { PaymentInternalController } from './internal/internal.controller'
import { PaymentInternalService } from './internal/internal.service'
import { PaymentPublicController } from './public/public.controller'
import { PaymentPublicService } from './public/public.service'

@Module({
  controllers: [PaymentInternalController, PaymentPublicController],
  providers: [PaymentInternalService, PaymentPublicService],
})
export class PaymentModule {}
