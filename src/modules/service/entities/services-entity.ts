import { serviceStatus } from "../enums/sevice-status.enum";


export interface ServiceEntity {
    id : number;
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