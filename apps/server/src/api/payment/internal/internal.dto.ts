import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export class CreatePaymentArgs extends createZodDto(
  z.object({
    bookingId: z.string(),
  }),
) {}
