import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { encryptPassword } from 'src/util/functions/encrypt-decrypt-password.function';
import { Restaurant } from '../restaurant/entities/restaurant.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create({
      ...createUserDto,
      password_hash: encryptPassword(createUserDto.password_hash),
    });
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User & { restaurant?: Restaurant }> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User #${id} not found`);

    // Buscar el restaurante asociado (si existe)
    const restaurantRepo =
      this.userRepository.manager.getRepository(Restaurant);
    const restaurant = await restaurantRepo.findOne({
      where: { user: { id } },
    });

    // Retornar el usuario junto con el restaurante (si existe)
    return { ...user, restaurant };
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User & { restaurant?: Restaurant }> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User #${id} not found`);

    // Si se envía una nueva contraseña, hashearla antes de guardar
    if (updateUserDto.password_hash) {
      updateUserDto.password_hash = encryptPassword(
        updateUserDto.password_hash,
      );
    }

    // Actualizar campos del usuario
    Object.assign(user, updateUserDto);

    // Actualizar restaurante si viene en el body
    let restaurant: Restaurant | undefined;
    if (updateUserDto.restaurant) {
      const restaurantRepo =
        this.userRepository.manager.getRepository(Restaurant);
      restaurant = await restaurantRepo.findOne({ where: { user: { id } } });
      if (restaurant) {
        // Actualizar capacity y category
        restaurant.capacity = updateUserDto.restaurant.capacity;
        restaurant.category = updateUserDto.restaurant.category;

        // Calcular classification
        if (restaurant.capacity <= 50) {
          restaurant.classification = 'Cuchara al fuego';
        } else if (restaurant.capacity <= 150) {
          restaurant.classification = 'Sartén en marcha';
        } else {
          restaurant.classification = 'Ollas en acción';
        }

        await restaurantRepo.save(restaurant);
      }
    }

    await this.userRepository.save(user);
    return { ...user, restaurant };
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}
