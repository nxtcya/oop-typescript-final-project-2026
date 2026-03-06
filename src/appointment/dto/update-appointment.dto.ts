import { IsString, IsISO8601, IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { AppointmentStatus } from '../../models/appointment-status.enum';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsString()
  serviceId?: string;

  @IsOptional()
  @IsString()
  customerName?: string;

  @IsOptional()
  @IsString()
  customerPhone?: string;

  @IsOptional()
  @IsISO8601()
  appointmentDate?: string;

  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsBoolean()
  isFirstTimeCustomer!: boolean;

  @IsOptional()
  @IsBoolean()
  isReminderSent?: boolean;
}