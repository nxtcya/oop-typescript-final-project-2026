# 🔌API Specification

## ระบบ Appointment Booking System


**Base URL** : http://localhost:3000

**Service Endpoint** : /services

**Appointment Endpoint** : /appointments


## HTTP Status Code
+ `200`  OK
+ `201`  Created
+ `400`  Bad Request
+ `404`  Not Found
+ `500`  Internal Server Error


## 1️⃣ Service API
ใช้สำหรับจัดการข้อมูลบริการ



### 1.1 Get All Services

**Endpoint** `GET /services`

**Description :** ดึงข้อมูลบริการทั้งหมดในระบบ

**HTTP Status Code :**
```
200 OK 
```
**Response Example :**
```json

{
    "success": true,
    "message": "ดึงข้อมูลบริการสำเร็จ",
    "data": [
        {
            "id": "svc-hair-01",
            "name": "ตัดผมสไตล์วินเทจ",
            "description": "ตัดผมและเซ็ตทรงด้วยผลิตภัณฑ์พรีเมียม",
            "durationMinutes": 60,
            "price": 500,
            "isActive": true,
            "requiresAdvancePayment": false,
            "maxCapacity": 2,
            "category": "HAIR_CARE",
            "createdAt": "2026-01-10T08:00:00Z",
            "updatedAt": "2026-01-10T08:00:00Z"
        },

          .
          .
          .
          

        {
            "id": "svc-cons-04",
            "name": "ปรึกษาคอร์สเจ้าสาว",
            "description": "วางแผนการดูแลผิวหน้าและรูปร่างแบบครบวงจรสำหรับว่าที่เจ้าสาว",
            "durationMinutes": 60,
            "price": 1500,
            "isActive": true,
            "requiresAdvancePayment": false,
            "maxCapacity": 2,
            "category": "CONSULTATION",
            "createdAt": "2026-03-01T09:00:00Z",
            "updatedAt": "2026-03-01T09:00:00Z"
        }
    ]
}

```



---

### 1.2 Get Service by ID

**Endpoint :** `GET /services/{id}`

**Description :** ดึงข้อมูลบริการ 1 รายการตาม ID
```url
GET /services/svc-skin-03
```
**HTTP Status Code :**
```
200 OK 
```
**Response Example :**
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
**HTTP Status Code :**
```
404 Not Found
```
**Error Example :**
```json
{
    "message": "ไม่พบบริการรหัส svc-skin-00",
    "error": "Not Found",
    "statusCode": 404
}
```
---

### 1.3 Create Service

**Endpoint :** `POST /services`

**Description :** สร้าง/เพิ่ม ข้อมูลบริการใหม่


**Request Body Example :**
```json
{
  "name": "ทำสีผมแฟชั่น",
  "description": "บริการทำสีผมพร้อมบำรุงเซราติน",
  "durationMinutes": 120,
  "price": 1800,
  "maxCapacity": 2,
  "category": "HAIR_CARE",
  "isActive": true,
  "requiresAdvancePayment": false
}
```
**HTTP Status Code :**
```
201  Created
```
**Response Example :**
```json
{
    "success": true,
    "message": "สร้างบริการใหม่สำเร็จ",
    "data": {
        "id": "svc-187d0954-21b7-40c2-883d-901fbcdef239",
        "name": "ทำสีผมแฟชั่น",
        "description": "บริการทำสีผมพร้อมบำรุงเซราติน",
        "durationMinutes": 120,
        "price": 1800,
        "maxCapacity": 2,
        "category": "HAIR_CARE",
        "isActive": true,
        "requiresAdvancePayment": false,
        "createdAt": "2026-03-07T18:53:17.022Z",
        "updatedAt": "2026-03-07T18:53:17.022Z"
    }
}
```


**HTTP Status Code :**
```
400  Bad Request
```
**Bad Example :**
```json
{
    "message": [
        "isActive must be a boolean value",
        "requiresAdvancePayment must be a boolean value"
    ],
    "error": "Bad Request",
    "statusCode": 400
}
```

---
### 1.4 Replace Service

**Endpoint :** `PUT /services/{id}`

**Description :** ใช้แทนที่ข้อมูลบริการทั้งหมด ของ ID นั้น

**HTTP Status Code :**
```
200 OK 
```

**Response Example :**
```json
{
    "success": true,
    "message": "แทนที่ข้อมูลบริการสำเร็จ",
    "data": { }
}
```

---

### 1.5 Update Service

**Endpoint :** `PATCH /services/{id}`

**Description :** ใช้แก้ไขข้อมูลบางฟิลด์

**HTTP Status Code :**
```
200 OK 
```

**Response Example :**
```json
{
    "success": true,
    "message": "อัปเดตข้อมูลบริการสำเร็จ",
    "data": { }
}
```

---

### 1.6 Delete Service

**Endpoint :** `DELETE /services/{id}`

**Description :** ลบข้อมูลบริการ

**HTTP Status Code :**
```
200 OK 
```

