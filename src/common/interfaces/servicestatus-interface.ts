import { serviceStatus } from "@/modules/service/enums/sevice-status.enum";


export interface ServiceEntuty {
    id : string;
    code : string;
    name : string;
    description : string;
    durationMinutes : number;
    price : number;
    status : serviceStatus;
    maxBookingsPerSlot : number;
    allowWalkIn : number;
    createdAt : Date;
    updateAt : Date;

}