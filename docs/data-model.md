# 🧱 Data Model Documentation


## Appointment Booking System 

โครงสร้างข้อมูล (Data Model) ที่ใช้ในระบบ Appointment Booking System

## 1️⃣ Service Model

ใช้เก็บข้อมูลบริการที่ลูกค้าสามารถจองได้

Field|Type|Description
|---|-----|---------|
`id` | string | รหัสบริการ
`name` | string | ชื่อบริการ
`description` | string | รายละเอียดของบริการ
`durationMinutes` | number | ระยะเวลาของบริการ (หน่วยเป็นนาที)
`price` | number | ราคาของบริการ 
`isActive` | boolean | สถานะว่าบริการเปิดใช้งานหรือไม่
`requiresAdvancePayment` | boolean | ต้องจ่ายเงินล่วงหน้าหรือไม่
`maxCapacity` | number | จำนวนคิวสูงสุดที่รับได้ต่อรอบเวลา
`category` | ServiceCategory | หมวดหมู่ของบริการ (Enum)
`createdAt` | string (ISO Date) | วันและเวลาที่สร้างข้อมูล
`updatedAt` | string (ISO Date) | วันและเวลาที่อัปเดตข้อมูลล่าสุด


**Example :**
```json
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
```
---

## 2️⃣ Appointment Model

ใช้เก็บข้อมูลการจองบริการของลูกค้า

Field |	Type |	Description
|-----|-----|---------------|
`id` | string | รหัสการจอง
`serviceId` | string | รหัสบริการที่ลูกค้าเลือก
`customerName` | string | ชื่อลูกค้า
`customerPhone` | string | เบอร์โทรศัพท์ของลูกค้า
`appointmentDate` | string (ISO Date) | วันและเวลาที่จอง
`status` | AppointmentStatus | สถานะของการจอง (Enum)
`notes` | string (optional) | หมายเหตุเพิ่มเติม
`isFirstTimeCustomer` | boolean | เป็นลูกค้าครั้งแรกหรือไม่
`isReminderSent` | boolean | ส่งการแจ้งเตือนแล้วหรือยัง
`createdAt` | string (ISO Date) | วันและเวลาที่สร้างการจอง
`updatedAt` | string (ISO Date) | วันและเวลาที่อัปเดตการจองล่าสุด


**Example :**
```json
{ 
"id": "appt-005",
"serviceId": "svc-cons-04",
"customerName": "แอมแปร์ อิ่มแปล้",
"customerPhone": "0877778888",
"appointmentDate": "2026-03-12T11:00:00Z",
"status": "CONFIRMED",
"notes": "ปรึกษาเรื่องคอร์สเจ้าสาว",
"isFirstTimeCustomer": true,
"isReminderSent": true,
"createdAt": "2026-03-05T10:15:00Z",
"updatedAt": "2026-03-10T09:00:00Z" 
}
```
---

## 3️⃣ Appointment Status Enum

ใช้กำหนดสถานะของการจอง

Status | Description |
|------|--------|
`PENDING`	| การจองถูกสร้างและกำลังรอการยืนยัน
`CONFIRMED` |	การจองได้รับการยืนยันแล้ว
`COMPLETED` |	การให้บริการเสร็จสิ้นแล้ว
`CANCELLED` |	การจองถูกยกเลิก

**Example :**
```json
{ "status": "PENDING" }
```


---
## 4️⃣ API Response Model

โครงสร้างข้อมูลมาตรฐานที่ API ใช้ตอบกลับ

Field | Type |	Description
|-----|------|-------------|
`success` |	boolean |	ระบุว่าสำเร็จหรือไม่
`message` |	string |	ข้อความตอบกลับจาก API
`data`	 | T / null	 |ข้อมูลที่ API ส่งกลับ

**Example :**
```json
{ 
"success": true, 
"message": "ดึงข้อมูลสำเร็จ", 
"data": {} 
}
```
---
## 5️⃣ Data Relationship

ความสัมพันธ์ของข้อมูลในระบบ

```text
Service (1) -------- (Many) Appointment
```

**Description :**

+ Service หนึ่งรายการสามารถมีการจองได้หลายรายการ

+ Appointment จะอ้างอิง Service ผ่าน serviceId