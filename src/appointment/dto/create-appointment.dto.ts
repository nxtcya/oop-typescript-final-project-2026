import { IsString, IsNotEmpty, IsISO8601, IsOptional } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  serviceId!: string;

  @IsString()
  @IsNotEmpty()
  customerName!: string;

  @IsString()
  @IsNotEmpty()
  customerPhone!: string;

  @IsISO8601()
  @IsNotEmpty()
  appointmentDate!: string; 

  @IsOptional()
  @IsString()
  notes?: string;
}