import { IsString, IsNotEmpty, IsISO8601, IsOptional, IsBoolean } from 'class-validator';
import { Matches } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  serviceId!: string;

  @IsString()
  @IsNotEmpty()
  customerName!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]{9,10}$/, { message: 'เบอร์โทรศัพท์ต้องเป็นตัวเลข 9-10 หลัก' })
  customerPhone!: string;

  @IsISO8601()
  @IsNotEmpty()
  appointmentDate!: string; 

  @IsOptional()
  @IsString()
  notes?: string;

  @IsBoolean()
  isFirstTimeCustomer!: boolean;

  @IsOptional()
  @IsBoolean()
  isReminderSent?: boolean;
}