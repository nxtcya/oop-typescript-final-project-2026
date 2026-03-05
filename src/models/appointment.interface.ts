import { AppointmentStatus } from './appointment-status.enum';

export interface IAppointment {
  id: string;
  serviceId: string;
  customerName: string;
  customerPhone: string;
  appointmentDate: string; 
  status: AppointmentStatus;
  notes?: string;
  // ไม่ครบ 10 ตัว กับ ไม่มี Attribute ประเภท Boolean/Enum ที่ใช้ตั้งค่าเงื่อนไข และก็ Attribute เกี่ยวกับเวลา จะโดนหักคะแนนนะมีบอกใน subjects/models.md
  isFirstTimeCustomer: boolean; // เป็นลูกค้าใหม่เพิ่งเคยมาครั้งแรกหรือไม่?
  isReminderSent: boolean;      // ระบบส่ง SMS แจ้งเตือนล่วงหน้าไปหรือยัง?
  createdAt: string; // เวลาที่กดสร้างการจอง (ISO8601)
  updatedAt: string; // เวลาที่อัปเดตข้อมูลล่าสุด (ISO8601)
}
