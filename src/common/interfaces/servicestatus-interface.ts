import { serviceStatus } from "@/modules/service/enums/sevice-status.enum";


export interface ServiceEntuty {
    id : string;
    code : string;
    name : string;
    description? : string;
    durationMinutes : number;
    minAdvanceBooking : number;
    price : number;
    currency : string;
    status : serviceStatus;
    maxBookingsPerSlot : number;
    allowWalkIn : boolean;
    createdAt : Date;
    updatedAt : Date;

}