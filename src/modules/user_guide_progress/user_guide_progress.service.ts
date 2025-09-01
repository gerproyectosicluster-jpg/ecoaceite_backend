import { Injectable } from '@nestjs/common';
import { CreateUserGuideProgressDto } from './dto/create-user_guide_progress.dto';
import { UpdateUserGuideProgressDto } from './dto/update-user_guide_progress.dto';

@Injectable()
export class UserGuideProgressService {
  create(createUserGuideProgressDto: CreateUserGuideProgressDto) {
    return 'This action adds a new userGuideProgress';
  }

  findAll() {
    return `This action returns all userGuideProgress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userGuideProgress`;
  }

  update(id: number, updateUserGuideProgressDto: UpdateUserGuideProgressDto) {
    return `This action updates a #${id} userGuideProgress`;
  }

  remove(id: number) {
    return `This action removes a #${id} userGuideProgress`;
  }
}
