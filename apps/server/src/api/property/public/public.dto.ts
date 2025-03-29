import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export class getPropertyQueryParams extends createZodDto(
    z.object({
        search: z.string().optional(),
    }),
) { }