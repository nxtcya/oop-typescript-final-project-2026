import { IsBoolean, IsNumber, IsString, Min } from "class-validator"

export class CreateServiceDto { 
    @IsString()
    code : string = '';

    @IsString()
    name : string = '';
}

// id : string;
//     code : string;
//     name : string;
//     description : string;
//     durationMinutes : number;
//     price : number;
//     status : serviceStatus;
//     maxBookingsPerSlot : number;
//     allowWalkIn : number;
//     createdAt : Date;
//     updateAt : Date;
