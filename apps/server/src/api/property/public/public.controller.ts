import { Controller, Get, Param } from '@nestjs/common'

import { PropertyPublicService } from './public.service'

@Controller('/property/public')
export class PropertyPublicController {
  constructor(private readonly service: PropertyPublicService) {}

  @Get('/:id')
  async getProperty(@Param('id') id: string) {
    const res = await this.service.getProperty(id)

    return res
  }
}

//TODO: Not finished yet