**Response Example :**
```json
{
  "success": true,
  "message": "ลบข้อมูลบริการสำเร็จ",
  "data": null
}
```

---


## 2️⃣ Appointment API

ใช้สำหรับจัดการข้อมูลการจอง


### 2.1 Get All Appointments

**Endpoint :** `GET /appointments`

**Description :** ดึงการจองทั้งหมด

**HTTP Status Code :**
```
200 OK 
```

**Response Example :**
```json
{
    "success": true,
    "message": "ดึงข้อมูลการจองสำเร็จ",
    "data": [
        {
            "id": "appt-001",
            "serviceId": "svc-hair-01",
            "customerName": "ฟลุ๊คกี้ ขยี้ใจ",
            "customerPhone": "0812345678",
            "appointmentDate": "2026-03-10T10:00:00Z",
            "status": "CONFIRMED",
            "notes": "ขอช่างคนเดิม",
            "isFirstTimeCustomer": false,
            "isReminderSent": true,
            "createdAt": "2026-03-01T08:30:00Z",
            "updatedAt": "2026-03-05T09:15:00Z"
        },

        .
        .
        .

        {
            "id": "appt-020",
            "serviceId": "svc-skin-03",
            "customerName": "ทิพวรรณ วันใส",
            "customerPhone": "0890009999",
            "appointmentDate": "2026-03-24T14:00:00Z",
            "status": "COMPLETED",
            "isFirstTimeCustomer": false,
            "isReminderSent": true,
            "createdAt": "2026-03-20T08:20:00Z",
            "updatedAt": "2026-03-24T15:30:00Z"
        }
    ]
}
```
---
### 2.2 Get Appointment by ID

**Endpoint :** `GET /appointments/{id}`

**Description :** ดึงข้อมูลการจอง 1 รายการ ตาม ID


```url
GET /appointments/appt-019
```
**HTTP Status Code :**
```
200 OK
``` 

**Response Example :**
```json
{
    "success": true,
    "message": "ดึงข้อมูลการจองสำเร็จ",
    "data": {
        "id": "appt-019",
        "serviceId": "svc-hair-03",
        "customerName": "อนุชา พารวย",
        "customerPhone": "0880008888",
        "appointmentDate": "2026-03-23T10:00:00Z",
        "status": "PENDING",
        "notes": "อาจจะมาสายเล็กน้อย",
        "isFirstTimeCustomer": true,
        "isReminderSent": false,
        "createdAt": "2026-03-19T11:11:00Z",
        "updatedAt": "2026-03-19T11:11:00Z"
    }
}
```
**HTTP Status Code :**
```
404 Not Found
``` 
**Error Example :**
```json
{
    "message": "ไม่พบข้อมูลการจองรหัส appt-00",
    "error": "Not Found",
    "statusCode": 404
}
```

---
### 2.3 Create Appointment

**Endpoint :**`POST /appointments`

**Description :** สร้างการจองใหม่

**HTTP Status Code :**
```
201 Created 
``` 
**Request Body Example :**
```json

{
  "serviceId": "svc-mass-01",
  "customerName": "สมชาย ใจดี",
  "customerPhone": "0812345678",
  "appointmentDate": "2026-03-25T10:00:00Z",
  "notes": "ต้องการเน้นนวดคอบ่าไหล่",
  "isFirstTimeCustomer": true
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
    "data": {
        "id": "appt-2306c3fd-fc2b-4b43-8273-c9bd28e1ceb7",
        "serviceId": "svc-mass-01",
        "customerName": "สมชาย ใจดี",
        "customerPhone": "0812345678",
        "appointmentDate": "2026-03-25T10:00:00Z",
        "notes": "ต้องการเน้นนวดคอบ่าไหล่",
        "isFirstTimeCustomer": true,
        "createdAt": "2026-03-07T19:13:28.540Z",
        "updatedAt": "2026-03-07T19:13:28.540Z",
        "status": "PENDING",
        "isReminderSent": false
    }
}
```
---
### 2.4 Replace Appointment

**Endpoint :** `PUT /appointments/{id}`

**Description :** ใช้แทนที่ข้อมูลการจองทั้งหมด

**HTTP Status Code :**
```
200 OK 
```

**Response Example :**
```json
{
    "success": true,
    "message": "แทนที่การจองสำเร็จ",
    "data": { }
}
```

---

### 2.5 Update Appointment

**Endpoint :** `PATCH /appointments/{id}`

**Description :** ใช้สำหรับแก้ไขข้อมูลบางส่วน
  
**HTTP Status Code :**
```
200 OK 
```

**Response Example :**
```json
{
    "success": true,
    "message": "อัปเดตข้อมูลการจองสำเร็จ",
    "data": { }
}
```
---

### 2.6 Delete Appointment

**Endpoint :** `DELETE /appointments/{id}`

**Description :** ลบ/ยกเลิก การจอง

**HTTP Status Code :**
```
200 OK 
```

**Response Example :**

```json
{
  "success": true,
  "message": "ยกเลิกการจองสำเร็จ",
  "data": null
}
```
