import { IsString, IsNotEmpty, IsISO8601, IsOptional, IsBoolean, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({ description: 'ID ของบริการที่ต้องการจอง', example: 'svc-123456789' })
  @IsString()
  @IsNotEmpty()
  serviceId!: string;

  @ApiProperty({ description: 'ชื่อลูกค้า', example: 'สมชาย ใจดี' })
  @IsString()
  @IsNotEmpty()
  customerName!: string;

  @ApiProperty({ description: 'เบอร์โทรศัพท์ 9-10 หลัก', example: '0812345678' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]{9,10}$/, { message: 'เบอร์โทรศัพท์ต้องเป็นตัวเลข 9-10 หลัก' })
  customerPhone!: string;

  @ApiProperty({ description: 'วันที่และเวลาที่จอง (ISO8601)', example: '2026-03-10T10:00:00Z' })
  @IsISO8601()
  @IsNotEmpty()
  appointmentDate!: string;

  @ApiPropertyOptional({ description: 'หมายเหตุเพิ่มเติม', example: 'แพ้ฝุ่น' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ description: 'เป็นลูกค้าครั้งแรกหรือไม่', example: true })
  @IsBoolean()
  isFirstTimeCustomer!: boolean;

  @ApiPropertyOptional({ description: 'ส่งการแจ้งเตือนแล้วหรือยัง', example: false })
  @IsOptional()
  @IsBoolean()
  isReminderSent?: boolean;
}