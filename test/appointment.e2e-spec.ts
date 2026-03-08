import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { Response } from 'supertest';
import { AppModule } from './../src/app.module';

describe('Appointments API (e2e)', () => {
  let app: INestApplication;
  let testServiceId: string; 
  let createdApptId: string; 

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();

    const serviceRes = await request(app.getHttpServer())
      .post('/services')
      .send({
        name: 'บริการจำลองสำหรับเทสจองคิว',
        description: 'E2E Setup',
        durationMinutes: 30,
        price: 100,
        isActive: true,
        requiresAdvancePayment: false,
        maxCapacity: 5,
        category: 'OTHERS',
      });
    testServiceId = serviceRes.body.data.id;
  });

  afterAll(async () => {
    if (testServiceId) {
      await request(app.getHttpServer()).delete(`/services/${testServiceId}`);
    }
    await app.close();
  });
  
  it('/appointments (GET) - ควรดึงข้อมูลการจองทั้งหมดได้ (HTTP 200)', () => {
    return request(app.getHttpServer())
      .get('/appointments')
      .expect(200)
      .expect((res: Response) => { 
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
      });
  });

  it('/appointments/:id (GET) - ควรแจ้ง Error 404 ถ้าหา ID ไม่เจอ', () => {
    return request(app.getHttpServer())
      .get('/appointments/appt-999999')
      .expect(404);
  });

  it('/appointments (POST) - ควรแจ้ง Error 400 ถ้าจองคิวในอดีต', () => {
    return request(app.getHttpServer())
      .post('/appointments')
      .send({
        serviceId: testServiceId, 
        customerName: 'แอมแปร์',
        customerPhone: '0812345678',
        appointmentDate: '2020-01-01T10:00:00Z', 
        isFirstTimeCustomer: true
      })
      .expect(400);
  });

  it('/appointments (POST) - ควรสร้างการจองได้สำเร็จถ้าข้อมูลถูกต้อง (HTTP 201)', async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const res: Response = await request(app.getHttpServer())
      .post('/appointments')
      .send({
        serviceId: testServiceId, 
        customerName: 'ณัฐชยา',
        customerPhone: '0899999999',
        appointmentDate: tomorrow.toISOString(),
        isFirstTimeCustomer: true
      })
      .expect(201);

    createdApptId = res.body.data.id;
    expect(res.body.data.status).toBe('PENDING');
  });

  it('/appointments/:id (PATCH) - ควรเปลี่ยนสถานะการจองเป็น CONFIRMED', async () => {
    const res: Response = await request(app.getHttpServer())
      .patch(`/appointments/${createdApptId}`)
      .send({ status: 'CONFIRMED' })
      .expect(200);
    expect(res.body.data.status).toBe('CONFIRMED');
  });

  it('/appointments/:id (DELETE) - ควรยกเลิกการจองได้ (Cleanup)', async () => {
    await request(app.getHttpServer())
      .delete(`/appointments/${createdApptId}`)
      .expect(200);
  });
});