import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsIn,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'email is invalid' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'password is required' })
  password_hash: string;

  @IsString()
  @IsOptional()
  restaurant_name?: string;

  @IsString()
  @IsNotEmpty({ message: 'role is required' })
  @IsIn(['admin', 'restaurant_owner'], {
    message: 'role must be admin or restaurant_owner',
  })
  role: 'admin' | 'restaurant_owner';

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsBoolean()
  @IsOptional()
  verified?: boolean;
}
