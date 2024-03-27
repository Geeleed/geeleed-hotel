"use client";
import React, { useState } from "react";
import Link from "next/link";
import { clpl } from "@/config/clpl";
import hotelRoom from "@/config/mock-json/hotelRoom.json";
import Card1 from "./component/Card1";
import Footer from "./component/Footer";
import useAuth from "./customHook/useAuth";

export default function Page() {
  return useAuth({ page: <Root />, currentUrl: "/" });
}

const Root = () => {
  const [scroll, setScroll] = useState({});
  const handleScroll = (e: any) => {
    const { clientHeight, scrollTop } = e.target;
    setScroll({ scrollTop, clientHeight });
  };
  return (
    <div
      className=" w-screen h-screen overflow-auto"
      onScroll={(e) => handleScroll(e)}
    >
      <section style={{ color: clpl.c4 }}>
        <nav
          className=" flex justify-between p-3 md:px-10 fixed top-0 z-10 w-full "
          style={{ backgroundColor: clpl.c1 }}
        >
          <label>Full Stack Dev</label>
          <ul className=" flex gap-5">
            <Link
              className=" hover:underline underline-offset-8"
              href={"/signin"}
            >
              เข้าระบบ
            </Link>
            <Link
              className=" hover:underline underline-offset-8"
              href={"/signup"}
            >
              สมัครสมาชิก
            </Link>
          </ul>
        </nav>
        <div className=" relative bg-[url('/image/visualsofdana-T5pL6ciEn-I-unsplash.jpg')] w-full h-screen bg-cover bg-center bg-fixed">
          <div className=" bg-[#000000aa] absolute w-full h-full flex flex-col items-center justify-center">
            <div className=" text-[4rem] font-[Delmon] text-center leading-none">
              Geeleed Hotel
            </div>
          </div>
        </div>
      </section>
      <section className=" w-full">
        <div
          className=" py-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 lg:px-[10%] 
        bg-[url('/image/visualsofdana-T5pL6ciEn-I-unsplash.jpg')] bg-fixed bg-center bg-cover 
        relative before:absolute before:w-full before:h-full before:bg-[#000000aa] "
        >
          <div
            className=" w-full flex flex-col justify-center items-center p-10 text-center z-[1]"
            style={{ backgroundColor: clpl.c1, color: clpl.c4 }}
          >
            <b className=" text-[2rem]">ห้องพัก</b>
            <p>มีบริการห้องพักหลากหลายประเภท ตอบโจทย์ทุกสถานการณ์</p>
          </div>
          {hotelRoom &&
            hotelRoom
              .filter((i: any) => i.roomType === "sleeping")
              .map((i: any) => (
                <Card1 key={i.imageSrc} content={i} scroll={scroll} />
              ))}
          <div
            className=" w-full flex flex-col justify-center items-center p-10 text-center z-[1]"
            style={{ backgroundColor: clpl.c1, color: clpl.c4 }}
          >
            <b className=" text-[2rem]">ห้องประชุม</b>
            <p>มีห้องประชุมและห้องสำหรับการสัมมนาที่จุได้ถึง 500 คน</p>
          </div>
          {hotelRoom &&
            hotelRoom
              .filter((i: any) => i.roomType === "seminar")
              .map((i: any) => (
                <Card1 key={i.imageSrc} content={i} scroll={scroll} />
              ))}
          <div
            className=" w-full flex flex-col justify-center items-center p-10 text-center z-[1]"
            style={{ backgroundColor: clpl.c1, color: clpl.c4 }}
          >
            <b className="text-[2rem]">ห้องอาหาร</b>
            <p>
              มีทั้งห้องรับประทานอาหารและบาร์เครื่องดื่ม เปิดบริการตลอด 24
              ชั่วโมง
            </p>
          </div>
          {hotelRoom &&
            hotelRoom
              .filter((i: any) => i.roomType === "canteen")
              .map((i: any) => (
                <Card1 key={i.imageSrc} content={i} scroll={scroll} />
              ))}
          <div
            className=" w-full flex flex-col justify-center items-center p-10 text-center z-[1]"
            style={{ backgroundColor: clpl.c1, color: clpl.c4 }}
          >
            <b className=" text-[2rem]">ห้องจัดงานเลี้ยง</b>
            <p>
              หากต้องการหาสถานที่สำหรับการเฉลิมฉลองเนื่องในโอกาสพิเศษต่าง ๆ
              เราก็สามารถจัดให้ได้
            </p>
          </div>
          {hotelRoom &&
            hotelRoom
              .filter((i: any) => i.roomType === "party")
              .map((i: any) => (
                <Card1 key={i.imageSrc} content={i} scroll={scroll} />
              ))}
          <div
            className=" w-full flex flex-col justify-center items-center p-10 text-center z-[1]"
            style={{ backgroundColor: clpl.c1, color: clpl.c4 }}
          >
            <b className="text-[2rem]">สถานที่พักผ่อนหย่อนใจ</b>
            <p>เรามีสถานที่พักสมอง หย่อนกาย สบายใจ ให้ทุกท่านตลอด 24 ชั่วโมง</p>
          </div>
          {hotelRoom &&
            hotelRoom
              .filter((i: any) => i.roomType === "relax")
              .map((i: any) => (
                <Card1 key={i.imageSrc} content={i} scroll={scroll} />
              ))}
          <div
            className=" w-full md:flex flex-col justify-center items-center p-10 text-center z-[1] hidden"
            style={{ backgroundColor: clpl.c1, color: clpl.c4 }}
          ></div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
