import { IsString, IsNotEmpty, IsISO8601, IsOptional, MaxLength } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  serviceId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100) // จำกัดความยาว กันคนสแปม data base พัง
  customerName!: string;

  @IsString()
  @IsNotEmpty()
  customerPhone!: string;

  @IsISO8601()
  @IsNotEmpty()
  appointmentDate!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500) // จำกัดความยาว กันคนสแปม data base พัง
  notes?: string;
}