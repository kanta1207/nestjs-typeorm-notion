import { Serialize } from 'src/interceptors/serialize.interceptor';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { CurrentUser } from 'src/users/decorators/current-user-decorator';
import { User } from 'src/users/entities/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { ResponseItemDto } from './dto/response-item.dto';

@Controller('items')
@Serialize(ResponseItemDto)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() body: CreateItemDto, @CurrentUser() user: User) {
    return this.itemsService.create(body, user);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const item = await this.itemsService.findOne(parseInt(id));
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(parseInt(id), updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(parseInt(id));
  }
  s;
}
