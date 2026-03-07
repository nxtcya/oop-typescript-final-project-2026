import { IsString, IsISO8601, IsOptional, IsEnum, IsNotEmpty, MaxLength} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { AppointmentStatus } from '../../models/appointment-status.enum';

export class UpdateAppointmentDto {
  @ApiPropertyOptional({ description: 'รหัสบริการ', example: 'svc-hair-01' })
  @IsOptional()
  @IsString()
  @IsNotEmpty() // กันคนส่ง "" มาทับ data เดิม
  serviceId?: string;

  @ApiPropertyOptional({ description: 'ชื่อลูกค้า', example: 'สมชาย รักดี', maxLength: 100 })
  @IsOptional()
  @IsString()
  @IsNotEmpty() // กันคนส่ง "" มาทับ data เดิม
  @MaxLength(100) // จำกัดความยาว กันคนสแปม data base พัง
  customerName?: string;

  @ApiPropertyOptional({ description: 'เบอร์โทรศัพท์ลูกค้า', example: '0812345678' })
  @IsOptional()
  @IsString()
  @IsNotEmpty() // กันคนส่ง "" มาทับ data เดิม
  customerPhone?: string;

  @ApiPropertyOptional({ description: 'วันและเวลานัดหมาย (ISO8601)', example: '2026-03-10T10:00:00Z' })
  @IsOptional()
  @IsISO8601()
  @IsNotEmpty() // กันคนส่ง "" มาทับ data เดิม
  appointmentDate?: string;

  @ApiPropertyOptional({ description: 'สถานะการจอง', enum: AppointmentStatus, example: AppointmentStatus.CONFIRMED })
  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus;

  @ApiPropertyOptional({ description: 'หมายเหตุเพิ่มเติม', example: 'เลื่อนเวลาเข้ามา 15 นาที', maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500) // จำกัดความยาว กันคนสแปม data base พัง
  notes?: string;
}