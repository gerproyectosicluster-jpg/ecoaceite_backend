import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { encryptPassword } from 'src/util/functions/encrypt-decrypt-password.function';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    // Encrypt user password before saving to the database
    const newPassword = encryptPassword(createUserDto.password);

    return { dto: { ...createUserDto, password: newPassword } };
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
