import { Test, TestingModule } from '@nestjs/testing';
import { ServiceService } from './service.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import * as fs from 'fs/promises';
import { ServiceCategory } from '../models/service-category.enum';
jest.mock('fs/promises');


describe('ServiceService', () => {
  let service: ServiceService;

    const mockServices = [
    {
      id: 'svc-123',
      name: 'นวดแผนไทย',
      description: 'นวด 60 นาที',
      durationMinutes: 60,
      price: 500,
      isActive: true,
      requiresAdvancePayment: false,
      maxCapacity: 2,
      category: ServiceCategory.MASSAGE,
      createdAt: '2026-01-01T10:00:00.000Z',
      updatedAt: '2026-01-01T10:00:00.000Z',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceService],
    }).compile();

    service = module.get<ServiceService>(ServiceService);

    jest.clearAllMocks();
  });

  it('ควรถูกสร้างขึ้นมา (should be defined)', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('ควรคืนค่า array ของบริการทั้งหมด', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockServices));
      (fs.access as jest.Mock).mockResolvedValue(undefined); 

      const result = await service.findAll();
      expect(result).toEqual(mockServices);
      expect(fs.readFile).toHaveBeenCalledTimes(1); 
    });

    it('ควรคืนค่า array ว่างเปล่า ถ้าอ่านไฟล์แล้วเจอ Error (เช่น ไฟล์เสีย)', async () => {
      (fs.readFile as jest.Mock).mockRejectedValue(new Error('File not found'));

      const result = await service.findAll();
      expect(result).toEqual([]); 
    });
  });

  describe('findOne()', () => {
    it('ควรคืนค่าข้อมูลบริการ 1 รายการ เมื่อค้นหาด้วย ID ที่ถูกต้อง', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockServices));

      const result = await service.findOne('svc-123');
      expect(result).toEqual(mockServices[0]);
    });

    it('ควรแจ้ง Error (NotFoundException) เมื่อค้นหาด้วย ID ที่ไม่มีอยู่จริง', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockServices));

      await expect(service.findOne('svc-999')).rejects.toThrow(NotFoundException);
      await expect(service.findOne('svc-999')).rejects.toThrow('ไม่พบบริการรหัส svc-999');
    });
  });

  describe('create()', () => {
    it('ควรสร้างบริการใหม่และเซฟลงไฟล์ได้สำเร็จ', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify([]));
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined); 

      const createDto = {
        name: 'สปาหน้า',
        description: 'ทำความสะอาดล้ำลึก',
        durationMinutes: 45,
        price: 800,
        isActive: true,
        requiresAdvancePayment: false,
        maxCapacity: 1,
        category: ServiceCategory.SKIN_CARE,
      };

      const result = await service.create(createDto);

      expect(result.id).toContain('svc-'); 
      expect(result.name).toEqual('สปาหน้า');
      expect(fs.writeFile).toHaveBeenCalledTimes(1);     
    });
  });
});