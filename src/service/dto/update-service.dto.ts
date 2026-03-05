import { IsString, IsNumber, IsBoolean, Min, IsOptional, IsNotEmpty, MaxLength, IsEnum } from 'class-validator';
import { ServiceCategory } from '../../models/service.interface';
export class UpdateServiceDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  durationMinutes?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;
 //เพิ่มให้ครบ 10
  @IsOptional() 
  @IsNumber()
  @Min(1)
  maxCapacity?: number;

  @IsOptional()
  @IsEnum(ServiceCategory)
  category?: ServiceCategory;

  @IsOptional()
  @IsBoolean()
  requiresAdvancePayment?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}