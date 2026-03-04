import { Module } from '@nestjs/common';
import { ServiceController } from './service/service.controller';
import { ServiceService } from './service/service.service';

@Module({
  imports: [],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class AppModule {}
