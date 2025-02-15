import { Module } from '@nestjs/common'

import { MassagerInternalController } from './internal/internal.controller'
import { MassagerInternalService } from './internal/internal.service'

@Module({
  controllers: [MassagerInternalController],
  providers: [MassagerInternalService],
})
export class MassagerModule {}
