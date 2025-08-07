import {
  IsUUID,
  IsNotEmpty,
  IsEnum,
  IsString,
  MaxLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { NotificationType } from '../enum/notification-type.enum';

export class CreateNotificationDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsEnum(NotificationType)
  @IsNotEmpty()
  type: NotificationType;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsBoolean()
  @IsOptional()
  isRead?: boolean;

  @IsString()
  @IsOptional()
  actionUrl?: string;
}
