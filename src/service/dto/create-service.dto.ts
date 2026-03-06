import { IsString, IsNotEmpty, IsNumber, IsBoolean, Min } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @Min(1)
  durationMinutes!: number;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsBoolean()
  isActive!: boolean;

  @IsBoolean()
  requiresAdvancePayment!: boolean;

  @IsNumber()
  @Min(1)
  maxCapacity!: number;

  @IsString()
  @IsNotEmpty()
  category!: string;
}