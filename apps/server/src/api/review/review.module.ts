import { Module } from '@nestjs/common'

import { ReviewInternalController } from './internal/internal.controller'
import { ReviewInternalService } from './internal/internal.service'

@Module({
  controllers: [ReviewInternalController],
  providers: [ReviewInternalService],
})
export class ReviewModule {}
