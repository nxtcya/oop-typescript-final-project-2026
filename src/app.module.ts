import { Module } from '@nestjs/common';
import { ServiceController } from './service/service.controller';
import { ServiceService } from './service/service.service';
import { AppointmentController } from './appointment/appointment.controller';
import { AppointmentService } from './appointment/appointment.service';

@Module({
  imports: [],
  controllers: [ServiceController, AppointmentController],
  providers: [ServiceService, AppointmentService],
})
export class AppModule {}
