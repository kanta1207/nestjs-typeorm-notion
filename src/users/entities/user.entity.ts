import { Exclude } from 'class-transformer';
import { Item } from 'src/items/entities/item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  userName: string;
  @OneToMany(() => Item, (item) => item.user)
  items: Item[];
}
