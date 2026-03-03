import { Controller, Get } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceEntity} from './entities/services-entity';

@Controller('service')
export class ServiceController {
    constructor(private readonly serviceService : ServiceService){
        @Get()
        findAll()
        
    }
}
