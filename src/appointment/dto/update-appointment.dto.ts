import { IsString, IsISO8601, IsOptional, IsEnum, IsBoolean, Matches } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { AppointmentStatus } from '../../models/appointment-status.enum';

export class UpdateAppointmentDto {
  @ApiPropertyOptional({ description: 'ID ของบริการ' })
  @IsOptional()
  @IsString()
  serviceId?: string;

  @ApiPropertyOptional({ description: 'ชื่อลูกค้า' })
  @IsOptional()
  @IsString()
  customerName?: string;

  @ApiPropertyOptional({ description: 'เบอร์โทรศัพท์ 9-10 หลัก' })
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{9,10}$/, { message: 'เบอร์โทรศัพท์ต้องเป็นตัวเลข 9-10 หลัก' }) 
  customerPhone?: string;

  @ApiPropertyOptional({ description: 'วันที่และเวลาที่จอง (ISO8601)' })
  @IsOptional()
  @IsISO8601()
  appointmentDate?: string;

  @ApiPropertyOptional({ enum: AppointmentStatus, description: 'สถานะการจอง' })
  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus;

  @ApiPropertyOptional({ description: 'หมายเหตุเพิ่มเติม' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ description: 'เป็นลูกค้าครั้งแรกหรือไม่' })
  @IsOptional()
  @IsBoolean()
  isFirstTimeCustomer?: boolean; 

  @ApiPropertyOptional({ description: 'ส่งการแจ้งเตือนแล้วหรือยัง' })
  @IsOptional()
  @IsBoolean()
  isReminderSent?: boolean; 
}