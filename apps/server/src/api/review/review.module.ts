import { Module } from '@nestjs/common'

import { ReviewInternalController } from './internal/internal.controller'
import { ReviewInternalService } from './internal/internal.service'
import { ReviewPublicController } from './public/public.controller'
import { ReviewPublicService } from './public/public.service'

@Module({
  controllers: [ReviewInternalController, ReviewPublicController],
  providers: [ReviewInternalService, ReviewPublicService],
})
export class ReviewModule {}
