import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation, ReservationDocument } from 'src/schemas/Reservation.schema';
import { Model } from 'mongoose';
export declare class ReservationService {
    private ReservationModel;
    constructor(ReservationModel: Model<ReservationDocument>);
    create(createReservationDto: CreateReservationDto): Promise<Reservation>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, ReservationDocument> & Reservation & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>)[], import("mongoose").Document<unknown, {}, ReservationDocument> & Reservation & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>, {}, ReservationDocument, "find", {}>;
    findOne(id: number): string;
    update(id: number, updateReservationDto: UpdateReservationDto): string;
    remove(id: number): string;
    findByUserId(userId: string): Promise<Reservation[]>;
}
