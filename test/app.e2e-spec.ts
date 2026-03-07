import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common'; // 1. เพิ่ม ValidationPipe ตรงนี้
import request from 'supertest'; // 2. แก้ไขการ import supertest
import { Response } from 'supertest'; // 3. นำเข้า Type Response เพื่อเอาไปใช้แก้ปัญหา any
import { AppModule } from './../src/app.module';

describe('Appointment Booking API (e2e)', () => {
  let app: INestApplication;

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
  });
});
