import { Document } from 'mongoose';
export type TypeEventDocument = TypeEvent & Document;
export declare class TypeEvent {
    name: string;
}
export declare const TypeEventSchema: import("mongoose").Schema<TypeEvent, import("mongoose").Model<TypeEvent, any, any, any, Document<unknown, any, TypeEvent> & TypeEvent & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TypeEvent, Document<unknown, {}, import("mongoose").FlatRecord<TypeEvent>> & import("mongoose").FlatRecord<TypeEvent> & {
    _id: import("mongoose").Types.ObjectId;
}>;
