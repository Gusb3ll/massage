import { PrismaService } from '@app/db'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ReviewPublicService {
  constructor(private readonly db: PrismaService) {}
}
