import {
  Controller,
  Get,
  Post,
  Body,
  // Put,
  Res,
  Param,
  Delete,
  Render,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Response } from 'express';
import { TypeEventService } from 'src/type-event/type-event.service';
import { CreateTypeEventDto } from 'src/type-event/dto/create-type-event.dto';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly typeEventSce: TypeEventService,
  ) {}

  @Post('create-event')
  async create(@Body() createEventDto: CreateEventDto, @Res() res: Response) {
    await this.eventsService.create(createEventDto);
    return res.redirect('events');
  }

  @Get('create-event')
  @Render('dashboard/events/add-event')
  async index() {
    const types = await this.typeEventSce.findAll();
    return { types };
  }

  @Post('add-type-event')
  async createTypeEvent(
    @Body() createTypeEventDto: CreateTypeEventDto,
    @Res() res: Response,
  ) {
    const data = await this.typeEventSce.create(createTypeEventDto);
    console.log(data);
    return res.redirect('/events/create-event');
  }

  @Get()
  @Render('dashboard/events/event')
  async findAll() {
    const event = await this.eventsService.findAll();
    console.log(event);
    return { event };
  }

  @Get(':_id')
  @Render('events/event-details')
  async findOne(@Param('_id') _id: string) {
    const onevent = await this.eventsService.findOne(_id);
    console.log(onevent);
    return { onevent };
  }

  @Get('update-event/:_id')
  @Render('dashboard/events/update-event')
  async findOneToUpdate(@Param('_id') _id: string) {
    const types = await this.typeEventSce.findAll();
    const onevent = await this.eventsService.findOne(_id);
    console.log(onevent);
    return { onevent, types };
  }

  @Post('update-event/:_id')
  async update(
    @Param(':_id') _id: string,
    @Body() updateEventDto: UpdateEventDto,
    @Res() res: Response,
  ) {
    await this.eventsService.update(_id, updateEventDto);
    return res.redirect('events');
  }

  @Delete('delete/:_id')
  remove(@Param('_id') _id: string) {
    return this.eventsService.remove(_id);
  }
}
