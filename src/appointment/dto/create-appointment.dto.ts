import { IsString, IsNotEmpty, IsISO8601, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({ description: 'รหัสบริการที่ต้องการจอง', example: 'svc-hair-01' })
  @IsString()
  @IsNotEmpty()
  serviceId!: string;

  @ApiProperty({ description: 'ชื่อลูกค้า', example: 'สมชาย รักดี', maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100) // จำกัดความยาว กันคนสแปม data base พัง
  customerName!: string;

  @ApiProperty({ description: 'เบอร์โทรศัพท์ลูกค้า', example: '0812345678' })
  @IsString()
  @IsNotEmpty()
  customerPhone!: string;

  @ApiProperty({ description: 'วันและเวลานัดหมาย (ISO8601)', example: '2026-03-10T10:00:00Z' })
  @IsISO8601()
  @IsNotEmpty()
  appointmentDate!: string;

  @ApiPropertyOptional({ description: 'หมายเหตุเพิ่มเติม (ถ้ามี)', example: 'ขอช่างคนเดิมที่เคยทำ', maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500) // จำกัดความยาว กันคนสแปม data base พัง
  notes?: string;
}