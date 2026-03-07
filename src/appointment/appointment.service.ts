import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { IAppointment } from '../models/appointment.interface';
import { AppointmentStatus } from '../models/appointment-status.enum';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ServiceService } from '../service/service.service';
import { IService } from '@/models/service.interface';
import { CreateServiceDto } from '@/service/dto/create-service.dto';

@Injectable()
export class AppointmentService {
  private readonly filePath = path.join(process.cwd(), 'data', 'appointments.json');
  
  private async ensureFileExists(): Promise<void> {
    try {
      await fs.access(this.filePath);
    } catch {
      await fs.mkdir(path.dirname(this.filePath), { recursive: true });
      await fs.writeFile(this.filePath, '[]', 'utf-8');
    }
  }

  constructor(private readonly serviceService: ServiceService) {}

  private async readData(): Promise<IAppointment[]> {
    await this.ensureFileExists();
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data) as IAppointment[];
    } catch (error) {
      return [];
    }
  }

  private async writeData(data: IAppointment[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  async findAll(): Promise<IAppointment[]> {
    return await this.readData();
  }

  async findOne(id: string): Promise<IAppointment> {
    const appointments = await this.readData();
    const appointment = appointments.find(a => a.id === id);
    if (!appointment) throw new NotFoundException(`ไม่พบข้อมูลการจองรหัส ${id}`);
    return appointment;
  }

  async create(dto: CreateAppointmentDto): Promise<IAppointment> {
    const service = await this.serviceService.findOne(dto.serviceId);
   if (!service.isActive) {
      throw new BadRequestException('ขออภัย บริการนี้ปิดให้บริการชั่วคราว');
    }

    const appointmentDate = new Date(dto.appointmentDate);
    if (appointmentDate < new Date()) {
      throw new BadRequestException('วันที่และเวลาที่จองต้องไม่เป็นอดีต');
    }

    const appointments = await this.readData();

    const overlappingAppointments = appointments.filter(
      (a) => 
        a.serviceId === dto.serviceId &&
        a.appointmentDate === dto.appointmentDate &&
        (a.status === AppointmentStatus.PENDING || a.status === AppointmentStatus.CONFIRMED)
    );

    if (overlappingAppointments.length >= service.maxCapacity) {
      throw new BadRequestException(`คิวเต็มแล้ว! บริการนี้รับได้สูงสุด ${service.maxCapacity} คิวต่อรอบเวลา`);
    }

    const newId = `appt-${Date.now()}`;
    const now = new Date().toISOString();

    const newAppointment: IAppointment = {
      id: newId,
      ...dto,
      createdAt: now,
      updatedAt: now,
      status: AppointmentStatus.PENDING,
      isFirstTimeCustomer: false,
      isReminderSent: false
    };
    
    appointments.push(newAppointment);
    await this.writeData(appointments);
    return newAppointment;
  }

  async update(id: string, dto: UpdateAppointmentDto, isReplace: boolean): Promise<IAppointment> // เปลี่ยนรับค่า dto เป็น UpdateAppointmentDto | CreateAppointmentDto ให้มันรองรับกรณี replace(PUT) ข้อมูลทั้งก้อน
  {
    const appointments = await this.readData();
    const index = appointments.findIndex(a => a.id === id);
    if (index === -1) throw new NotFoundException(`ไม่พบข้อมูลการจองรหัส ${id}`);

    if (dto.serviceId) {
      await this.serviceService.findOne(dto.serviceId);
    }

    const existing = appointments[index];
    const now = new Date().toISOString(); // เวลาปัจจุบันที่ทำการแก้ไข

    if (isReplace) {
      const currentStatus = appointments[index].status;
      appointments[index] = { 
        id, 
        serviceId: dto.serviceId!,
        customerName: dto.customerName!,
        customerPhone: dto.customerPhone!,
        appointmentDate: dto.appointmentDate!,
        status: dto.status ?? currentStatus,
        notes: dto.notes
      } as IAppointment;
    } else {
      appointments[index] = { ...appointments[index], ...dto };
    }

    await this.writeData(appointments);
    return appointments[index];
  }

  /* if (isReplace) {
      // กรณี PUT: ต้องดึงข้อมูลเก่าที่ไม่ควรถูกแก้ กลับมาใส่ด้วย ข้อมูลจะได้ครบเหมือนก่อน update
      const createDto = dto as CreateAppointmentDto; การประกาศแบบนี้ปลอดภัยกว่าการใช้ ! อะ แบบบังคับไปเลยจะได้ไม่มีช่องให้ leak
      appointments[index] = { 
        id: existing.id, 
        serviceId: createDto.serviceId,
        customerName: createDto.customerName,
        customerPhone: createDto.customerPhone,
        appointmentDate: createDto.appointmentDate,
        notes: createDto.notes,
        // รักษาสถานและข้อมูลเดิมไว้
        status: existing.status,
        isFirstTimeCustomer: existing.isFirstTimeCustomer,
        isReminderSent: existing.isReminderSent,
        createdAt: existing.createdAt,
        updatedAt: now // อัปเดตเวลาแก้ไข (ทำ timestamp เหมือนที่ guidline อาจารย์บอก)
      };
    } else {
      // กรณี PATCH: อัปเดตเฉพาะบางอย่างที่ส่งมา + time stamp เหมือนเดิม
      appointments[index] = { 
        ...existing, 
        ...dto, 
        updatedAt: now 
      };
    }

    await this.writeData(appointments);
    return appointments[index];
  } */

  async remove(id: string): Promise<void> {
    const appointments = await this.readData();
    const filtered = appointments.filter(a => a.id !== id);
    
    if (appointments.length === filtered.length) {
      throw new NotFoundException(`ไม่พบข้อมูลการจองรหัส ${id}`);
    }

    await this.writeData(filtered);
  }
}