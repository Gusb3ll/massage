import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export class UpdateProfileArgs extends createZodDto(
  z.object({
    coverImage: z.string().optional(),
    massageImages: z.array(z.string()).optional(),
    certificates: z.array(z.string()).optional(),
    vaccineCertificates: z.array(z.string()).optional(),
    status: z.enum(['AVAILABLE', 'OCCUPIED', 'UNAVAILABLE']).optional(),
    languages: z.array(z.string()).optional(),
    skills: z.array(z.string()).optional(),
  }),
) { }
