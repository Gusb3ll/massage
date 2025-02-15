import { createZodDto, patchNestJsSwagger } from 'nestjs-zod'
import { z } from 'zod'

export class RegisterArgs extends createZodDto(
  z.object({
    email: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.string(),
    gender: z.enum(['MALE', 'FEMALE']),
    dateOfBirth: z.string(),
    role: z.enum(['USER', 'MASSAGER', 'PROPERTY_OWNER']),
  }),
) {}

export class LoginArgs extends createZodDto(
  z.object({
    email: z.string().email(),
    password: z.string(),
  }),
) {}

export class VerifyEmailArgs extends createZodDto(
  z.object({
    token: z.string(),
  }),
) {}

patchNestJsSwagger()
