import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator"
import { serviceStatus } from "../enums/sevice-status.enum";

export class PatchServiceDto { 
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    code? : string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name? : string;

    @IsOptional()
    @IsString()
    @IsOptional()
    description?: string ;

    @IsOptional()
    @IsNumber()
    @Min(1)
    durationMinutes? : number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    minAdvanceBooking? : number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    price? : number ;

    @IsOptional()
    @IsString()
    @IsOptional()
    currency? : string = 'THB';

    @IsOptional()
    @IsEnum(serviceStatus)
    status? : serviceStatus;

    @IsOptional()
    @IsNumber()
    @Min(1)
    maxBookingsPerSlot? : number;

    @IsOptional()
    @IsBoolean()
    allowWalkIn? : boolean;

    
}