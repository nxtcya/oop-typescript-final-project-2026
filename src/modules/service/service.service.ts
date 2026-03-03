import { BadRequestException, Injectable , NotFoundException} from '@nestjs/common';
import { ServiceEntity } from './entities/services-entity';
import * as fs from 'fs';
import * as  path from 'path';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PatchServiceDto } from './dto/patch-services.dto';
import { serviceStatus } from './enums/sevice-status.enum';



@Injectable()
export class ServiceService {
    private readonly filePath = path.join(
        process.cwd(),
        'src',
        'modules',
        'service',
        'data',
        'service-data.json'
    )

    private readData() : ServiceEntity[] {
        const data = fs.readFileSync(this.filePath,'utf-8')
        const parsed = JSON.parse(data) as ServiceEntity[]

        return parsed.map(i => ({
            ...i,
            createdAt : new Date(i.createdAt),
            updatedAt : new Date(i.updatedAt)
        }))
    }

    private writeData(serviceEntity : ServiceEntity[]) : void {
        fs.writeFileSync(this.filePath,JSON.stringify(serviceEntity,null,2));
    } 

    findAll() : ServiceEntity[]{
        return this.readData();
    }

    findOne(id:number) : ServiceEntity{
        const services = this.readData();
        const service = services.find((i) => i.id === id)
        if(!service){
            throw new NotFoundException(`Service with ID ${id} not found`);
        }

        return service;

    }

    create(createService : CreateServiceDto) : ServiceEntity {
        const services = this.readData();
        const isDuplicate = services.some((s) => s.code === createService.code);
        if(isDuplicate){
            throw new BadRequestException(`Service code '${createService.code}' already exists`);
        }
        const newId = services.length === 0 ? 1 : services[services.length -1].id + 1;

        const newService : ServiceEntity = {
            id : newId,
            code : createService.code,
            name : createService.name,
            description : createService.description,
            durationMinutes : createService.durationMinutes,
            minAdvanceBooking : createService.minAdvanceBooking,
            price : createService.price,
            currency : createService.currency,
            status: createService.status ?? serviceStatus.ACTIVE,
            maxBookingsPerSlot : createService.maxBookingsPerSlot,
            allowWalkIn : createService.allowWalkIn,
            createdAt : new Date(),
            updatedAt : new Date(),
        }

        services.push(newService);
        this.writeData(services);

        return newService;
    }

    update(id:number,newupdate : UpdateServiceDto) : ServiceEntity {
        const services = this.readData();
        const index = services.findIndex((i) => i.id === id);

        if(index === -1){
            throw new NotFoundException(`Service with ID ${id} not found`);
        }

        services[index] = {
            ...services[index],
            ...newupdate,
            updatedAt : new Date()
        }
        
        this.writeData(services)

        return services[index]
    }

    patch(id:number,patchService : PatchServiceDto) : ServiceEntity{
        const services = this.readData();
        const newService = services.find((i)=> i.id === id);
        
        if(!newService){
            throw new NotFoundException(`Service with ID ${id} not found`);
        }

        Object.assign(newService,patchService,{ updatedAt: new Date() })
        this.writeData(services);

        return newService

    }

    delete(id:number):void{
        const services = this.readData();
        const remianingService = services.filter((i)=> i.id !== id);
            if(services.length === remianingService.length){
                throw new NotFoundException(`Service with ID ${id} not found`);
            }
        this.writeData(remianingService);
        
    }
        
    }


