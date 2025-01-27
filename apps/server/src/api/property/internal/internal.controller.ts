import { Context } from '@app/common'
import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CreatePropertyArgs, UpdatePropertyArgs } from './internal.dto'
import { PropertyInternalService } from './internal.service'

@ApiTags('Property - Internal')
@Controller('/property/internal')
export class PropertyInternalController {
  constructor(private readonly service: PropertyInternalService) { }

  @Post('/')
  async createProperty(@Body() args: CreatePropertyArgs, @Req() ctx: Context) {
    await this.service.createProperty(args, ctx)

    return { statusCode: HttpStatus.OK }
  }

  @Patch('/')
  async updateProperty(@Body() args: UpdatePropertyArgs) {
    await this.service.updateProperty(args)

    return { statusCode: HttpStatus.OK }
  }

  @Delete('/:id')
  async deleteProperty(@Param('id') id: string) {
    await this.service.deleteProperty(id)

    return { statusCode: HttpStatus.OK }
  }
}
