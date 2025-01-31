import { Module } from '@nestjs/common'

import { PropertyInternalController } from './internal/internal.controller'
import { PropertyInternalService } from './internal/internal.service'
import { PropertyPublicController } from './public/public.controller'
import { PropertyPublicService } from './public/public.service'

@Module({
  controllers: [PropertyInternalController, PropertyPublicController],
  providers: [PropertyInternalService, PropertyPublicService],
})
export class PropertyModule {}
