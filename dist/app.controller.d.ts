import { AppService } from './app.service';
import { EventsService } from './events/events.service';
import { UserService } from './user/user.service';
import { LoginDto } from './user/dto/login.dto';
import { Response, Request } from 'express';
import { CreateUserDto } from './user/dto/create-user.dto';
import { CreateReservationDto } from './reservation/dto/create-reservation.dto';
import { ReservationService } from './reservation/reservation.service';
import { TypeEventService } from './type-event/type-event.service';
export declare class AppController {
    private readonly appService;
    private readonly eService;
    private readonly uService;
    private readonly rService;
    private readonly tService;
    constructor(appService: AppService, eService: EventsService, uService: UserService, rService: ReservationService, tService: TypeEventService);
    getHello(req: Request, res: Response): Promise<{
        event: (import("mongoose").Document<unknown, {}, import("./schemas/Events.schema").EventDocument> & import("./schemas/Events.schema").Event & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }>)[];
        admin: boolean;
        standard: boolean;
        nothing: boolean;
        types: (import("mongoose").Document<unknown, {}, import("./schemas/TypeEvent.schema").TypeEventDocument> & import("./schemas/TypeEvent.schema").TypeEvent & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }>)[];
    }>;
    showLogin(req: Request, res: Response): void;
    showRegister(): void;
    register(createUserDto: CreateUserDto, res: Response): Promise<void>;
    findAllEvent(): Promise<{
        event: (import("mongoose").Document<unknown, {}, import("./schemas/Events.schema").EventDocument> & import("./schemas/Events.schema").Event & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }>)[];
    }>;
    findOne(_id: string): Promise<{
        onevent: import("mongoose").Document<unknown, {}, import("./schemas/Events.schema").EventDocument> & import("./schemas/Events.schema").Event & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }>;
    }>;
    showBooking(_id: any, req: Request, res: Response): Promise<{
        user: import("mongoose").Document<unknown, {}, import("./schemas/Users.schema").UserDocument> & import("./schemas/Users.schema").User & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }>;
        event: import("mongoose").Document<unknown, {}, import("./schemas/Events.schema").EventDocument> & import("./schemas/Events.schema").Event & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }>;
    }>;
    pay(createReservationDto: CreateReservationDto, res: Response, req: Request): Promise<void>;
    showProfile(req: Request): Promise<{
        resByUser: import("./schemas/Reservation.schema").Reservation[];
        user: import("mongoose").Document<unknown, {}, import("./schemas/Users.schema").UserDocument> & import("./schemas/Users.schema").User & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }>;
        qr: Promise<string>;
    }>;
    login(loginDto: LoginDto, res: Response): Promise<void>;
}
