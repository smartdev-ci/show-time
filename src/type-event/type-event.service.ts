/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateTypeEventDto } from './dto/create-type-event.dto';
import { UpdateTypeEventDto } from './dto/update-type-event.dto';
import { TypeEventDocument, TypeEvent } from 'src/schemas/TypeEvent.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TypeEventService {
  constructor(
    @InjectModel(TypeEvent.name)
    private TypeEventModel: Model<TypeEventDocument>,
  ) {}

  create(createTypeEventDto: CreateTypeEventDto): Promise<TypeEvent> {
    return new this.TypeEventModel(createTypeEventDto).save();
  }

  findAll() {
    return this.TypeEventModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} typeEvent`;
  }

  update(id: number, updateTypeEventDto: UpdateTypeEventDto) {
    return `This action updates a #${id} typeEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeEvent`;
  }
}
