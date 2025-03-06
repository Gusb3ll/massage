import { Controller, Get, HttpStatus, Param } from '@nestjs/common'

import { MassagerPublicService } from './public.service'

@Controller('/massager/public')
export class MassagerPublicController {
  constructor(private readonly service: MassagerPublicService) {}

  @Get('/list')
  async getMassagers() {
    const res = await this.service.getMassagers()

    return { statusCode: HttpStatus.OK, data: res }
  }

  @Get('/:id')
  async getMassager(@Param('id') id: string) {
    const res = await this.service.getMassager(id)

    return { statusCode: HttpStatus.OK, data: res }
  }
}
