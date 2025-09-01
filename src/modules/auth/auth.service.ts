import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { decryptPassword } from 'src/util/functions/encrypt-decrypt-password.function';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { RestaurantService } from '../restaurant/restaurant.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly restaurantService: RestaurantService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (decryptPassword(user?.password_hash) !== password) {
      throw new UnauthorizedException();
    }

    //Return JWT token
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user_id: user.id,
    };
  }

  async register(payload: RegisterDto): Promise<any> {
    // 1. Crear usuario
    const user = await this.userService.create(payload.user);

    let restaurant;
    if (user.role === 'restaurant_owner' && payload.restaurant) {
      restaurant = await this.restaurantService.create({
        ...payload.restaurant,
        user_id: user.id,
      });
    }

    // 3. Generar JWT
    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    // 4. Retornar usuario, restaurante (si aplica) y token
    return { user, restaurant, access_token: token };
  }
}
