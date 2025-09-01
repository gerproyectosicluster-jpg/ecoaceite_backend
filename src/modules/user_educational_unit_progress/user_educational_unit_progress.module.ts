import { Module } from '@nestjs/common';
import { UserEducationalUnitProgressService } from './user_educational_unit_progress.service';
import { UserEducationalUnitProgressController } from './user_educational_unit_progress.controller';
import { UserEducationalUnitProgress } from './entities/user_educational_unit_progress.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UserEducationalUnitProgressController],
  providers: [UserEducationalUnitProgressService],
  imports: [TypeOrmModule.forFeature([UserEducationalUnitProgress])],
})
export class UserEducationalUnitProgressModule {}
