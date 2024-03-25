# Geeleed Hotel

- [Frontend repo](https://github.com/Geeleed/geeleed-hotel)
- [Backend repo](https://github.com/Geeleed/geeleed-hotel-backend)

# Frontend

ตัวอย่างเว็บไซต์จองห้องพักโรงแรม พัฒนาด้วย next.js typescripe tailwindcss (โปรเจ็กนี้ทำ backend ด้วย nodejs แยกไว้ที่ [backend repository](https://github.com/Geeleed/geeleed-hotel-backend)) รองรับหลายขนาดหน้าจอ responsive web design และเป็น progressive web application

การใช้งาน

1. ติดตั้ง library

```bash
npm install
```

2. สร้างไฟล์ .env.local

```bash
NEXT_PUBLIC_backendOrigin="กำหนด origin ของ backend เช่น http://localhost:8000"
```

3. รัน

```bash
npm run dev
```

จำเป็นต้องรัน backend ด้วย [backend repository](https://github.com/Geeleed/geeleed-hotel-backend)

## Flow

1. เปิดหน้าเว็บ
2. สมัครสมาชิก
3. ล็อกอิน
4. เลือกห้องพัก
5. กรอกข้อมูล
6. ชำระเงิน
7. ล็อกเอาท์

## โฟลเดอร์ config

- สามารถแก้ไช้ color theme ได้ในไฟล์ clpl.ts

- ไฟล์ pk_stripe.ts เก็บ public key สำหรับใช้ stripe ร่วมกับ backend

## Demo project

เว็บไซต์ตัวอย่างของโปรเจ็กนี้ถูก deploy บน vercel และใช้ฐานข้อมูล mongodb atlas สามารถดู demo ได้ที่ [Geeleed Hotel](https://geeleed-hotel.vercel.app/)

## อื่น ๆ

ติดต่อ surasak.kwork@gmail.com
