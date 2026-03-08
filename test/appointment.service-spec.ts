import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentService } from '../src/appointment/appointment.service';
import { ServiceService } from '../src/service/service.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import * as fs from 'fs/promises';
import { AppointmentStatus } from '../src/models/appointment-status.enum';
import { IService } from '../src/models/service.interface';
import { IAppointment } from '../src/models/appointment.interface';

jest.mock('fs/promises');

describe('AppointmentService', () => {
  let appointmentService: AppointmentService;
  let serviceService: ServiceService;

  const mockActiveService: Partial<IService> = {
    id: 'svc-active',
    name: 'นวดแผนไทย',
    isActive: true,
    maxCapacity: 2,
  };

  const mockInactiveService: Partial<IService> = {
    id: 'svc-inactive',
    isActive: false,
  };

  const mockAppointments: Partial<IAppointment>[] = [
    {
      id: 'appt-1',
      serviceId: 'svc-active',
      appointmentDate: '2030-01-01T10:00:00.000Z',
      status: AppointmentStatus.CONFIRMED,
    }
  ];

  beforeEach(async () => {
    const mockServiceService = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentService,
        {
          provide: ServiceService,
          useValue: mockServiceService,
        },
      ],
    }).compile();

    appointmentService = module.get<AppointmentService>(AppointmentService);
    serviceService = module.get<ServiceService>(ServiceService);
    jest.clearAllMocks();
  });

  describe('create()', () => {
    it('ควรแจ้ง Error ถ้าบริการนั้นปิดให้บริการอยู่', async () => {
      jest.spyOn(serviceService, 'findOne').mockResolvedValue(mockInactiveService as IService);

      const dto = {
        serviceId: 'svc-inactive',
        customerName: 'ลูกค้า',
        customerPhone: '0811111111',
        appointmentDate: '2030-01-01T10:00:00Z',
        isFirstTimeCustomer: true,
      };

      await expect(appointmentService.create(dto)).rejects.toThrow(BadRequestException);
    });

    it('ควรแจ้ง Error ถ้าคิวเต็ม (Capacity Check)', async () => {
      jest.spyOn(serviceService, 'findOne').mockResolvedValue(mockActiveService as IService);
      
      const fullAppointments: Partial<IAppointment>[] = [
        { serviceId: 'svc-active', appointmentDate: '2030-01-01T10:00:00.000Z', status: AppointmentStatus.CONFIRMED },
        { serviceId: 'svc-active', appointmentDate: '2030-01-01T10:00:00.000Z', status: AppointmentStatus.PENDING }
      ];
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(fullAppointments));

      const dto = {
        serviceId: 'svc-active',
        customerName: 'คนที่สาม',
        customerPhone: '0833333333',
        appointmentDate: '2030-01-01T10:00:00.000Z',
        isFirstTimeCustomer: true,
      };

      await expect(appointmentService.create(dto)).rejects.toThrow(BadRequestException);
    });
  });
});