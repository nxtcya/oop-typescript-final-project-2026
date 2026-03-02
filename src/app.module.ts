import { Module } from '@nestjs/common';
import { ServiceModule } from './modules/service/service.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { ServiceModule } from './modules/service/service.module';

@Module({
  imports: [ServiceModule, AppointmentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
