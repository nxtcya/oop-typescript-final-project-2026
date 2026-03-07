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
│   │       ├── create-appointment.dto.ts
│   │       └── update-appointment.dto.ts
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
│       │   ├── create-service.dto.ts
│       │   └── update-service.dto.ts
|       |
│       ├── service.controller.ts
│       └── service.service.ts
|
├── subjects
│   ├── evaluation.md
│   ├── models.md
│   ├── requirement.md
│   └── submission.md
|
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
|
└── tsconfig.json
```


---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run start:dev
```

### 3. API Documentation (Swagger)

เมื่อรันโปรเจคแล้ว สามารถเข้าดู Swagger ได้ที่:

```text
http://localhost:3000/api
```

---

## 📊 Data Models

ระบบนี้มี 2 Core Models

### 1. Service
---
ใช้เก็บข้อมูลบริการที่สามารถจองได้

**ตัวอย่างข้อมูล :**


>+ id
>+ name
>+ description
>+ durationMinutes
>+ price
>+ isActive

---


### 2. Appointment
---

ใช้เก็บข้อมูลการจองนัดหมาย

**ตัวอย่างข้อมูล :**

>+  id
>+ serviceId
>+ customerName
>+ appointmentDate
>+ status

`status` ของการนัดหมายถูกกำหนดด้วย Enum

**AppointmentStatus**
>- PENDING
>- CONFIRMED
>- CANCELLED
>- COMPLETED
---
### 🔌 API Endpoints
---

ตัวอย่าง Endpoint หลักของระบบ

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

### 📄 Documentation
---
เอกสารของระบบถูกเก็บไว้ในโฟลเดอร์ docs/

**docs :** [https://github.com/nxtcya/oop-typescript-final-project-2026/tree/main/docs](https://github.com/nxtcya/oop-typescript-final-project-2026/tree/main/docs)

- **API Specification**
[docs/api-specification.md](https://github.com/nxtcya/oop-typescript-final-project-2026/blob/main/docs/api-specification.md)

- **Data Model Documentation**
[docs/data-model.md](https://github.com/nxtcya/oop-typescript-final-project-2026/blob/main/docs/data-model.md)

- **UML Diagram**
[docs/uml-diagram.png](https://github.com/nxtcya/oop-typescript-final-project-2026/blob/main/docs/uml-diagram.png)

