import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event, EventDocument } from 'src/schemas/Events.schema';
import { Model } from 'mongoose';
export declare class EventsService {
    private EventModel;
    constructor(EventModel: Model<EventDocument>);
    create(createEventDto: CreateEventDto): Promise<Event>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, EventDocument> & Event & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>)[]>;
    findOne(_id: string): Promise<import("mongoose").Document<unknown, {}, EventDocument> & Event & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    update(_id: string, updateEventDto: UpdateEventDto): Promise<import("mongoose").UpdateWriteOpResult>;
    remove(_id: string): Promise<import("mongodb").DeleteResult>;
}
