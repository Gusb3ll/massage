import { Context } from '@app/common'
import {
  Body,
  Controller,
  Delete,
  Get,
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

  @Patch('/:id')
  async updateProperty(
    @Param('id') id: string,
    @Body() args: UpdatePropertyArgs,
    @Req() ctx: Context,
  ) {
    await this.service.updateProperty(id, args, ctx)

    return { statusCode: HttpStatus.OK }
  }

  @Delete('/:id')
  async deleteProperty(@Param('id') id: string, @Req() ctx: Context) {
    await this.service.deleteProperty(id, ctx)

    return { statusCode: HttpStatus.OK }
  }

  @Get('/dashboard/stats')
  async getPropertyStats(@Req() ctx: Context) {
    const res = await this.service.getPropertyStats(ctx)

    return { statusCode: HttpStatus.OK, data: res }
  }

  @Post('/avatar')
  async uploadAvatar(@Req() ctx: Context) {
    const file = await ctx.file()
    await this.service.uploadAvatar(ctx, file)

    return { statusCode: HttpStatus.OK }
  }

  @Post('/file')
  async uploadFile(@Req() ctx: Context) {
    const file = await ctx.file()
    const res = await this.service.uploadFile(ctx, file)

    return { statusCode: HttpStatus.OK, data: res }
  }
}
