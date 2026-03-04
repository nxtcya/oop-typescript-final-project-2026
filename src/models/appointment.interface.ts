import { AppointmentStatus } from './appointment-status.enum';

export interface IAppointment {
  id: string;
  serviceId: string;
  customerName: string;
  customerPhone: string;
  appointmentDate: string; 
  status: AppointmentStatus;
  notes?: string;
}