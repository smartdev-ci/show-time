import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from 'src/schemas/Reservation.schema';
import { EventsModule } from 'src/events/events.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
    EventsModule,
    UserModule,
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService],
})
export class ReservationModule {}
