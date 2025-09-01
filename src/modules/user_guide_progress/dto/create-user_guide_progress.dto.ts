import { IsUUID, IsOptional, IsEnum } from 'class-validator';
import { GuideStatus } from 'src/modules/educational-guide/enum/guide_status.enum';

export class CreateUserGuideProgressDto {
  @IsUUID()
  user_id: string;

  @IsUUID()
  guide_id: string;

  @IsEnum(GuideStatus)
  @IsOptional()
  status?: GuideStatus;
}
