export enum ServiceCategory {
  HAIR_CARE = 'HAIR_CARE',
  SKIN_CARE = 'SKIN_CARE',
  MASSAGE = 'MASSAGE',
  CONSULTATION = 'CONSULTATION',
  OTHER = 'OTHER'
} // ถ้ามีประเภทบริการ สร้าง enum แยกอีกตัวก็ได้ ชั้นเขียนแบบคิดว่ามีไปก่อนนะ

export interface IService {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  isActive: boolean;
  requiresAdvancePayment: boolean;
  // เหมือนกับ appointment.interface.ts
  maxCapacity: number;
  category: ServiceCategory;
  createdAt: string;
  updatedAt: string;
}