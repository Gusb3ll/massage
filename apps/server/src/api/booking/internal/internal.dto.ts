import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export class CreateChatArgs extends createZodDto(
  z.object({
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

export class GetBookingQueryParams extends createZodDto(
  z.object({
    search: z.string().optional(),
  }),
) {}

export class GetMassagerBookingQueryParams extends createZodDto(
  z.object({
    search: z.string().optional(),
  }),
) {}
