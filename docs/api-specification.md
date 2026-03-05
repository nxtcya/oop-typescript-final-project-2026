# Swagger API Specification

## ระบบ Appointment Booking System


**Base URL :** http://localhost:3000

**Service List :** http://localhost:3000/services

**Appointment List :** http://localhost:3000/appointments




## Service API
ใช้สำหรับจัดการข้อมูลบริการ



### 1.1 Get All Services

**Endpoint** `GET /services`

**Description :** ดึงข้อมูลบริการทั้งหมดในระบบ

**Response Example :**
```json

{
  "success": true,
  "message": "ดึงข้อมูลบริการสำเร็จ",
  "data": [
    {
      "id": "S1741023456789",
      "name": "Hair Cut",
      "description": "บริการตัดผม",
      "durationMinutes": 30,
      "price": 200
    }
  ]
}

```

---

### 1.2 Get Service by ID

**Endpoint :** `GET /services/{id}`

**Description :** ดึงข้อมูลบริการ 1 รายการตาม ID

**Response Example :**
```json
GET /services/S1741023456789
```
```json

{
  "success": true,
  "message": "ดึงข้อมูลบริการสำเร็จ",
  "data": [
    {
      "id": "S1741023456789",
      "name": "Hair Cut",
      "description": "บริการตัดผม",
      "durationMinutes": 30,
      "price": 200
    }
  ]
}

```
**Error Example :**
```json
{
  "success": false,
  "message": "ไม่พบบริการนี้",
  "data": null
}
```
---

### 1.3 Create Service

**Endpoint :** `POST /services`

**Description :** สร้าง/เพิ่ม ข้อมูลบริการใหม่


**Request Body Example :**
```json
{
  "name": "Hair Coloring",
  "description": "บริการทำสีผม",
  "durationMinutes": 60,
  "price": 500
}
```

**Response Example :**
```json
{
  "success": true,
  "message": "สร้างบริการใหม่สำเร็จ",
  "data": [
    {
    "id": "S1741029999999",
    "name": "Hair Coloring",
    "description": "บริการทำสีผม",
    "durationMinutes": 60,
    "price": 500
    }
  ]
}
```
---
### 1.4 Replace Service

**Endpoint :** `PUT /services/{id}`

**Description :** ใช้แทนที่ข้อมูลบริการทั้งหมด ของ ID นั้น

---

### 1.5 Update Service

**Endpoint :** `PATCH /services/{id}`

**Description :** ใช้แก้ไขข้อมูลบางฟิลด์

---

### 1.6 Delete Service

**Endpoint :** `DELETE /services/{id}`

**Description :** ลบข้อมูลบริการ

**Response Example :**
```json
{
  "success": true,
  "message": "ลบข้อมูลบริการสำเร็จ",
  "data": null
}
```

---


## Appointment API

ใช้สำหรับจัดการข้อมูลการจอง


### 2.1 Get All Appointments

**Endpoint :** `GET /appointments`

**Description :** ดึงการจองทั้งหมด

**Response Example :**
```json
{
  "success": true,
  "message": "ดึงข้อมูลการจองสำเร็จ",
  "data": [
    {
      "id": "A1741030000000",
      "serviceId": "S1741023456789",
      "customerName": "Somchai",
      "customerPhone": "0812345678",
      "appointmentDate": "2026-03-10T10:00:00",
      "status": "PENDING"
    }
  ]
}
```
---
### 2.2 Get Appointment by ID

**Endpoint :** `GET /appointments/{id}`

**Description :** ดึงข้อมูลการจอง 1 รายการ ตาม ID

**Example :**
```json
GET /appointments/A1741030000000
```
```json
{
  "success": true,
  "message": "ดึงข้อมูลการจองสำเร็จ",
  "data": [
    {
    "id": "A1741030000000",
    "serviceId": "S1741023456789",
    "customerName": "Somchai",
    "customerPhone": "0812345678",
    "appointmentDate": "2026-03-10T10:00:00",
    "status": "PENDING"
    }
  ]
}
```

**Error Example :**
```json
{
  "success": false,
  "message": "ไม่พบการจองนี้",
  "data": null
}
```

---
### 2.3 Create Appointment

**Endpoint :**`POST /appointments`

**Description :** สร้างการจองใหม่

**Request Body Example :**
```json

{
  "serviceId": "S1741023456789",
  "customerName": "Somchai",
  "customerPhone": "0812345678",
  "appointmentDate": "2026-03-10T10:00:00",
  "notes": "ลูกค้าต้องการช่างคนเดิม"
}
```

**Validation Rules :**

* serviceId ต้องมีอยู่ในระบบ

* appointmentDate ต้องไม่เป็นวันที่ในอดีต

* status จะถูกตั้งค่าเป็น `PENDING` อัตโนมัติ

**Response Example :**
```json
{
  "success": true,
  "message": "สร้างการจองใหม่สำเร็จ",
  "data": [
    {
    "id": "A1741031111111",
    "serviceId": "S1741023456789",
    "customerName": "Somchai",
    "customerPhone": "0812345678",
    "appointmentDate": "2026-03-10T10:00:00",
    "status": "PENDING"
    }
  ]
}
```
---
### 2.4 Replace Appointment

**Endpoint :** `PUT /appointments/{id}`

**Description :** ใช้แทนที่ข้อมูลการจองทั้งหมด

---

### 2.5 Update Appointment

**Endpoint :** `PATCH /appointments/{id}`

**Description :** ใช้สำหรับแก้ไขข้อมูลบางส่วน เช่น

* appointmentDate

* status

* notes
---

### 2.6 Delete Appointment

**Endpoint :** `DELETE /appointments/{id}`

**Description :** ลบ/ยกเลิก การจอง

**Response Example :**

```json
{
  "success": true,
  "message": "ยกเลิกการจองสำเร็จ",
  "data": null
}
```
