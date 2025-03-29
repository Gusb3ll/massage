import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common'

import { getPropertyQueryParams } from './public.dto'
import { PropertyPublicService } from './public.service'

@Controller('/property/public')
export class PropertyPublicController {
  constructor(private readonly service: PropertyPublicService) { }

  @Get('/:id')
  async getProperty(@Param('id') id: string) {
    const res = await this.service.getProperty(id)

    return { statusCode: HttpStatus.OK, data: res }
  }

  @Get('/list')
  async getProperties(@Query() args: getPropertyQueryParams) {
    const res = await this.service.getProperties(args)

    return { statusCode: HttpStatus.OK, data: res }
  }
}
