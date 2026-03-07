import { Controller, Get, Post, Put, Patch, Delete, Body, Param, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { IAppointment } from '../models/appointment.interface';
import { ApiResponse } from '../models/api-response.interface';

@ApiTags('Appointments') 
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  @ApiOperation({ summary: 'ดึงข้อมูลการจองทั้งหมด' })
  async findAll(): Promise<ApiResponse<IAppointment[]>> {
    const data = await this.appointmentService.findAll();
    return { success: true, message: 'ดึงข้อมูลการจองสำเร็จ', data };
  }

  @Get(':id')
  @ApiOperation({ summary: 'ดึงข้อมูลการจองด้วย ID' })
  async findOne(@Param('id') id: string): Promise<ApiResponse<IAppointment>> {
    const data = await this.appointmentService.findOne(id);
    return { success: true, message: 'ดึงข้อมูลการจองสำเร็จ', data };
  }

  @Post()
  @ApiOperation({ summary: 'สร้างการจองใหม่' })
  async create(@Body() createDto: CreateAppointmentDto): Promise<ApiResponse<IAppointment>> {
    const data = await this.appointmentService.create(createDto);
    return { success: true, message: 'สร้างการจองใหม่สำเร็จ', data };
  }

  @Put(':id')
  @ApiOperation({ summary: 'แทนที่ข้อมูลการจอง (Replace)' })
  async replace(@Param('id') id: string, @Body() replaceDto: CreateAppointmentDto): Promise<ApiResponse<IAppointment>> {
    const data = await this.appointmentService.update(id, replaceDto, true);
    return { success: true, message: 'แทนที่ข้อมูลการจองสำเร็จ', data };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'อัปเดตข้อมูลการจองบางส่วน (Patch)' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateAppointmentDto): Promise<ApiResponse<IAppointment>> {
    const data = await this.appointmentService.update(id, updateDto, false);
    return { success: true, message: 'อัปเดตข้อมูลการจองสำเร็จ', data };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ยกเลิกการจอง' })
  @HttpCode(200)
  async remove(@Param('id') id: string): Promise<ApiResponse<null>> {
    await this.appointmentService.remove(id);
    return { success: true, message: 'ยกเลิกการจองสำเร็จ', data: null };
  }
}