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
  

  constructor(private readonly serviceService: ServiceService) {}

  private async readData(): Promise<IAppointment[]> {
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

  async create(dto: CreateServiceDto): Promise<IAppointment> {
    const services = await this.readData();
    const newId = `svc-${Date.now()}`; 
    const now = new Date().toISOString(); 

    const newAppointment: IAppointment = {
      id: newId,
      ...dto,
      createdAt: now,
      updatedAt: now,
      serviceId: '',
      customerName: '',
      customerPhone: '',
      appointmentDate: '',
      status: AppointmentStatus.PENDING,
      isFirstTimeCustomer: false,
      isReminderSent: false
    };
    
    services.push(newAppointment);
    await this.writeData(services);
    return newAppointment;
  }

  async update(id: string, dto: UpdateAppointmentDto, isReplace: boolean): Promise<IAppointment> {
    const appointments = await this.readData();
    const index = appointments.findIndex(a => a.id === id);
    if (index === -1) throw new NotFoundException(`ไม่พบข้อมูลการจองรหัส ${id}`);

    if (dto.serviceId) {
      await this.serviceService.findOne(dto.serviceId);
    }

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

  async remove(id: string): Promise<void> {
    const appointments = await this.readData();
    const filtered = appointments.filter(a => a.id !== id);
    
    if (appointments.length === filtered.length) {
      throw new NotFoundException(`ไม่พบข้อมูลการจองรหัส ${id}`);
    }

    await this.writeData(filtered);
  }
}