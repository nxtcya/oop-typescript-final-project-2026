import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common'; 
import request from 'supertest'; 
import { Response } from 'supertest'; 
import { AppModule } from './../src/app.module';

describe('Appointment Booking API (e2e)', () => {
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

  describe('Services Endpoints', () => {
    it('/services (GET) - ควรดึงข้อมูลบริการทั้งหมดได้ (HTTP 200)', () => {
      return request(app.getHttpServer())
        .get('/services')
        .expect(200)
        .expect((res: Response) => { 
          expect(res.body.success).toBe(true);
          expect(res.body.message).toBe('ดึงข้อมูลบริการสำเร็จ');
          expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    it('/services (POST) - ควรแจ้ง Error 400 ถ้าส่งข้อมูลไม่ครบถ้วน', () => {
      return request(app.getHttpServer())
        .post('/services')
        .send({
          name: 'บริการทดสอบ',
        })
        .expect(400)
        .expect((res: Response) => {
          expect(Array.isArray(res.body.message)).toBe(true);
        });
    });

    it('/services (POST) - ควรสร้างบริการใหม่ได้สำเร็จ (HTTP 201)', async () => {
      const res = await request(app.getHttpServer())
        .post('/services')
        .send({
          name: 'นวดแผนไทย E2E',
          description: 'เทสระบบ',
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

  describe('Appointments Endpoints', () => {
    it('/appointments (GET) - ควรดึงข้อมูลการจองทั้งหมดได้ (HTTP 200)', () => {
      return request(app.getHttpServer())
        .get('/appointments')
        .expect(200)
        .expect((res: Response) => { 
          expect(res.body.success).toBe(true);
          expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    it('/appointments/appt-999999 (GET) - ควรแจ้ง Error 404 ถ้าหา ID ไม่เจอ', () => {
      return request(app.getHttpServer())
        .get('/appointments/appt-999999')
        .expect(404)
        .expect((res: Response) => { 
          expect(res.body.message).toContain('ไม่พบข้อมูล');
        });
    });

    it('/appointments (POST) - ควรแจ้ง Error 400 ถ้าจองคิวในอดีต', () => {
      return request(app.getHttpServer())
        .post('/appointments')
        .send({
          serviceId: createdServiceId || 'svc-test',
          customerName: 'สมชาย',
          customerPhone: '0812345678',
          appointmentDate: '2020-01-01T10:00:00Z', 
          isFirstTimeCustomer: true
        })
        .expect(400)
        .expect((res: Response) => {
          expect(res.body.message).toContain('อดีต'); 
        });
    });

    it('/appointments (POST) - ควรสร้างการจองได้สำเร็จถ้าข้อมูลถูกต้อง (HTTP 201)', async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const res = await request(app.getHttpServer())
        .post('/appointments')
        .send({
          serviceId: createdServiceId, 
          customerName: 'สมหญิง',
          customerPhone: '0899999999',
          appointmentDate: tomorrow.toISOString(),
          isFirstTimeCustomer: true
        })
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('PENDING');
    });
  });
});
