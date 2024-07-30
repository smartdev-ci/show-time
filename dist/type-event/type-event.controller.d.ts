import { TypeEventService } from './type-event.service';
import { Response } from 'express';
import { CreateTypeEventDto } from './dto/create-type-event.dto';
import { UpdateTypeEventDto } from './dto/update-type-event.dto';
export declare class TypeEventController {
    private readonly typeEventService;
    constructor(typeEventService: TypeEventService);
    create(createTypeEventDto: CreateTypeEventDto, res: Response): Promise<void>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../schemas/TypeEvent.schema").TypeEventDocument> & import("../schemas/TypeEvent.schema").TypeEvent & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>)[], import("mongoose").Document<unknown, {}, import("../schemas/TypeEvent.schema").TypeEventDocument> & import("../schemas/TypeEvent.schema").TypeEvent & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>, {}, import("../schemas/TypeEvent.schema").TypeEventDocument, "find", {}>;
    findOne(id: string): string;
    update(id: string, updateTypeEventDto: UpdateTypeEventDto): string;
    remove(id: string): string;
}
