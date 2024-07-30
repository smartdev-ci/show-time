import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event, EventDocument } from 'src/schemas/Events.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private EventModel: Model<EventDocument>,
  ) {}
  async create(createEventDto: CreateEventDto): Promise<Event> {
    return new this.EventModel(createEventDto).save();
  }

  async findAll() {
    return this.EventModel.find();
  }

  async findOne(_id: string) {
    return this.EventModel.findOne({ _id });
  }

  async update(_id: string, updateEventDto: UpdateEventDto) {
    return this.EventModel.updateOne(
      { Event },
      { $set: { ...updateEventDto } },
    );
  }

  async remove(_id: string) {
    return this.EventModel.deleteOne({ _id });
  }
}
