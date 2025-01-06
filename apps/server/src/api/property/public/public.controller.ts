import { Controller, Get, HttpStatus, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { PropertyPublicService } from './public.service'


@ApiTags('Property - Public')
@Controller('/property/public')
export class PropertyPublicController {
    constructor(private readonly service: PropertyPublicService) { }

    @Get('/:id')
    async getProperty(@Param('id') id: string) {
        const res = await this.service.getProperty(id)

        return { statusCode: HttpStatus.OK, data: res }
    }
}