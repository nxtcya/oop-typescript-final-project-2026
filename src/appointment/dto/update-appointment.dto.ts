import { IsString, IsISO8601, IsOptional, IsEnum, IsNotEmpty, MaxLength} from 'class-validator';
import { AppointmentStatus } from '../../models/appointment-status.enum';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty() // กันคนส่ง "" มาทับ data เดิม
  serviceId?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty() // กันคนส่ง "" มาทับ data เดิม
  @MaxLength(100) // จำกัดความยาว กันคนสแปม data base พัง
  customerName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty() // กันคนส่ง "" มาทับ data เดิม
  customerPhone?: string;

  @IsOptional()
  @IsISO8601()
  @IsNotEmpty() // กันคนส่ง "" มาทับ data เดิม
  appointmentDate?: string;

  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus;

  @IsOptional()
  @IsString()
  @MaxLength(500) // จำกัดความยาว กันคนสแปม data base พัง
  notes?: string;
}