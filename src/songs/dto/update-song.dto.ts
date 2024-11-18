import { PartialType } from '@nestjs/mapped-types';
import { CreateSongDto } from './create-song.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateSongDto extends PartialType(CreateSongDto) {
  @IsNumber()
  @IsNotEmpty()
  price?: number;
}
