import { Controller, Get, HttpStatus, Query } from '@nestjs/common'

import { ReviewPublicService } from './public.service'

@Controller('/review/public')
export class ReviewPublicController {
  constructor(private readonly service: ReviewPublicService) {}

  @Get('/massager')
  async getMassagerReviews(@Query('id') id: string) {
    const res = await this.service.getMassagerReviews(id)

    return { statusCode: HttpStatus.OK, data: res }
  }

  @Get('/property')
  async getPropertyReviews(@Query('id') id: string) {
    const res = await this.service.getPropertyReviews(id)

    return { statusCode: HttpStatus.OK, data: res }
  }
}
