import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export class ReviewArgs extends createZodDto(
  z.object({
    id: z.string(),
    rating: z.number().min(0).max(5),
    description: z.string(),
  }),
) {}
