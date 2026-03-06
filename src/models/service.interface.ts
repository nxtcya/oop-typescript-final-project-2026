import { ServiceCategory } from "./service-category.enum";

export interface IService {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  isActive: boolean;
  requiresAdvancePayment: boolean;
  maxCapacity: number;
  category: ServiceCategory; 
  createdAt: string;
  updatedAt: string;
}