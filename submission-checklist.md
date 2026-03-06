# Submission Checklist ✅❌


## Team & Contributor
- [ ] Repository ต้องสามารถเข้าถึงได้
- [x] สมาชิกทุกคนมี commit ใน repository
- [ ] สมาชิกทุกคนต้องถูกระบุไว้ใน key `contributors` ภายในไฟล์ `package.json`

## Model Set Registration
- [ ] บันทึกข้อมูล Model Set ไว้ในไฟล์ `package.json` ของโปรเจค
- [ ] แต่ละ Model ต้องมี Attribute อย่างน้อย 10 รายการ
- [ ] ทุก Model ต้องรองรับ CRUD Operation
- [ ] ต้องมี Enum อย่างน้อย 1 จุดในระบบ
- [ ] ห้ามใช้ `any` type ในทุกกรณี
- [ ] ต้องกำหนด interface แบบ narrow type สำหรับ request และ response

## Repository Structure
- [ ] เอกสารทั้งหมดต้องอยู่ในโฟลเดอร์:
```text
docs/
```
+ ### Documentation
   - [ ] Swagger API Specification
   - [ ] Data Model Documentation
   - [ ] UML Diagram

## README.md Requirement
ไฟล์ `README.md` ต้องประกอบด้วย:
- [ ] Project Overview
- [ ] Technology Stack
- [ ] วิธีการติดตั้งและรันโปรเจค
- [ ] โครงสร้างโปรเจคโดยสรุป
- [ ] ลิงก์ไปยังเอกสารในโฟลเดอร์ docs/

## API Design Requirement
- [ ] ทุก Model ต้องรองรับ CRUD Operation
- [ ] ทุก API ต้องมีการ validate ข้อมูล
- [ ] ใช้ HTTP Status Code ที่เหมาะสม (200, 201, 403, 404)
  
+ ## Service API
  - [ ] GET /services
  - [ ] GET /services/{id}
  - [ ] POST /services
  - [ ] PUT /services/{id}
  - [ ] PATCH /services/{id}
  - [ ] DELETE /services/{id}

+ ## Appointment API
  - [ ] GET /appointments
  - [ ] GET /appointments/{id}
  - [ ] POST /appointments
  - [ ] PUT /appointments/{id}
  - [ ] PATCH /appointments/{id}
  - [ ] DELETE /appointments/{id}