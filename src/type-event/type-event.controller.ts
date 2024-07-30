import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Res,
} from '@nestjs/common';
import { TypeEventService } from './type-event.service';
import { Response } from 'express';
import { CreateTypeEventDto } from './dto/create-type-event.dto';
import { UpdateTypeEventDto } from './dto/update-type-event.dto';

@Controller('type-event')
export class TypeEventController {
  constructor(private readonly typeEventService: TypeEventService) {}

  @Post('add-type-event')
  async create(
    @Body() createTypeEventDto: CreateTypeEventDto,
    @Res() res: Response,
  ) {
    const data = await this.typeEventService.create(createTypeEventDto);
    console.log(data);
    return res.redirect('events');
  }

  @Get('add-type-event')
  @Render('events/type-event/add-event')
  findAll() {
    return this.typeEventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeEventService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTypeEventDto: UpdateTypeEventDto,
  ) {
    return this.typeEventService.update(+id, updateTypeEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeEventService.remove(+id);
  }
}
