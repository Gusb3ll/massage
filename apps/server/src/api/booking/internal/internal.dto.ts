import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export class CreateChatArgs extends createZodDto(
  z.object({
    bookingId: z.string(),
    message: z.string(),
    actor: z.enum(['USER', 'MASSAGER']),
  }),
) {}
