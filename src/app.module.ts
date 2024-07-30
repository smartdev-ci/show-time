import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';
import { UserModule } from './user/user.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { TypeEventModule } from './type-event/type-event.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://adouko_94:ario2024@cluster0.lg62tkh.mongodb.net/event-place/',
    ),
    UserModule,
    EventsModule,
    UserModule,
    DashboardModule,
    TypeEventModule,
    ReservationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
