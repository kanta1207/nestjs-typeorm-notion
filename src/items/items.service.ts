import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private readonly itemRepo: Repository<Item>,
  ) {}
  create(createItemDto: CreateItemDto, user: User) {
    const item = this.itemRepo.create(createItemDto);
    item.user = user;
    return this.itemRepo.save(item);
  }

  findOne(id: number) {
    if (!id) {
      throw new NotFoundException('Item not found.');
    }
    return this.itemRepo.findOneBy({ id });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.findOne(id);
    if (!item) {
      throw new NotFoundException('item not found');
    }
    Object.assign(item, updateItemDto);
    return this.itemRepo.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    if (!item) {
      throw new NotFoundException('item not found');
    }
    return this.itemRepo.remove(item);
  }
}
