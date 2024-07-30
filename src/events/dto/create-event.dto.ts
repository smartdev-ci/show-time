import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsUUID,
  IsNumber,
} from 'class-validator';
export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  readonly event_name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly image: string;

  @IsDate()
  @IsNotEmpty()
  readonly date_due: Date;

  @IsNumber()
  @IsNotEmpty()
  readonly cost: number;

  @IsString()
  @IsNotEmpty()
  readonly place: string;

  @IsUUID()
  @IsNotEmpty()
  readonly type_event_id: string;
}

export class EventResponseDto {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly date: Date;
  readonly typeEventId: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
