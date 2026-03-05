# Data Model Documentation


## Appointment Booking System

โครงสร้างข้อมูล (Data Model) ที่ใช้ในระบบ Appointment Booking System

## 1. Service Model

ใช้เก็บข้อมูลบริการที่ลูกค้าสามารถจองได้

Field|Type|Description
|---|-----|---------|
id	| string |	รหัสบริการ
name |	string | ชื่อบริการ
description |	string | รายละเอียดของบริการ
durationMinutes	| number |ระยะเวลาของบริการ (หน่วยเป็นนาที)
price | number | ราคาของบริการ 
isActive |	boolean |	สถานะว่าบริการเปิดใช้งานหรือไม่

**Example :**
```json
{ 
"id": "S1741023456789", 
"name": "Hair Cut", 
"description": "บริการตัดผม", 
"durationMinutes": 30, 
"price": 200, 
"isActive": true 
}
```
---

## 2. Appointment Model

ใช้เก็บข้อมูลการจองบริการของลูกค้า

Field |	Type |	Description
|-----|-----|---------------|
id	| string |	รหัสการจอง
serviceId |	string |	รหัสบริการที่ลูกค้าเลือก
customerName| string | ชื่อลูกค้า
customerPhone | string  | เบอร์โทรศัพท์ของลูกค้า
appointmentDate| string (ISO Date)|วันและเวลาที่จอง
status | AppointmentStatus | สถานะของการจอง
notes | 	string (optional)	| หมายเหตุเพิ่มเติม


**Example :**
```json
{ 
"id": "A1741030000000", 
"serviceId": "S1741023456789", 
"customerName": "Somchai", 
"customerPhone": "0812345678", 
"appointmentDate": "2026-03-10T10:00:00", 
"status": "PENDING", 
"notes": "ลูกค้าต้องการช่างคนเดิม" 
}
```
---

## 3. Appointment Status Enum

ใช้กำหนดสถานะของการจอง

Status | Description |
|------|--------|
PENDING	| การจองถูกสร้างและกำลังรอการยืนยัน
CONFIRMED |	การจองได้รับการยืนยันแล้ว
COMPLETED |	การให้บริการเสร็จสิ้นแล้ว
CANCELLED |	การจองถูกยกเลิก

**Example :**
```json
{ "status": "PENDING" }
```


---
## 4. API Response Model

โครงสร้างข้อมูลมาตรฐานที่ API ใช้ตอบกลับ

Field | Type |	Description
|-----|------|-------------|
success |	boolean |	ระบุว่าสำเร็จหรือไม่
message |	string |	ข้อความตอบกลับจาก API
data	 | T / null	 |ข้อมูลที่ API ส่งกลับ

**Example :**
```json
{ 
"success": true, 
"message": "ดึงข้อมูลสำเร็จ", 
"data": {} 
}
```
---
## 5. Data Relationship

ความสัมพันธ์ของข้อมูลในระบบ

```json
Service (1) -------- (Many) Appointment
```

**Description :**

+ Service หนึ่งรายการสามารถมีการจองได้หลายรายการ

+ Appointment จะอ้างอิง Service ผ่าน serviceId