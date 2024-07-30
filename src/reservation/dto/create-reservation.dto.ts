import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  readonly user_id: string;

  @IsString()
  @IsNotEmpty()
  readonly event_id: string;

  @IsString()
  @IsNotEmpty()
  readonly eventName: string;

  @IsDate()
  @IsNotEmpty()
  readonly eventDate: Date;

  @IsString()
  @IsNotEmpty()
  readonly place: string;

  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsNumber()
  @IsNotEmpty()
  readonly contact: number;

  @IsDate()
  @IsNotEmpty()
  readonly bookingDate: Date;

  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;

  @IsNumber()
  @IsNotEmpty()
  readonly total: number;
}
