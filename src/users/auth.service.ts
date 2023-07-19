import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string, userName: string) {
    // check if email is in use
    const users = await this.usersService.find(email);

    if (users.length) throw new BadRequestException('This email is in use.');

    // // hash users password
    // // generate a salt. It's gonna be 16 characters string
    const salt = randomBytes(8).toString('hex');

    // hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    const user = await this.usersService.create({
      email,
      password: result,
      userName,
    });
    return user;
  }

  async signin(email: string, password: string) {
    // assuming there's one user with this email
    const [user] = await this.usersService.find(email);
    if (!user) throw new NotFoundException('user not found');
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Password is not correct');
    }
    return user;
  }
}
