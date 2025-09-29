import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    let classification = '';
    if (createRestaurantDto.capacity <= 50) {
      classification = 'Cuchara al fuego';
    } else if (createRestaurantDto.capacity <= 150) {
      classification = 'Sartén en marcha';
    } else {
      classification = 'Ollas en acción';
    }

    const restaurant = this.restaurantRepository.create({
      ...createRestaurantDto,
      user: { id: createRestaurantDto.user_id } as any,
      classification,
    });
    return await this.restaurantRepository.save(restaurant);
  }

  async findAll(): Promise<Restaurant[]> {
    return await this.restaurantRepository.find();
  }

  async findOne(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id },
    });
    if (!restaurant) throw new NotFoundException(`Restaurant #${id} not found`);
    return restaurant;
  }

  async findByUserId(userId: string): Promise<Restaurant | null> {
    return await this.restaurantRepository.findOne({
      where: { user: { id: userId } },
    });
  }

  async update(
    id: string,
    updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    const restaurant = await this.findOne(id);
    Object.assign(restaurant, updateRestaurantDto);
    return await this.restaurantRepository.save(restaurant);
  }

  async remove(id: string): Promise<void> {
    const restaurant = await this.findOne(id);
    await this.restaurantRepository.remove(restaurant);
  }
}
