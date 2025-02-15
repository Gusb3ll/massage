import { Controller } from '@nestjs/common'

import { MassagerPublicService } from './public.service'

@Controller('/massager/public')
export class MassagerPublicController {
  constructor(private readonly service: MassagerPublicService) {}
}
