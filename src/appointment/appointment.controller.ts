import { Controller, Get, Post, Put, Patch, Delete, Body, Param, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { IAppointment } from '../models/appointment.interface';
import { ApiResponse } from '../models/api-response.interface';

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
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) // เพิ่ม { whitelist: true, forbidNonWhitelisted: true } เพื่อกรองข้อมูลที่ไม่ได้กำหนดใน DTO กันการโดน Over-Posting กับ Injection Flaws
  async create(@Body() createDto: CreateAppointmentDto): Promise<ApiResponse<IAppointment>> {
    const data = await this.appointmentService.create(createDto);
    return { success: true, message: 'สร้างการจองใหม่สำเร็จ', data };
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) // เหตุผลเดียวกัน
  async replace(@Param('id') id: string, @Body() updateDto: UpdateAppointmentDto): Promise<ApiResponse<IAppointment>> {
    const data = await this.appointmentService.update(id, updateDto, true);
    return { success: true, message: 'แทนที่ข้อมูลการจองสำเร็จ', data };
  } // ตรง updateDto: UpdateAppointmentDto รู้สึกว่าเปลี่ยนมาใช้ CreateAppointmentDto ดีกว่าเพราะ put คือการแทนที่ทั้งก้อน คือถ้าส่งมาไม่ครบ data เก่าก็จะหาย เลยคิดว่าบังคับรับข้อมูลเป็นแบบ Create เลยจะเซฟกว่า (แต่อันนี้ชั้นยังไม่ได้แก้นะ)

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) // เหมือนเดิม
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