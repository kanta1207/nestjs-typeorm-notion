import { Expose, Transform } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';

export class ResponseItemDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  content: string;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
