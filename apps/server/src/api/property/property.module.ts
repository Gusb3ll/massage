import { Module } from '@nestjs/common'
import { PropertyInternalController } from './internal/internal.controller'
import { PropertyInternalService } from './internal/internal.service'
import { PropertyPublicController } from './public/public.controller'
import { PropertyPublicService } from './public/public.service'

@Module({
  controllers: [PropertyPublicController, PropertyInternalController],
  providers: [PropertyPublicService, PropertyInternalService],
})
export class PropertyModule {}
