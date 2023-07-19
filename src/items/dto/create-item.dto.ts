import { IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  title: string;
  @IsString()
  content: string;
}
