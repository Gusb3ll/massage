import { Controller } from '@nestjs/common'

import { ReviewPublicService } from './public.service'

@Controller('/review/public')
export class ReviewPublicController {
  constructor(private readonly service: ReviewPublicService) {}
}
