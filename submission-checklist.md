# Submission Checklist ✅


## 👨‍💻 Team & Contributor
- [x] Repository ต้องสามารถเข้าถึงได้
- [x] สมาชิกทุกคนมี commit ใน repository
- [x] สมาชิกทุกคนต้องถูกระบุไว้ใน key `contributors` ภายในไฟล์ `package.json`

## Model Set Registration
- [x] บันทึกข้อมูล Model Set ไว้ในไฟล์ `package.json` ของโปรเจค
- [x] แต่ละ Model ต้องมี Attribute อย่างน้อย 10 รายการ
- [x] ทุก Model ต้องรองรับ CRUD Operation
- [x] ต้องมี Enum อย่างน้อย 1 จุดในระบบ
- [x] ห้ามใช้ `any` type ในทุกกรณี
- [x] ต้องกำหนด interface แบบ narrow type สำหรับ request และ response

## Repository Structure
- [x] เอกสารทั้งหมดต้องอยู่ในโฟลเดอร์:
```text
docs/
```
+ ### Documentation
   - [x] Swagger API Specification
   - [x] Data Model Documentation
   - [x] UML Diagram

## README.md Requirement
ไฟล์ `README.md` ต้องประกอบด้วย:
- [x] Project Overview
- [x] Technology Stack
- [x] วิธีการติดตั้งและรันโปรเจค
- [x] โครงสร้างโปรเจคโดยสรุป
- [x] ลิงก์ไปยังเอกสารในโฟลเดอร์ docs/

## API Design Requirement
- [x] ทุก Model ต้องรองรับ CRUD Operation
- [x] ทุก API ต้องมีการ validate ข้อมูล
- [x] ใช้ HTTP Status Code ที่เหมาะสม (200, 201, 400, 404)
  
+ ## Service API
  - [x] GET /services
  - [x] GET /services/{id}
  - [x] POST /services
  - [x] PUT /services/{id}
  - [x] PATCH /services/{id}
  - [x] DELETE /services/{id}

+ ## Appointment API
  - [x] GET /appointments
  - [x] GET /appointments/{id}
  - [x] POST /appointments
  - [x] PUT /appointments/{id}
  - [x] PATCH /appointments/{id}
  - [x] DELETE /appointments/{id}