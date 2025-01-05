import { Controller, Post , HttpStatus, Body, Patch , Req} from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger'
import { CreatePropertyArgs, UpdatePropertyArgs } from "./internal.dto";
import { PropertyInternalService } from "./internal.service";
import { Context, getUserFromContext } from '@app/common'
@ApiTags('Property - Internal')
@Controller("/property/internal")
export class PropertyInternalController {
    constructor(private readonly service: PropertyInternalService) {}
    
    @Post("/create")
    async createProperty(@Body() args: CreatePropertyArgs , @Req() ctx: Context) {
        const user = getUserFromContext(ctx);
        if (!user) {
            throw new Error('User not found');
        }

        const property = await this.service.createProperty(args , ctx);

        return { statusCode: HttpStatus.OK, data: property };
    }

    @Patch("/update")
    async updateProperty(@Body() args: UpdatePropertyArgs , @Req() ctx: Context) {
        const user = getUserFromContext(ctx);
        if (!user) {
            throw new Error('User not found');
        }

        const property = await this.service.updateProperty(args , ctx);

        return { statusCode: HttpStatus.OK, data: property };
    }
    
}
