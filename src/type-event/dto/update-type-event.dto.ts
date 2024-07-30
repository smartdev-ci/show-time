import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeEventDto } from './create-type-event.dto';

export class UpdateTypeEventDto extends PartialType(CreateTypeEventDto) {}
