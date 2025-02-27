import { createZodDto, patchNestJsSwagger } from 'nestjs-zod'
import { z } from 'zod'

export class UpdateUserArgs extends createZodDto(
  z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phoneNumber: z.string().optional(),
    dateOfBirth: z.string().optional(),
    gender: z.enum(['MALE', 'FEMALE']).optional(),
  }),
) {}

export class UpdatePasswordArgs extends createZodDto(
  z.object({
    oldPassword: z.string(),
    newPassword: z.string(),
  }),
) {}

patchNestJsSwagger()
