import { Document } from 'mongoose';
export type ReservationDocument = Reservation & Document;
export declare class Reservation {
    event_id: string;
    user_id: string;
    username: string;
    contact: string;
    eventName: string;
    quantity: number;
    eventDate: Date;
    bookingDate: Date;
    place: string;
    total: number;
}
export declare const ReservationSchema: import("mongoose").Schema<Reservation, import("mongoose").Model<Reservation, any, any, any, Document<unknown, any, Reservation> & Reservation & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Reservation, Document<unknown, {}, import("mongoose").FlatRecord<Reservation>> & import("mongoose").FlatRecord<Reservation> & {
    _id: import("mongoose").Types.ObjectId;
}>;
