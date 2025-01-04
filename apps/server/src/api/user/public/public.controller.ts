import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { LoginArgs, RegisterArgs, VerifyEmailArgs } from './public.dto'
import { UserPublicService } from './public.service'

@ApiTags('User - Public')
@Controller('/user/public')
export class UserPublicController {
  constructor(private readonly service: UserPublicService) {}

  @Post('/register')
  async register(@Body() args: RegisterArgs) {
    await this.service.register(args)

    return { statusCode: HttpStatus.CREATED }
  }

  @Post('/login')
  async login(@Body() args: LoginArgs) {
    const res = await this.service.login(args)

    return { statusCode: HttpStatus.OK, data: res }
  }

  @Post('/verify')
  async verifyEmail(@Body() args: VerifyEmailArgs) {
    await this.service.verifyEmail(args)

    return { statusCode: HttpStatus.OK }
  }

  // TODO: Forgot password and reset password

  @Post('/forgot-password')
  async forgotPassword() {}

  @Post('/reset-password')
  async resetPassword() {}
}
