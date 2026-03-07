import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { randomUUID } from 'crypto'; 
import { IAppointment } from '../models/appointment.interface';
import { AppointmentStatus } from '../models/appointment-status.enum';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ServiceService } from '../service/service.service';

@Injectable()
export class AppointmentService {
  private readonly filePath = path.join(process.cwd(), 'data', 'appointment.json');
  
  private mutex = Promise.resolve();

  private async runWithLock<T>(fn: () => Promise<T>): Promise<T> {
    const result = this.mutex.then(fn);
    this.mutex = result.then(() => {}, () => {}); 
    return result;
  }
  
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
    return this.runWithLock(async () => {
      const service = await this.serviceService.findOne(dto.serviceId);
      if (!service.isActive) {
        throw new BadRequestException('ขออภัย บริการนี้ปิดให้บริการชั่วคราว');
      }

      const appointmentDate = new Date(dto.appointmentDate);
      if (appointmentDate < new Date()) {
        throw new BadRequestException('วันที่และเวลาที่จองต้องไม่เป็นอดีต');
      }

      const appointments = await this.readData();
      const targetTime = appointmentDate.getTime(); 
      const overlappingAppointments = appointments.filter(
        (a) => 
          a.serviceId === dto.serviceId &&
          new Date(a.appointmentDate).getTime() === targetTime && 
          (a.status === AppointmentStatus.PENDING || a.status === AppointmentStatus.CONFIRMED)
      );

      if (overlappingAppointments.length >= service.maxCapacity) {
        throw new BadRequestException(`คิวเต็มแล้ว! บริการนี้รับได้สูงสุด ${service.maxCapacity} คิวต่อรอบเวลา`);
      }

      const newId = `appt-${randomUUID()}`; 
      const now = new Date().toISOString();

      const newAppointment: IAppointment = {
        id: newId,
        ...dto,
        createdAt: now,
        updatedAt: now,
        status: AppointmentStatus.PENDING,
        isFirstTimeCustomer: dto.isFirstTimeCustomer,
        isReminderSent: false
      };
      
      appointments.push(newAppointment);
      await this.writeData(appointments);
      return newAppointment;
    });
  }

  async update(id: string, dto: UpdateAppointmentDto | CreateAppointmentDto, isReplace: boolean): Promise<IAppointment> {
    return this.runWithLock(async () => {
      const appointments = await this.readData();
      const index = appointments.findIndex(a => a.id === id);
      if (index === -1) throw new NotFoundException(`ไม่พบข้อมูลการจองรหัส ${id}`);

      const oldAppointment = appointments[index];
      const now = new Date().toISOString();

      const targetServiceId = dto.serviceId ?? oldAppointment.serviceId;
      const targetDate = dto.appointmentDate ?? oldAppointment.appointmentDate;
      const targetStatus = (dto as UpdateAppointmentDto).status ?? oldAppointment.status;

      if (dto.serviceId || dto.appointmentDate || (dto as UpdateAppointmentDto).status) {
          const service = await this.serviceService.findOne(targetServiceId);
        
        if (dto.serviceId && !service.isActive) {
          throw new BadRequestException('ขออภัย บริการนี้ปิดให้บริการชั่วคราว');
        }

        if (dto.appointmentDate && new Date(targetDate) < new Date()) {
          throw new BadRequestException('วันที่และเวลาที่จองต้องไม่เป็นอดีต');
        }

        if (targetStatus === AppointmentStatus.PENDING || targetStatus === AppointmentStatus.CONFIRMED) {
          const targetTime = new Date(targetDate).getTime(); 

          const overlappingAppointments = appointments.filter(
            (a) => 
              a.id !== id && 
              a.serviceId === targetServiceId &&
              new Date(a.appointmentDate).getTime() === targetTime && 
              (a.status === AppointmentStatus.PENDING || a.status === AppointmentStatus.CONFIRMED)
          );

          if (overlappingAppointments.length >= service.maxCapacity) {
            throw new BadRequestException(`คิวเต็มแล้ว! บริการนี้รับได้สูงสุด ${service.maxCapacity} คิวต่อรอบเวลา`);
          }
        }
      }

      if (isReplace) {
        const createDto = dto as CreateAppointmentDto;
        appointments[index] = { 
          id: id, 
          serviceId: createDto.serviceId,
          customerName: createDto.customerName,
          customerPhone: createDto.customerPhone,
          appointmentDate: createDto.appointmentDate,
          notes: createDto.notes,
          isFirstTimeCustomer: createDto.isFirstTimeCustomer,
          isReminderSent: createDto.isReminderSent ?? oldAppointment.isReminderSent,
          status: oldAppointment.status,
          createdAt: oldAppointment.createdAt,
          updatedAt: now
        };
      } else {
        appointments[index] = { 
          ...oldAppointment, 
          ...dto, 
          updatedAt: now
        };
      }

      await this.writeData(appointments);
      return appointments[index];
    });
  }

  async remove(id: string): Promise<void> {
    return this.runWithLock(async () => {
      const appointments = await this.readData();
      const filtered = appointments.filter(a => a.id !== id);
      
      if (appointments.length === filtered.length) {
        throw new NotFoundException(`ไม่พบข้อมูลการจองรหัส ${id}`);
      }

      await this.writeData(filtered);
    });
  }
}