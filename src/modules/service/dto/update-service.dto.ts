import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator"
import { serviceStatus } from "../enums/sevice-status.enum";

export class UpdateServiceDto { 
    @IsString()
    @IsNotEmpty()
    code! : string;

    @IsString()
    @IsNotEmpty()
    name! : string;

    @IsString()
    @IsOptional()
    description?: string ;

    @IsNumber()
    @Min(1)
    durationMinutes! : number;

    @IsNumber()
    @Min(0)
    minAdvanceBooking! : number;

    @IsNumber()
    @Min(0)
    price! : number ;

    @IsString()
    @IsOptional()
    currency : string = 'THB';

    @IsEnum(serviceStatus)
    status! : serviceStatus;

    @IsNumber()
    @Min(1)
    maxBookingsPerSlot! : number;

    @IsBoolean()
    allowWalkIn! : boolean;

    
}

