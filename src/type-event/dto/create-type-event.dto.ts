import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTypeEventDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
