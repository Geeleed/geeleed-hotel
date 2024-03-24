# Geeleed Hotel

# Frontend

ตัวอย่างเว็บไซต์จองห้องพักโรงแรม พัฒนาด้วย next.js typescripe tailwindcss (โปรเจ็กนี้ทำ backend ด้วย nodejs แยกไว้ที่ [backend repository](https://)) รองรับหลายขนาดหน้าจอ responsive web design และเป็น progressive web application

การใช้งาน

```bash
npm install
npm run dev
```

จำเป็นต้องรัน backend ด้วย [backend repository](https://)

## Flow

1. เปิดหน้าเว็บ
2. สมัครสมาชิก
3. ล็อกอิน
4. เลือกห้องพัก
5. กรอกข้อมูล
6. ชำระเงิน
7. ล็อกเอาท์

## โฟลเดอร์ config

- แก้ไข backend origin ใน config.json เพื่อให้โปรเจ็กนี้เชื่อมต่อกับ backend ได้ถูกต้อง

- สามารถแก้ไช้ color theme ได้ในไฟล์ clpl.ts

- ไฟล์ endpointSecret.ts เก็บ public key สำหรับใช้ stripe ร่วมกับ backend

## Demo project

เว็บไซต์ตัวอย่างของโปรเจ็กนี้ถูก deploy บน vercel และใช้ฐานข้อมูล mongodb atlas สามารถดู demo ได้ที่ [Geeleed Hotel](...)

## อื่น ๆ

ติดต่อ surasak.kwork@gmail.com
