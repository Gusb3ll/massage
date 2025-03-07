import { PrismaService } from '@app/db'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MassagerPublicService {
  constructor(private readonly db: PrismaService) { }
}
