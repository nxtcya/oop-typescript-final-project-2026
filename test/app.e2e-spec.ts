import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common'; 
import request from 'supertest'; 
import { Response } from 'supertest'; 
import { AppModule } from './../src/app.module';

describe('Appointment Booking API (e2e) - Full Coverage', () => {
  let app: INestApplication;
  let createdServiceId: string;
  let createdApptId: string;
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const testDateIso = tomorrow.toISOString();

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
          expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    it('/services (POST) - ควรแจ้ง Error 400 ถ้าส่งข้อมูลไม่ครบถ้วน', () => {
      return request(app.getHttpServer())
        .post('/services')
        .send({ name: 'บริการทดสอบ' })
        .expect(400);
    });

    it('/services (POST) - ควรสร้างบริการใหม่ได้สำเร็จ (HTTP 201)', async () => {
      const res: Response = await request(app.getHttpServer())
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
      
      createdServiceId = res.body.data.id;
      expect(createdServiceId).toBeDefined();
    });

    it('/services/:id (GET) - ควรดึงข้อมูลบริการตาม ID ได้ถูกต้อง', async () => {
      const res: Response = await request(app.getHttpServer())
        .get(`/services/${createdServiceId}`)
        .expect(200);
      expect(res.body.data.id).toBe(createdServiceId);
    });

    it('/services/:id (PATCH) - ควรแก้ไขข้อมูลบางส่วนได้', async () => {
      const res: Response = await request(app.getHttpServer())
        .patch(`/services/${createdServiceId}`)
        .send({ price: 999 })
        .expect(200);
      expect(res.body.data.price).toBe(999);
    });

    it('/services/:id (PUT) - ควรแทนที่ข้อมูลทั้งหมดได้', async () => {
      await request(app.getHttpServer())
        .put(`/services/${createdServiceId}`)
        .send({
          name: 'นวดอโรม่าแบบใหม่',
          description: 'ปรับปรุงข้อมูล',
          durationMinutes: 90,
          price: 1200,
          isActive: true,
          requiresAdvancePayment: true,
          maxCapacity: 1, 
          category: 'MASSAGE'
        })
        .expect(200);
    });
  });

  describe('Appointments Endpoints', () => {
    it('/appointments (GET) - ควรดึงข้อมูลการจองทั้งหมดได้ (HTTP 200)', () => {
      return request(app.getHttpServer())
        .get('/appointments')
        .expect(200)
        .expect((res: Response) => { 
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
          serviceId: createdServiceId,
          customerName: 'แอมแปร์',
          customerPhone: '0812345678',
          appointmentDate: '2020-01-01T10:00:00Z', 
          isFirstTimeCustomer: true
        })
        .expect(400);
    });

    it('/appointments (POST) - ควรสร้างการจองได้สำเร็จถ้าข้อมูลถูกต้อง (HTTP 201)', async () => {
      const res: Response = await request(app.getHttpServer())
        .post('/appointments')
        .send({
          serviceId: createdServiceId, 
          customerName: 'ณัฐชยา',
          customerPhone: '0899999999',
          appointmentDate: testDateIso, 
          isFirstTimeCustomer: true
        })
        .expect(201);

      createdApptId = res.body.data.id;
      expect(res.body.data.status).toBe('PENDING');
    });

    it('/appointments/:id (GET) - ควรดึงข้อมูลการจองตาม ID ได้', async () => {
      const res: Response = await request(app.getHttpServer())
        .get(`/appointments/${createdApptId}`)
        .expect(200);
      expect(res.body.data.customerName).toBe('ณัฐชยา');
    });

    it('/appointments/:id (PUT) - ควรแทนที่ข้อมูลการจองได้ (เปลี่ยนชื่อ)', async () => {
      const updateDate = new Date();
      updateDate.setDate(updateDate.getDate() + 2);

      const res: Response = await request(app.getHttpServer())
        .put(`/appointments/${createdApptId}`)
        .send({
          serviceId: createdServiceId,
          customerName: 'ณัฐชยา (เปลี่ยนชื่อ)',
          customerPhone: '0899999999',
          appointmentDate: testDateIso,
          isFirstTimeCustomer: false 
        })
        .expect(200); 
        
      expect(res.body.data.customerName).toContain('เปลี่ยนชื่อ');
    });

    it('/appointments/:id (PATCH) - ควรเปลี่ยนสถานะการจองเป็น CONFIRMED', async () => {
      const res: Response = await request(app.getHttpServer())
        .patch(`/appointments/${createdApptId}`)
        .send({ status: 'CONFIRMED' })
        .expect(200);
      expect(res.body.data.status).toBe('CONFIRMED');
    });
  });

  describe('Business Logic & Edge Cases', () => {
    it('ควรแจ้ง Error 400 ถ้าจองคิวซ้อนทับจนคิวเต็ม (Capacity Full)', async () => {
      await request(app.getHttpServer())
        .post('/appointments')
        .send({
          serviceId: createdServiceId,
          customerName: 'คนที่สอง พยายามแย่งคิว',
          customerPhone: '0811112222',
          appointmentDate: testDateIso, 
          isFirstTimeCustomer: true
        })
        .expect(400); 
    });

    it('ควรแจ้ง Error 400 ถ้าจองบริการที่ปิดใช้งานอยู่ (Inactive)', async () => {
      await request(app.getHttpServer()).patch(`/services/${createdServiceId}`).send({ isActive: false });
      
      await request(app.getHttpServer())
        .post('/appointments')
        .send({
          serviceId: createdServiceId,
          customerName: 'พยายามจองตอนร้านปิด',
          customerPhone: '0811112222',
          appointmentDate: testDateIso,
          isFirstTimeCustomer: true
        })
        .expect(400);
      
      await request(app.getHttpServer()).patch(`/services/${createdServiceId}`).send({ isActive: true });
    });

    it('ควรแจ้ง Error 400 หากพยายามลบบริการ (Service) ที่ยังมีคิวจองค้างอยู่', async () => {
      await request(app.getHttpServer())
        .delete(`/services/${createdServiceId}`)
        .expect(400); 
    });
  });

  describe('Cleanup Phase (DELETE)', () => {
    it('ควรลบการจองที่สร้างขึ้นมาเทสได้ (ต้องทำก่อน)', async () => {
      await request(app.getHttpServer())
        .delete(`/appointments/${createdApptId}`)
        .expect(200);
    });

    it('เมื่อไม่มีคิวค้างแล้ว ควรจะลบบริการทิ้งได้', async () => {
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