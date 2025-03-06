import { Context } from '@app/common'
import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common'

import { ReviewArgs } from './internal.dto'
import { ReviewInternalService } from './internal.service'

@Controller('/review/internal')
export class ReviewInternalController {
  constructor(private readonly service: ReviewInternalService) {}

  @Post('/massager')
  async reviewMassager(@Body() args: ReviewArgs, @Req() ctx: Context) {
    await this.service.reviewMassager(args, ctx)

    return { statusCode: HttpStatus.CREATED }
  }

  @Post('/property')
  async reviewProperty(@Body() args: ReviewArgs, @Req() ctx: Context) {
    await this.service.reviewProperty(args, ctx)

    return { statusCode: HttpStatus.CREATED }
  }
}
