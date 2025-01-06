import { createZodDto, patchNestJsSwagger } from 'nestjs-zod'
import { z } from 'zod'

export class CreatePropertyArgs extends createZodDto(
  z.object({
    name: z.string(),
    description: z.string(),
    address: z.string(),
    images: z.array(z.string()),
    price: z.number(),
    rooms: z.number(),
    roomWidth: z.number(),
    roomHeight: z.number(),
    ownerId: z.string(),
  }),
) { }

export class UpdatePropertyArgs extends createZodDto(
  z.object({
    id: z.string(),
    name: z.string().optional(),
    description: z.string().optional(),
    address: z.string().optional(),
    images: z.array(z.string()).optional(),
    price: z.number().optional(),
    rooms: z.number().optional(),
    roomWidth: z.number().optional(),
    roomHeight: z.number().optional(),
  }),
) { }

patchNestJsSwagger()
