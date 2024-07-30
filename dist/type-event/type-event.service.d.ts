import { CreateTypeEventDto } from './dto/create-type-event.dto';
import { UpdateTypeEventDto } from './dto/update-type-event.dto';
import { TypeEventDocument, TypeEvent } from 'src/schemas/TypeEvent.schema';
import { Model } from 'mongoose';
export declare class TypeEventService {
    private TypeEventModel;
    constructor(TypeEventModel: Model<TypeEventDocument>);
    create(createTypeEventDto: CreateTypeEventDto): Promise<TypeEvent>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, TypeEventDocument> & TypeEvent & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>)[], import("mongoose").Document<unknown, {}, TypeEventDocument> & TypeEvent & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>, {}, TypeEventDocument, "find", {}>;
    findOne(id: number): string;
    update(id: number, updateTypeEventDto: UpdateTypeEventDto): string;
    remove(id: number): string;
}
