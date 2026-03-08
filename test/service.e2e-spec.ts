import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { Response } from 'supertest';
import { AppModule } from './../src/app.module';

describe('Services API (e2e)', () => {
  let app: INestApplication;
  let createdServiceId: string; 

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /services', () => {
    it('ควรดึงข้อมูลบริการทั้งหมดได้ (HTTP 200)', () => {
      return request(app.getHttpServer())
        .get('/services')
        .expect(200)
        .expect((res: Response) => {
          expect(res.body.success).toBe(true);
          expect(res.body.message).toBe('ดึงข้อมูลบริการสำเร็จ');
          expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    it('ควรแจ้ง Error 404 ถ้าหา ID บริการไม่เจอ', () => {
      return request(app.getHttpServer())
        .get('/services/svc-not-found-123')
        .expect(404)
        .expect((res: Response) => {
          expect(res.body.message).toContain('ไม่พบบริการ');
        });
    });
  });

  describe('POST /services', () => {
    it('ควรแจ้ง Error 400 ถ้าส่งข้อมูลไม่ครบถ้วน', () => {
      return request(app.getHttpServer())
        .post('/services')
        .send({ name: 'บริการทดสอบที่ข้อมูลไม่ครบ' })
        .expect(400)
        .expect((res: Response) => {
          expect(Array.isArray(res.body.message)).toBe(true);
        });
    });

    it('ควรสร้างบริการใหม่ได้สำเร็จ (HTTP 201)', async () => {
      const res: Response = await request(app.getHttpServer())
        .post('/services')
        .send({
          name: 'นวดแผนไทย E2E (Service Test)',
          description: 'ทดสอบระบบแยกไฟล์',
          durationMinutes: 60,
          price: 500,
          isActive: true,
          requiresAdvancePayment: false,
          maxCapacity: 2,
          category: 'MASSAGE' 
        })
        .expect(201); 
      
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBeDefined();
      
      createdServiceId = res.body.data.id; 
    });
  });

  describe('PATCH & PUT /services/:id', () => {
    it('ควรแก้ไขข้อมูลบริการบางส่วนได้ (PATCH)', async () => {
      const res: Response = await request(app.getHttpServer())
        .patch(`/services/${createdServiceId}`)
        .send({ price: 999 })
        .expect(200);
      
      expect(res.body.data.price).toBe(999);
    });

    it('ควรแทนที่ข้อมูลบริการทั้งหมดได้ (PUT)', async () => {
      const res: Response = await request(app.getHttpServer())
        .put(`/services/${createdServiceId}`)
        .send({
          name: 'บริการอัปเดตใหม่ทั้งหมด (PUT)',
          description: 'ปรับปรุงข้อมูลผ่าน E2E',
          durationMinutes: 90,
          price: 1500,
          isActive: true,
          requiresAdvancePayment: true,
          maxCapacity: 5,
          category: 'MASSAGE'
        })
        .expect(200);

      expect(res.body.data.name).toBe('บริการอัปเดตใหม่ทั้งหมด (PUT)');
      expect(res.body.data.price).toBe(1500);
    });
  });

  describe('DELETE /services/:id (Cleanup Phase)', () => {
    it('ควรลบบริการที่สร้างขึ้นมาเทสได้', async () => {
      await request(app.getHttpServer())
        .delete(`/services/${createdServiceId}`)
        .expect(200);
    });

    it('ยืนยันว่าลบไปแล้วจริงๆ (GET ต้องได้ 404)', async () => {
      await request(app.getHttpServer())
        .get(`/services/${createdServiceId}`)
        .expect(404);
    });
  });
});