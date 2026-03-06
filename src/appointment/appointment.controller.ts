import { Controller, Get, Post, Put, Patch, Delete, Body, Param, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { IAppointment } from '../models/appointment.interface';
import { ApiResponse } from '../models/api-response.interface';
import { CreateServiceDto } from '@/service/dto/create-service.dto';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}


  @Get()
  async findAll(): Promise<ApiResponse<IAppointment[]>> {
    const data = await this.appointmentService.findAll();
    return { success: true, message: 'ดึงข้อมูลการจองสำเร็จ', data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<IAppointment>> {
    const data = await this.appointmentService.findOne(id);
    return { success: true, message: 'ดึงข้อมูลการจองสำเร็จ', data };
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createDto: CreateServiceDto): Promise<ApiResponse<IAppointment>> {
  const data = await this.appointmentService.create(createDto);
  return { success: true, message: 'สร้างการจองใหม่สำเร็จ', data };
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async replace(@Param('id') id: string, @Body() updateDto: UpdateAppointmentDto): Promise<ApiResponse<IAppointment>> {
    const data = await this.appointmentService.update(id, updateDto, true);
    return { success: true, message: 'แทนที่ข้อมูลการจองสำเร็จ', data };
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateDto: UpdateAppointmentDto): Promise<ApiResponse<IAppointment>> {
    const data = await this.appointmentService.update(id, updateDto, false);
    return { success: true, message: 'อัปเดตข้อมูลการจองสำเร็จ', data };
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id') id: string): Promise<ApiResponse<null>> {
    await this.appointmentService.remove(id);
    return { success: true, message: 'ยกเลิกการจองสำเร็จ', data: null };
  }
}