import { ServiceCategory } from '../../models/service-category.enum';
import { IsString, IsNotEmpty, IsNumber, IsBoolean, Min, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({ description: 'ชื่อบริการ', example: 'นวดแผนไทย' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ description: 'รายละเอียดบริการ', example: 'นวดผ่อนคลาย 60 นาที' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ description: 'ระยะเวลา (นาที)', example: 60 })
  @IsNumber()
  @Min(1)
  durationMinutes!: number;

  @ApiProperty({ description: 'ราคา', example: 500 })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({ description: 'เปิดให้บริการหรือไม่', example: true })
  @IsBoolean()
  isActive!: boolean;

  @ApiProperty({ description: 'ต้องจ่ายเงินล่วงหน้าหรือไม่', example: false })
  @IsBoolean()
  requiresAdvancePayment!: boolean;

  @ApiProperty({ description: 'รับลูกค้าได้สูงสุดต่อรอบ', example: 2 })
  @IsNumber()
  @Min(1)
  maxCapacity!: number;

  @ApiProperty({ enum: ServiceCategory, description: 'หมวดหมู่บริการ' })
  @IsEnum(ServiceCategory, { message: 'หมวดหมู่บริการไม่ถูกต้อง' })
  @IsNotEmpty()
  category!: ServiceCategory;
}