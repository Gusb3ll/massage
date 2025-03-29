import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export class CreateChatArgs extends createZodDto(
  z.object({
    bookingId: z.string(),
    message: z.string(),
    actor: z.enum(['USER', 'MASSAGER']),
  }),
) {}

export class CreateBookingArgs extends createZodDto(
  z.object({
    massagerId: z.string(),
    propertyId: z.string(),
    bookingDate: z.string().datetime(),
  }),
) {}
