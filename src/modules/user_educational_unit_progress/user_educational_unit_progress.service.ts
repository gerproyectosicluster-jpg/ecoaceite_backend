import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEducationalUnitProgress } from './entities/user_educational_unit_progress.entity';
import { CreateUserEducationalUnitProgressDto } from './dto/create-user_educational_unit_progress.dto';
import { UpdateUserEducationalUnitProgressDto } from './dto/update-user_educational_unit_progress.dto';
import { User } from '../user/entities/user.entity';
import { Restaurant } from '../restaurant/entities/restaurant.entity';

@Injectable()
export class UserEducationalUnitProgressService {
  constructor(
    @InjectRepository(UserEducationalUnitProgress)
    private readonly progressRepository: Repository<UserEducationalUnitProgress>,
  ) {}

  async create(
    createDto: CreateUserEducationalUnitProgressDto,
  ): Promise<UserEducationalUnitProgress> {
    const progress = this.progressRepository.create({
      ...createDto,
      user: { id: createDto.user_id } as any,
      unit: { id: createDto.unit_id } as any,
    });
    return await this.progressRepository.save(progress);
  }

  async findAll(): Promise<UserEducationalUnitProgress[]> {
    return await this.progressRepository.find({ relations: ['user', 'unit'] });
  }

  async findOne(id: string): Promise<UserEducationalUnitProgress> {
    const progress = await this.progressRepository.findOne({
      where: { id },
      relations: ['user', 'unit'],
    });
    if (!progress) throw new NotFoundException(`Progress #${id} not found`);
    return progress;
  }

  async findByUserId(userId: string): Promise<UserEducationalUnitProgress[]> {
    return await this.progressRepository.find({
      where: { user: { id: userId } },
      relations: ['unit'],
      order: { unit: { order: 'ASC' } },
    });
  }

  private async getUserRoleAndClassification(
    userId: string,
  ): Promise<{ role: string; classification: string | null }> {
    const user = await this.progressRepository.manager
      .createQueryBuilder(User, 'user')
      .leftJoinAndSelect(
        Restaurant,
        'restaurant',
        'restaurant.user_id = user.id',
      )
      .where('user.id = :userId', { userId })
      .select(['user.role', 'restaurant.classification'])
      .getRawOne();
    return {
      role: user.user_role,
      classification: user.restaurant_classification || null,
    };
  }

  async getTotalScoresByUser(requestingUserId: string): Promise<
    {
      userId: string;
      restaurant_name: string;
      total_score: number;
      latitude: number | null;
      longitude: number | null;
      classification: string | null;
    }[]
  > {
    const { role, classification } =
      await this.getUserRoleAndClassification(requestingUserId);

    let query = this.progressRepository
      .createQueryBuilder('progress')
      .leftJoin('progress.user', 'user')
      .leftJoin(Restaurant, 'restaurant', 'restaurant.user_id = user.id') // <-- join manual
      .select('user.id', 'userId')
      .addSelect('user.restaurant_name', 'restaurant_name')
      .addSelect('SUM(progress.total_score)', 'total_score')
      .addSelect('user.latitude', 'latitude')
      .addSelect('user.longitude', 'longitude')
      .addSelect('restaurant.classification', 'classification')
      .groupBy('user.id')
      .addGroupBy('user.restaurant_name')
      .addGroupBy('user.latitude')
      .addGroupBy('user.longitude')
      .addGroupBy('restaurant.classification')
      .orderBy('total_score', 'DESC');

    if (role !== 'admin' && classification) {
      query = query.where('restaurant.classification = :classification', {
        classification,
      });
    }

    const results = await query.getRawMany();

    return results.map((r) => ({
      userId: r.userid,
      restaurant_name: r.restaurant_name,
      total_score: Number(r.total_score),
      latitude: r.latitude !== null ? Number(r.latitude) : null,
      longitude: r.longitude !== null ? Number(r.longitude) : null,
      classification: r.classification,
    }));
  }

  async getGlobalAverageScore(
    requestingUserId: string,
  ): Promise<{ global_average: number }> {
    const { role, classification } =
      await this.getUserRoleAndClassification(requestingUserId);

    // 1. Sumar los puntajes por usuario/restaurante
    let subQuery = this.progressRepository
      .createQueryBuilder('progress')
      .leftJoin('progress.user', 'user')
      .leftJoin(Restaurant, 'restaurant', 'restaurant.user_id = user.id')
      .select('user.id', 'userId')
      .addSelect('SUM(progress.total_score)', 'user_total_score')
      .groupBy('user.id')
      .addGroupBy('restaurant.classification');

    if (role !== 'admin' && classification) {
      subQuery = subQuery.where('restaurant.classification = :classification', {
        classification,
      });
    }

    const userScores = await subQuery.getRawMany();

    // 2. Calcular el promedio de los totales por usuario
    const scores = userScores.map((r) => Number(r.user_total_score));
    const avg =
      scores.length > 0
        ? Number((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2))
        : 0;

    return { global_average: avg };
  }

  async getScoresByUnitAndRestaurant(requestingUserId: string): Promise<
    {
      restaurant_name: string;
      unit_name: string;
      total_score: number;
      classification: string | null;
    }[]
  > {
    const { role, classification } =
      await this.getUserRoleAndClassification(requestingUserId);

    let query = this.progressRepository
      .createQueryBuilder('progress')
      .leftJoin('progress.user', 'user')
      .leftJoin(Restaurant, 'restaurant', 'restaurant.user_id = user.id')
      .leftJoin('progress.unit', 'unit')
      .select('user.restaurant_name', 'restaurant_name')
      .addSelect('unit.title', 'unit_name')
      .addSelect('progress.total_score', 'total_score')
      .addSelect('restaurant.classification', 'classification')
      .orderBy('user.restaurant_name', 'ASC')
      .addOrderBy('unit.order', 'ASC');

    if (role !== 'admin' && classification) {
      query = query.where('restaurant.classification = :classification', {
        classification,
      });
    }

    const results = await query.getRawMany();

    return results.map((r) => ({
      restaurant_name: r.restaurant_name,
      unit_name: r.unit_name,
      total_score: Number(r.total_score),
      classification: r.classification,
    }));
  }

  async update(
    id: string,
    updateDto: UpdateUserEducationalUnitProgressDto,
  ): Promise<UserEducationalUnitProgress> {
    const progress = await this.findOne(id);
    Object.assign(progress, updateDto);
    return await this.progressRepository.save(progress);
  }

  async remove(id: string): Promise<void> {
    const progress = await this.findOne(id);
    await this.progressRepository.remove(progress);
  }
}
