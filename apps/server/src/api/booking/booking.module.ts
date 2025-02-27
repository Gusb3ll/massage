import { Module } from '@nestjs/common'

import { BookingInternalController } from './internal/internal.controller'
import { BookingInternalService } from './internal/internal.service'

@Module({
  controllers: [BookingInternalController],
  providers: [BookingInternalService],
})
export class BookingModule {}
