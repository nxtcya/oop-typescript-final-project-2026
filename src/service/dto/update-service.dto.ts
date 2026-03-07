import { ServiceCategory } from '../../models/service-category.enum';
import { IsString, IsNumber, IsBoolean, Min, IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateServiceDto {
  @ApiPropertyOptional({ description: 'ชื่อบริการ' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'รายละเอียดบริการ' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'ระยะเวลา (นาที)' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  durationMinutes?: number;

  @ApiPropertyOptional({ description: 'ราคา' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({ description: 'เปิดให้บริการหรือไม่' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ description: 'ต้องจ่ายเงินล่วงหน้าหรือไม่' })
  @IsOptional()
  @IsBoolean()
  requiresAdvancePayment?: boolean; 

  @ApiPropertyOptional({ description: 'รับลูกค้าได้สูงสุดต่อรอบ' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxCapacity?: number; 

  @ApiPropertyOptional({ enum: ServiceCategory, description: 'หมวดหมู่บริการ' })
  @IsOptional()
  @IsEnum(ServiceCategory)
  category?: ServiceCategory;
}