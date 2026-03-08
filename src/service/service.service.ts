import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { randomUUID } from 'crypto'; 
import { IService } from '../models/service.interface';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { IAppointment } from '../models/appointment.interface';
import { AppointmentStatus } from '../models/appointment-status.enum';

@Injectable()
export class ServiceService {
  private readonly filePath = path.join(process.cwd(), 'data', 'service.json');
  private readonly appointmentsPath = path.join(process.cwd(), 'data', 'appointment.json'); 
  
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

  private async readData(): Promise<IService[]> {
    await this.ensureFileExists();
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data) as IService[];
    } catch (error) {
      return []; 
    }
  }
  
  private async writeData(data: IService[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  async findAll(): Promise<IService[]> {
    return await this.readData(); 
  }

  async findOne(id: string): Promise<IService> {
    const services = await this.readData();
    const service = services.find(s => s.id === id);
    if (!service) throw new NotFoundException(`ไม่พบบริการรหัส ${id}`);
    return service;
  }

  async create(dto: CreateServiceDto): Promise<IService> {
    return this.runWithLock(async () => {
      const services = await this.readData();
      const newId = `svc-${randomUUID()}`; 
      const now = new Date().toISOString();

      const newService: IService = { 
        id: newId, 
        ...dto,
        isActive: dto.isActive ?? true, 
        requiresAdvancePayment: dto.requiresAdvancePayment ?? false,
        createdAt: now,
        updatedAt: now
      };
      services.push(newService);
      await this.writeData(services);
      
      return newService;
    });
  }

  async update(id: string, dto: UpdateServiceDto | CreateServiceDto, isReplace: boolean): Promise<IService> {
    return this.runWithLock(async () => {
      const services = await this.readData();
      const index = services.findIndex(s => s.id === id);
      if (index === -1) {
        throw new NotFoundException(`ไม่พบข้อมูลบริการรหัส ${id}`);
      }
      const now = new Date().toISOString();
      const oldService = services[index];

      if (isReplace) {
        const createDto = dto as CreateServiceDto;
        services[index] = { 
          id: id, 
          name: createDto.name,
          description: createDto.description,
          durationMinutes: createDto.durationMinutes,
          price: createDto.price,
          isActive: createDto.isActive,
          requiresAdvancePayment: createDto.requiresAdvancePayment,
          maxCapacity: createDto.maxCapacity,
          category: createDto.category,
          createdAt: oldService.createdAt,
          updatedAt: now
        };
      } else {
        services[index] = { 
          ...oldService, 
          ...dto, 
          updatedAt: now
        };
      }

      await this.writeData(services);
      return services[index];
    });
  }

  async remove(id: string): Promise<void> {
    return this.runWithLock(async () => {
      try {
        const apptData = await fs.readFile(this.appointmentsPath, 'utf-8');
        const appointments: IAppointment[] = JSON.parse(apptData);
        const hasActiveAppointments = appointments.some(
          a => a.serviceId === id && (a.status === AppointmentStatus.PENDING || a.status === AppointmentStatus.CONFIRMED)
        );
        if (hasActiveAppointments) {
          throw new BadRequestException('ไม่สามารถลบบริการนี้ได้ เนื่องจากมีคิวการจองที่ดำเนินการอยู่');
        }
      } catch (error) {
        if (error instanceof BadRequestException) throw error;
      }

      const services = await this.readData();
      const filtered = services.filter(s => s.id !== id);
      
      if (services.length === filtered.length) {
        throw new NotFoundException(`ไม่พบบริการรหัส ${id}`);
      }

      await this.writeData(filtered);
    });
  }
}