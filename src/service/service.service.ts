import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { IService } from '../models/service.interface';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  private readonly filePath = path.join(process.cwd(), 'data', 'services.json');

  private async readData(): Promise<IService[]> {
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
    const services = await this.readData();
    const newId = `S${Date.now()}`; 

    const newService: IService = { id: newId, ...dto };
    services.push(newService);
    await this.writeData(services);
    
    return newService;
  }

  async update(id: string, dto: UpdateServiceDto, isReplace: boolean): Promise<IService> {
    const services = await this.readData();
    const index = services.findIndex(s => s.id === id);
    if (index === -1) throw new NotFoundException(`ไม่พบบริการรหัส ${id}`);

    if (isReplace) {
      
      services[index] = { id, ...dto } as IService;
    } else {
      
      services[index] = { ...services[index], ...dto };
    }

    await this.writeData(services);
    return services[index];
  }

  async remove(id: string): Promise<void> {
    const services = await this.readData();
    const filtered = services.filter(s => s.id !== id);
    
    if (services.length === filtered.length) {
      throw new NotFoundException(`ไม่พบบริการรหัส ${id}`);
    }

    await this.writeData(filtered);
  }
}