import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Response } from 'express';
import { TypeEventService } from 'src/type-event/type-event.service';
import { CreateTypeEventDto } from 'src/type-event/dto/create-type-event.dto';
export declare class EventsController {
    private readonly eventsService;
    private readonly typeEventSce;
    constructor(eventsService: EventsService, typeEventSce: TypeEventService);
    create(createEventDto: CreateEventDto, res: Response): Promise<void>;
    index(): Promise<{
        types: (import("mongoose").Document<unknown, {}, import("../schemas/TypeEvent.schema").TypeEventDocument> & import("../schemas/TypeEvent.schema").TypeEvent & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }>)[];
    }>;
    createTypeEvent(createTypeEventDto: CreateTypeEventDto, res: Response): Promise<void>;
    findAll(): Promise<{
        event: (import("mongoose").Document<unknown, {}, import("../schemas/Events.schema").EventDocument> & import("../schemas/Events.schema").Event & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }>)[];
    }>;
    findOne(_id: string): Promise<{
        onevent: import("mongoose").Document<unknown, {}, import("../schemas/Events.schema").EventDocument> & import("../schemas/Events.schema").Event & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }>;
    }>;
    findOneToUpdate(_id: string): Promise<{
        onevent: import("mongoose").Document<unknown, {}, import("../schemas/Events.schema").EventDocument> & import("../schemas/Events.schema").Event & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }>;
        types: (import("mongoose").Document<unknown, {}, import("../schemas/TypeEvent.schema").TypeEventDocument> & import("../schemas/TypeEvent.schema").TypeEvent & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }>)[];
    }>;
    update(_id: string, updateEventDto: UpdateEventDto, res: Response): Promise<void>;
    remove(_id: string): Promise<import("mongodb").DeleteResult>;
}
