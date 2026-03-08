import { Controller, Get, Post, Put, Patch, Delete, Body, Param, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { IService } from '../models/service.interface';
import { ApiResponse } from '../models/api-response.interface';

@ApiTags('Services') 
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  @ApiOperation({ summary: 'ดึงข้อมูลบริการทั้งหมด' })
  async findAll(): Promise<ApiResponse<IService[]>> {
    const data = await this.serviceService.findAll();
    return { success: true, message: 'ดึงข้อมูลบริการสำเร็จ', data };
  }

  @Get(':id')
  @ApiOperation({ summary: 'ดึงข้อมูลบริการด้วย ID' })
  async findOne(@Param('id') id: string): Promise<ApiResponse<IService>> {
    const data = await this.serviceService.findOne(id);
    return { success: true, message: 'ดึงข้อมูลบริการสำเร็จ', data };
  }

  @Post()
  @ApiOperation({ summary: 'สร้างบริการใหม่' })
  async create(@Body() createDto: CreateServiceDto): Promise<ApiResponse<IService>> {
    const data = await this.serviceService.create(createDto);
    return { success: true, message: 'สร้างบริการใหม่สำเร็จ', data };
  }

  @Put(':id')
  @ApiOperation({ summary: 'แทนที่ข้อมูลบริการ (Replace)' })
  async replace(@Param('id') id: string, @Body() replaceDto: CreateServiceDto): Promise<ApiResponse<IService>> {
    const data = await this.serviceService.update(id, replaceDto, true);
    return { success: true, message: 'แทนที่ข้อมูลบริการสำเร็จ', data };
  }
  
  @Patch(':id')
  @ApiOperation({ summary: 'อัปเดตข้อมูลบริการบางส่วน (Patch)' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateServiceDto): Promise<ApiResponse<IService>> {
    const data = await this.serviceService.update(id, updateDto, false);
    return { success: true, message: 'อัปเดตข้อมูลบริการสำเร็จ', data };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ลบข้อมูลบริการ' })
  @HttpCode(200)
  async remove(@Param('id') id: string): Promise<ApiResponse<null>> {
    await this.serviceService.remove(id);
    return { success: true, message: 'ลบข้อมูลบริการสำเร็จ', data: null };
  }
}