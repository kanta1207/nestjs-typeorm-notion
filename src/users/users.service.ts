import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  create(body: { email: string; password: string; userName: string }) {
    const { email, password, userName } = body;
    const user = this.userRepo.create({ email, password, userName });
    return this.userRepo.save(user);
  }

  findOne(id: number) {
    if (!id) {
      throw new NotFoundException('user not found');
    }
    return this.userRepo.findOneBy({ id });
  }

  find(email: string) {
    return this.userRepo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    //what will happen with this?
    // const updatedUser = Object.assign({...user,attrs})
    // return this.repo.save(updatedUser)
    Object.assign(user, attrs);
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.userRepo.remove(user);
  }
}
