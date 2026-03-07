# NestJS Backend API — Appointment Booking System 

## 📌 Project Overview
โปรเจคนี้เป็น REST API สำหรับระบบ **Appointment Booking System ที่ถูกพัฒนาด้วย NestJS และ TypeScript**

---
**Repository:** [https://github.com/nxtcya/oop-typescript-final-project-2026.git](https://github.com/nxtcya/oop-typescript-final-project-2026.git)


ระบบนี้ใช้สำหรับจัดการข้อมูลบริการ (Service) และการนัดหมาย (Appointment) เช่น

>+ การสร้างบริการใหม่
>+ การดูรายการบริการ
>+ การจองนัดหมาย
>+ การอัปเดตสถานะการนัดหมาย
>+ การลบข้อมูลนัดหมาย

API ถูกออกแบบตามหลัก RESTful API และใช้ Standard Response Format เพื่อให้การสื่อสารระหว่าง Client และ Server มีรูปแบบเดียวกัน


---


## 🛠 Technology Stack

* **Framework:** NestJS
* **Language:** TypeScript
* **API Style:** REST API
* **Database:** JSON-based (file-based หรือ in-memory)
* **API Documentation:** Swagger (OpenAPI)
* **Linting:** ESLint (TypeScript ESLint)

---

## 📁 Project Structure

```text
.
├── README.md
├── annoucement.txt
├── data
│   ├── appointment.json
│   └── service.json
|
├── docs
│   ├── api-specification.md
│   ├── data-model.md
│   ├── swagger.json
│   ├── uml-diagram.png
│   └── uml-diagram.puml
|
├── nest-cli.json
├── package-lock.json
├── package.json
├── src
│   ├── app.module.ts
│   ├── app.spec.ts
│   ├── appointment
│   │   ├── appointment.controller.ts
│   │   ├── appointment.service.ts
│   │   └── dto
|   |   
│   ├── main.ts
│   ├── models
│   │   ├── api-response.interface.ts
│   │   ├── appointment-status.enum.ts
│   │   ├── appointment.interface.ts
│   │   ├── service-category.enum.ts
│   │   └── service.interface.ts
|   |
│   └── service
│       ├── dto
│       ├── service.controller.ts
│       └── service.service.ts
|
├── subjects
│   ├── evaluation.md
│   ├── models.md
│   ├── requirement.md
│   └── submission.md
|
├── submission-checklist.md
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
└── tsconfig.json
```


---

## 🚀 Getting Started

**ก่อนรันโปรเจค จำเป็นต้องติดตั้ง**

+ **Node.js** 

+ **npm**

**ตรวจสอบเวอร์ชันได้ด้วยคำสั่ง**
```
node -v
npm -v
```
### 1. Clone Project
```
git clone https://github.com/nxtcya/oop-typescript-final-project-2026.git
```
```
cd oop-typescript-final-project-2026
```
###  2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run start:dev
```

### 4. API Documentation (Swagger)

เมื่อรันโปรเจคแล้ว สามารถเข้าดู Swagger ได้ที่:

```text
http://localhost:3000/api
```
**Swagger** จะช่วยให้สามารถ :

+ ดูรายละเอียด API
+ ทดลองยิง API ได้ทันที
+ Request / Response schema
+ ดู API documentation แบบ interactive
---

## 📊 Data Models

### ระบบนี้มี 2 Core Models
+ **service** - บริการ
+ **Appointment** - การนัดหมาย

### 1️⃣ Service
---

ใช้เก็บข้อมูลบริการที่ลูกค้าสามารถจองได้

Field|Description|
|----|-----------|
`id`| 	รหัสบริการ
`name` | ชื่อบริการ
`description` |	รายละเอียดของบริการ
`durationMinutes`| ระยะเวลาของบริการ (นาที)
`price` |  ราคาของบริการ 
`isActive`| สถานะว่าบริการเปิดใช้งานหรือไม่
`requiresAdvancePayment`| บริการนี้ต้องชำระเงินล่วงหน้าหรือไม่
`maxCapacity`|จำนวนลูกค้าสูงสุดที่สามารถรับได้ต่อช่วงเวลา
`category` | ประเภทของบริการ 
`createdAt`|  วันที่และเวลาที่สร้างข้อมูลบริการ (ISO Date)
`updatedAt` |  วันที่และเวลาที่มีการแก้ไขข้อมูลล่าสุด (ISO Date)
`category`  ของประเภทบริการ ถูกกำหนดด้วย Enum

**ServiceCategory**

Value| Description |
|------|--------|
`HAIR_CARE` |บริการเกี่ยวกับเส้นผม
`SKIN_CARE` |บริการดูแลผิวหน้า
`MASSAGE` |บริการนวด
`CONSULTATION `|บริการให้คำปรึกษา

### 2️⃣ Appointment
---

ใช้เก็บข้อมูลการจองบริการของลูกค้า

Field |	Description
|-----|----------|
|`id`| รหัสการจอง
|`serviceId` |	รหัสบริการที่ลูกค้าเลือก
|`customerName`|  ชื่อลูกค้า
|`customerPhone` |  เบอร์โทรศัพท์ของลูกค้า
|`appointmentDate`|วันและเวลาที่จอง
|`status` |  สถานะของการจอง
|`notes?`| 	 หมายเหตุเพิ่มเติม
|`isFirstTimeCustomer`| ลูกค้าเป็นลูกค้าใหม่หรือไม่
|`isReminderSent`|  มีการส่งการแจ้งเตือนการจองแล้วหรือยัง
|`createdAt`|วันที่และเวลาที่สร้างข้อมูลการจอง (ISO Date)
|`updatedAt`|วันที่และเวลาที่มีการแก้ไขข้อมูลล่าสุด (ISO Date)


`status` ของการนัดหมายถูกกำหนดด้วย Enum

**AppointmentStatus**
Status | Description |
|------|--------|
|`PENDING`	| การจองถูกสร้างและกำลังรอการยืนยัน
|`CONFIRMED` |	การจองได้รับการยืนยันแล้ว
|`COMPLETED` |	การให้บริการเสร็จสิ้นแล้ว
|`CANCELLED` |	การจองถูกยกเลิก
---
## 🔌 API Endpoints



**Service API**
+ GET /services
+ GET /services/{id}
+ POST /services
+ PUT /services/{id}
+ PATCH /services/{id}
+ DELETE /services/{id}

**Appointment API**
+ GET /appointments
+ GET /appointments/{id}
+ POST /appointments
+ PUT /appointments/{id}
+ PATCH /appointments/{id}
+ DELETE /appointments/{id}
---

## 📦 API Response Format

ตัวอย่าง Response มาตรฐานของระบบ
```json
{
    "success": true,
    "message": "ดึงข้อมูลบริการสำเร็จ",
    "data": {
        "id": "svc-skin-03",
        "name": "มาร์กหน้าทองคำบริสุทธิ์ 24K",
        "description": "ฟื้นฟูผิวอย่างเร่งด่วนด้วยทองคำบริสุทธิ์ ลดเลือนริ้วรอย",
        "durationMinutes": 45,
        "price": 900,
        "isActive": true,
        "requiresAdvancePayment": false,
        "maxCapacity": 2,
        "category": "SKIN_CARE",
        "createdAt": "2026-02-20T13:00:00Z",
        "updatedAt": "2026-02-20T13:00:00Z"
    }
}

```
## ⚠️ Error Handling

ตัวอย่าง Error Response
```json
{
    "message": "ไม่พบบริการรหัส svc-skin-00",
    "error": "Not Found",
    "statusCode": 404
}
```
**HTTP Status Code :**
+ `200`  OK
+ `201`  Created
+ `400`  Bad Request
+ `404`  Not Found
+ `500`  Internal Server Error

## 📄 Documentation
---
เอกสารของระบบถูกเก็บไว้ในโฟลเดอร์ docs/

**docs :** [https://github.com/nxtcya/oop-typescript-final-project-2026/tree/main/docs](https://github.com/nxtcya/oop-typescript-final-project-2026/tree/main/docs)

**ประกอบด้วย :**

- **API Specification**
[docs/api-specification.md](https://github.com/nxtcya/oop-typescript-final-project-2026/blob/main/docs/api-specification.md)

- **Data Model Documentation**
[docs/data-model.md](https://github.com/nxtcya/oop-typescript-final-project-2026/blob/main/docs/data-model.md)

- **UML Diagram**
[docs/uml-diagram.png](https://github.com/nxtcya/oop-typescript-final-project-2026/blob/main/docs/uml-diagram.png)

---
## 👨‍💻 Contributors
StudentId| Name |
|---|-----|
| 68010147 | จิรพัชร ดิษยบุตร
| 68010331 | ณัฐชยา ทับโนนทอง 
| 68010608 | นิธิมา สุเนตร 
