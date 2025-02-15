import { Module } from '@nestjs/common'

import { MassagerInternalController } from './internal/internal.controller'
import { MassagerInternalService } from './internal/internal.service'
import { MassagerPublicController } from './public/public.controller'
import { MassagerPublicService } from './public/public.service'

@Module({
  controllers: [MassagerPublicController, MassagerInternalController],
  providers: [MassagerPublicService, MassagerInternalService],
})
export class MassagerModule {}
