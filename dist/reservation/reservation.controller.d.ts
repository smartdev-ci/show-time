import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
export declare class ReservationController {
    private readonly reservationService;
    constructor(reservationService: ReservationService);
    create(createReservationDto: CreateReservationDto): Promise<import("../schemas/Reservation.schema").Reservation>;
    findAll(): Promise<{
        reservation: (import("mongoose").Document<unknown, {}, import("../schemas/Reservation.schema").ReservationDocument> & import("../schemas/Reservation.schema").Reservation & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }>)[];
    }>;
    findOne(id: string): string;
    update(id: string, updateReservationDto: UpdateReservationDto): string;
    remove(id: string): string;
}
