import { Controller, Get, Post, Put, Patch, Delete, Body, Param, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse, ApiParam } from '@nestjs/swagger';
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
  @SwaggerResponse({ status: 200, description: 'ดึงข้อมูลการจองสำเร็จ' })
  async findAll(): Promise<ApiResponse<IAppointment[]>> {
    const data = await this.appointmentService.findAll();
    return { success: true, message: 'ดึงข้อมูลการจองสำเร็จ', data };
  }

  @Get(':id')
  @ApiOperation({ summary: 'ดึงข้อมูลการจองตาม ID' })
  @ApiParam({ name: 'id', description: 'รหัสการจอง', example: 'appt-001' })
  @SwaggerResponse({ status: 200, description: 'ดึงข้อมูลสำเร็จ' })
  @SwaggerResponse({ status: 404, description: 'ไม่พบข้อมูลการจอง' })
  async findOne(@Param('id') id: string): Promise<ApiResponse<IAppointment>> {
    const data = await this.appointmentService.findOne(id);
    return { success: true, message: 'ดึงข้อมูลการจองสำเร็จ', data };
  }

  @Post()
  @ApiOperation({ summary: 'สร้างการจองใหม่' })
  @SwaggerResponse({ status: 201, description: 'สร้างการจองใหม่สำเร็จ' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) // เพิ่ม { whitelist: true, forbidNonWhitelisted: true } เพื่อกรองข้อมูลที่ไม่ได้กำหนดใน DTO กันการโดน Over-Posting กับ Injection Flaws
  async create(@Body() createDto: CreateAppointmentDto): Promise<ApiResponse<IAppointment>> {
    const data = await this.appointmentService.create(createDto);
    return { success: true, message: 'สร้างการจองใหม่สำเร็จ', data };
  }

  @Put(':id')
  @ApiOperation({ summary: 'แทนที่ข้อมูลการจองทั้งก้อน (Replace)' })
  @ApiParam({ name: 'id', description: 'รหัสการจอง' })
  @SwaggerResponse({ status: 200, description: 'แทนที่ข้อมูลสำเร็จ' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) // เหตุผลเดียวกัน
  async replace(@Param('id') id: string, @Body() updateDto: CreateAppointmentDto): Promise<ApiResponse<IAppointment>> {
    const data = await this.appointmentService.update(id, updateDto, true);
    return { success: true, message: 'แทนที่ข้อมูลการจองสำเร็จ', data };
  } // ตรง updateDto: UpdateAppointmentDto รู้สึกว่าเปลี่ยนมาใช้ CreateAppointmentDto ดีกว่าเพราะ put คือการแทนที่ทั้งก้อน คือถ้าส่งมาไม่ครบ data เก่าก็จะหาย เลยคิดว่าบังคับรับข้อมูลเป็นแบบ Create เลยจะเซฟกว่า

  @Patch(':id')
  @ApiOperation({ summary: 'อัปเดตข้อมูลการจองบางส่วน (Partial Update)' })
  @ApiParam({ name: 'id', description: 'รหัสการจอง' })
  @SwaggerResponse({ status: 200, description: 'อัปเดตข้อมูลสำเร็จ' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) // เหมือนเดิม
  async update(@Param('id') id: string, @Body() updateDto: UpdateAppointmentDto): Promise<ApiResponse<IAppointment>> {
    const data = await this.appointmentService.update(id, updateDto, false);
    return { success: true, message: 'อัปเดตข้อมูลการจองสำเร็จ', data };
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'ยกเลิกการจอง' })
  @ApiParam({ name: 'id', description: 'รหัสการจอง' })
  @SwaggerResponse({ status: 200, description: 'ยกเลิกการจองสำเร็จ' })
  async remove(@Param('id') id: string): Promise<ApiResponse<null>> {
    await this.appointmentService.remove(id);
    return { success: true, message: 'ยกเลิกการจองสำเร็จ', data: null };
  }
}