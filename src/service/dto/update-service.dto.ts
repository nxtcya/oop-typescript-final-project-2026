import { IsString, IsNumber, IsBoolean, Min, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateServiceDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  durationMinutes?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  requiresAdvancePayment!: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1)
  maxCapacity!: number;
  
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  category!: string;
}