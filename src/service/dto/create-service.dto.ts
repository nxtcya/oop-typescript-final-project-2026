import { IsString, IsNotEmpty, IsNumber, IsBoolean, Min, MaxLength, IsEnum, IsOptional} from 'class-validator';
import { ServiceCategory } from '../../models/service.interface'; // import enum เข้ามา
export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description!: string;

  @IsNumber()
  @Min(1)
  durationMinutes!: number;

  @IsNumber()
  @Min(1)
  maxCapacity!: number;

  @IsEnum(ServiceCategory)
  category!: ServiceCategory

  @IsOptional()
  @IsBoolean()
  requiresAdvancePayment?: boolean; // อาจจะกำหนดให้เป็น Optional ถ้าไม่ส่งมาให้ตั้งค่าเริ่มต้นเป็น false ใน Service

  @IsNumber()
  @Min(0)
  price!: number;

  @IsBoolean()
  @IsOptional()
  isActive!: boolean; // // ถ้า user ไม่ส่งมา ค่าเริ่มต้นเวลาสร้างใหม่ควรเป็น true
}