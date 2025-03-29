import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common'

import { getMassagerQueryParams } from './public.dto'
import { MassagerPublicService } from './public.service'

@Controller('/massager/public')
export class MassagerPublicController {
  constructor(private readonly service: MassagerPublicService) {}

  @Get('/list')
  async getMassagers(@Query() args: getMassagerQueryParams) {
    const res = await this.service.getMassagers(args)

    return { statusCode: HttpStatus.OK, data: res }
  }

  @Get('/:id')
  async getMassager(@Param('id') id: string) {
    const res = await this.service.getMassager(id)

    return { statusCode: HttpStatus.OK, data: res }
  }
}
