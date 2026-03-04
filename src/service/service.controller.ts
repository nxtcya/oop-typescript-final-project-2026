import { Controller, Get, Post, Put, Patch, Delete, Body, Param, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { IService } from '../models/service.interface';
import { ApiResponse } from '../models/api-response.interface';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  async findAll(): Promise<ApiResponse<IService[]>> {
    const data = await this.serviceService.findAll();
    return { success: true, message: 'ดึงข้อมูลบริการสำเร็จ', data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<IService>> {
    const data = await this.serviceService.findOne(id);
    return { success: true, message: 'ดึงข้อมูลบริการสำเร็จ', data };
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createDto: CreateServiceDto): Promise<ApiResponse<IService>> {
    const data = await this.serviceService.create(createDto);
    return { success: true, message: 'สร้างบริการใหม่สำเร็จ', data };
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async replace(@Param('id') id: string, @Body() updateDto: UpdateServiceDto): Promise<ApiResponse<IService>> {
    const data = await this.serviceService.update(id, updateDto, true);
    return { success: true, message: 'แทนที่ข้อมูลบริการสำเร็จ', data };
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateDto: UpdateServiceDto): Promise<ApiResponse<IService>> {
    const data = await this.serviceService.update(id, updateDto, false);
    return { success: true, message: 'อัปเดตข้อมูลบริการสำเร็จ', data };
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id') id: string): Promise<ApiResponse<null>> {
    await this.serviceService.remove(id);
    return { success: true, message: 'ลบข้อมูลบริการสำเร็จ', data: null };
  }
}