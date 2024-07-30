/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import {
  Reservation,
  ReservationDocument,
} from 'src/schemas/Reservation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private ReservationModel: Model<ReservationDocument>,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    return await new this.ReservationModel(createReservationDto).save();
  }

  findAll() {
    return this.ReservationModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }

  async findByUserId(userId: string): Promise<Reservation[]> {
    const reservations = await this.ReservationModel.find({
      user_id: userId,
    }).exec();
    if (!reservations || reservations.length === 0) {
      throw new NotFoundException(
        `Reservations for user ID ${userId} not found`,
      );
    }
    return reservations;
  }
}
