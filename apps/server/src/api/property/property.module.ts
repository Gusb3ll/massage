import { Module } from '@nestjs/common'

import { PropertyInternalController } from './internal/internal.controller'
import { PropertyInternalService } from './internal/internal.service'

@Module({
  controllers: [PropertyInternalController],
  providers: [PropertyInternalService],
})
export class PropertyModule {}
