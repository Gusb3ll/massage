import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export class getMassagerQueryParams extends createZodDto(
  z.object({
    search: z.string().optional(),
  }),
) {}
