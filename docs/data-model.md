# 🧱 Data Model Documentation


## Appointment Booking System 

โครงสร้างข้อมูล (Data Model) ที่ใช้ในระบบ Appointment Booking System

## 1️⃣ Service Model

ใช้เก็บข้อมูลบริการที่ลูกค้าสามารถจองได้

Field|Type|Description|
|----|----|-----------|
`id`| string |	รหัสบริการ
`name` |string | ชื่อบริการ
`description` |	string | รายละเอียดของบริการ
`durationMinutes`| number |ระยะเวลาของบริการ (หน่วยเป็นนาที)
`price` | number | ราคาของบริการ 
`isActive` |boolean |	สถานะว่าบริการเปิดใช้งานหรือไม่
`requiresAdvancePayment` | boolean | บริการนี้ต้องชำระเงินล่วงหน้าหรือไม่
`maxCapacity` | number | จำนวนลูกค้าสูงสุดที่สามารถรับได้ต่อช่วงเวลา
`category` |`ServiceCategory` | ประเภทของบริการ 
`createdAt`| string | วันที่และเวลาที่สร้างข้อมูลบริการ (ISO Date)
`updatedAt` | string | วันที่และเวลาที่มีการแก้ไขข้อมูลล่าสุด (ISO Date)

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

## 2️⃣ ServiceCategory Enum
ประเภทของบริการ


Value| Description |
|------|--------|
`HAIR_CARE` |บริการเกี่ยวกับเส้นผม
`SKIN_CARE` |บริการดูแลผิวหน้า
`MASSAGE` |บริการนวด
`CONSULTATION `|บริการให้คำปรึกษา

**Example :**
```json
{ "category": "HAIR_CARE" }
```
---

## 3️⃣ Appointment Model

ใช้เก็บข้อมูลการจองบริการของลูกค้า

Field |	Type |	Description
|-----|-----|---------------|
`id`| string |	รหัสการจอง
`serviceId` |	string |	รหัสบริการที่ลูกค้าเลือก
`customerName`| string | ชื่อลูกค้า
`customerPhone` | string  | เบอร์โทรศัพท์ของลูกค้า
`appointmentDate`| string (ISO Date)|วันและเวลาที่จอง
`status` | `AppointmentStatus` | สถานะของการจอง
`notes?`| 	string (optional)	| หมายเหตุเพิ่มเติม
`isFirstTimeCustomer`| boolean | ลูกค้าเป็นลูกค้าใหม่หรือไม่
`isReminderSent`| boolean | มีการส่งการแจ้งเตือนการจองแล้วหรือยัง
`createdAt`| string | วันที่และเวลาที่สร้างข้อมูลการจอง (ISO Date)
`updatedAt`|string  | วันที่และเวลาที่มีการแก้ไขข้อมูลล่าสุด (ISO Date)

**Example :**
```json
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
```
---

## 4️⃣ Appointment Status Enum

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
## 5️⃣ API Response Model

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
##  6️⃣ Data Relationship

ความสัมพันธ์ของข้อมูลในระบบ

```text
Service (1) -------- (Many) Appointment
```

**Description :**

+ Service หนึ่งรายการสามารถมีการจองได้หลายรายการ

+ Appointment จะอ้างอิง Service ผ่าน field `serviceId`