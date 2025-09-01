import { Module } from '@nestjs/common';
import { EducationalUnitService } from './educational-unit.service';
import { EducationalUnitController } from './educational-unit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationalUnit } from './entities/educational-unit.entity';

@Module({
  controllers: [EducationalUnitController],
  providers: [EducationalUnitService],
  imports: [TypeOrmModule.forFeature([EducationalUnit])],
  exports: [TypeOrmModule],
})
export class EducationalUnitModule {}
