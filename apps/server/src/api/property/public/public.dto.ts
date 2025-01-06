import { createZodDto, patchNestJsSwagger } from 'nestjs-zod'
import { z } from 'zod'

export class UpdateOwnerArgs extends createZodDto(
  z.object({
    coverImage: z.string(),
    profileImage: z.string(),
  }),
) { }

patchNestJsSwagger()

//TODO: Not finished yet
