"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Calendar from "@/app/component/Calendar";
import { clpl } from "@/config/clpl";
import {
  ep_checkout,
  ep_loadOrderByRoom_id,
  ep_loadRoomBy_id,
} from "@/config/api_endpoint";
import { range } from "@/config/utils";
import { loadStripe } from "@stripe/stripe-js";
import { PK_STRIPE } from "@/config/pk_stripe";
import { clearExpireSession } from "../clearExpireSession";
import { RootState, useAppSelector } from "@/app/component/GlobalStateWrapper";

export default function Booking({ params }: { params: { booking: string } }) {
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  const [fullYear, setFullYear] = useState(new Date().getFullYear());
  const [markDate, setMarkDate] = useState<string[]>([]);
  const [bookedDate, setBookedDate] = useState([]);
  const [room, setRoom] = useState();
  const [guestInfo, setGuestInfo] = useState<any>([
    { firstname: "", lastname: "", phoneNumber: "" },
  ]);
  const [guestNote, setGuestNote] = useState("");

  const base64 = useAppSelector((state: RootState) => state.loadImage.data);
  const loadRoom = useAppSelector((state: RootState) => state.loadRoom.data);
  const roomData = loadRoom.filter(
    (item: any) => item._id === params.booking
  )[0];
  const loadOrderByRoom_id = async () => {
    const res = await fetch(ep_loadOrderByRoom_id + "/" + params.booking).then(
      (res) => res.json()
    );
    if (res.length > 0) {
      setBookedDate(res.flatMap((item: any) => item["bookedDate"]));
    } else {
      setBookedDate([]);
    }
  };
  const loadRoomBy_id = async () => {
    const res = await fetch(ep_loadRoomBy_id + "/" + params.booking).then(
      (res) => res.json()
    );
    setRoom(res);
  };

  const handleGuestInfo = (e: any) => {
    const { id, name, value } = e.target;
    let arr = guestInfo;
    if (arr[id - 1]) {
      arr[id - 1][name] = value;
    } else {
      arr[id - 1] = { [name]: value };
    }
    setGuestInfo([...arr]);
  };

  const handlePay = async () => {
    if (markDate.length === 0) return;
    if (
      !(
        guestInfo[0]["firstname"] &&
        guestInfo[0]["lastname"] &&
        guestInfo[0]["phoneNumber"]
      )
    ) {
      alert("กรุณากรอกรายละเอียดผู้ใช้บริการ 1");
      return;
    }
    const data = {
      guestInfo,
      guestNote,
      price: room && room["pricePerDay"] * markDate.length,
      markDate,
      room_id: params.booking,
    };
    const token = localStorage.getItem("token");
    const stripe = await loadStripe(PK_STRIPE);
    const res = await fetch(ep_checkout, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    if (res.process) {
      const sessionId = await res["sessionId"];
      stripe?.redirectToCheckout({ sessionId });
    } else {
      alert(res.message);
    }
  };

  useEffect(() => {
    loadOrderByRoom_id();
    loadRoomBy_id();
    clearExpireSession();
  }, []);
  return (
    <div className=" flex justify-center">
      <div className=" max-w-[42rem] flex flex-col gap-2 mt-5 px-5 md:px-0">
        <section className=" flex gap-2 text-[1.2rem] flex-wrap font-bold">
          <div className=" leading-none">ห้อง {room && room["roomName"]}</div>
          <div className=" leading-none">ประเภท {room && room["roomType"]}</div>
          <div className=" leading-none">
            ค่าบริการ {room && room["pricePerDay"]} บาทต่อวัน
          </div>
        </section>
        <section className=" w-full overflow-x-auto flex gap-1 snap-x">
          {roomData.imageId &&
            roomData.imageId.map((i: any) => {
              const obj =
                (base64 && base64.filter((j: any) => j._id === i)[0]) || [];
              return (
                <Image
                  className=" flex-none snap-center w-full aspect-[1.618] rounded-md"
                  key={obj._id}
                  src={obj.images}
                  height={700}
                  width={700}
                  alt=""
                />
              );
            })}
        </section>
        <section>
          <b className=" text-[1.2rem]">รายละเอียด</b>
          <p>{room && room["description"]}</p>
        </section>
        <br />
        <section
          className=" border rounded-md p-3"
          style={{ borderColor: clpl.c2 }}
        >
          <h2 className=" font-bold text-[1.3rem] my-2">
            ขั้นที่ 1 เลือกวันที่ต้องการใช้บริการ{" "}
            {markDate.length > 0 && `(${markDate.length})`}
          </h2>
          <hr className=" mb-3" style={{ borderColor: clpl.c2 }} />
          <div className=" flex justify-between text-[1.1rem] mb-2">
            <button
              className=" hover:underline"
              onClick={() =>
                setMonthIndex((prev) => (prev === 0 ? 11 : prev - 1))
              }
            >
              ย้อนเดือน
            </button>
            <div className="flex gap-2 items-center">
              <div>{monthNames[monthIndex]}</div>
              <input
                className=" w-20 px-2 py-1 outline-none rounded-md"
                style={{ color: clpl.c1 }}
                type="number"
                onChange={(e) => setFullYear(Number(e.target.value))}
                value={fullYear}
              />
            </div>
            <button
              className=" hover:underline"
              onClick={() =>
                setMonthIndex((prev) => (prev === 11 ? 0 : prev + 1))
              }
            >
              เดือนต่อไป
            </button>
          </div>
          <Calendar
            monthIndex={monthIndex}
            year={fullYear}
            // bookedDate={["Mar 20 2024", "Mar 21 2024", "Apr 4 2024"]}
            bookedDate={bookedDate}
            markDateState={{ markDate, setMarkDate }}
          />
        </section>
        <section
          className=" border rounded-md p-3"
          style={{ borderColor: clpl.c2 }}
        >
          <h2 className=" font-bold text-[1.3rem] my-2">
            ขั้นที่ 2 รายละเอียดผู้เข้าใช้บริการ
          </h2>
          <hr className=" mb-3" style={{ borderColor: clpl.c2 }} />
          <form className=" flex flex-col gap-1 w-full max-h-80 overflow-y-auto text-[0.8rem] md:text-[1rem]">
            {room &&
              range(1, room["guestLimit"]).map((item) => (
                <div
                  key={item}
                  className=" flex gap-1 items-center w-full flex-wrap justify-between pr-2"
                  style={{ color: clpl.c1 }}
                >
                  <div className=" md:px-2" style={{ color: clpl.c4 }}>
                    {item}
                  </div>
                  <div className=" w-[90%] flex gap-1">
                    <input
                      id={`${item}`}
                      name={`firstname`}
                      onChange={handleGuestInfo}
                      className=" p-2 rounded-md outline-none w-[33%]"
                      type="text"
                      placeholder="ชื่อ"
                      required={item === 1}
                    />
                    <input
                      id={`${item}`}
                      name={`lastname`}
                      onChange={handleGuestInfo}
                      className=" p-2 rounded-md outline-none w-[33%]"
                      type="text"
                      placeholder="นามสกุล"
                      required={item === 1}
                    />
                    <input
                      id={`${item}`}
                      name={`phoneNumber`}
                      onChange={handleGuestInfo}
                      className=" p-2 rounded-md outline-none w-[33%]"
                      type="tel"
                      placeholder="เบอร์ติดต่อ"
                      required={item === 1}
                    />
                  </div>
                </div>
              ))}
          </form>
        </section>
        <section
          className=" border rounded-md p-3"
          style={{ borderColor: clpl.c2 }}
        >
          <h2 className=" font-bold text-[1.3rem] my-2">ขั้นที่ 3 หมายเหตุ</h2>
          <hr className=" mb-3" style={{ borderColor: clpl.c2 }} />
          <textarea
            name="note"
            onChange={(e) => setGuestNote(e.target.value)}
            style={{ color: clpl.c4, backgroundColor: clpl.c1 }}
            className=" w-full outline-none p-3"
            placeholder="หมายเหตุอื่น ๆ ที่ต้องการบอกโรงแรม"
            rows={10}
          />
        </section>
        <section
          className=" border rounded-md p-3"
          style={{ borderColor: clpl.c2 }}
        >
          <h2 className=" font-bold text-[1.3rem] my-2">ขั้นที่ 4 สรุปยอด</h2>
          <hr className=" mb-3" style={{ borderColor: clpl.c2 }} />
          <div>ใช้บริการจำนวน {markDate.length} วัน</div>
          <div className=" text-[1.3rem] font-bold">
            ยอดรวมที่ต้องชำระ {room && room["pricePerDay"] * markDate.length}{" "}
            บาท
          </div>
        </section>
        <section>
          <button
            style={{ opacity: markDate.length > 0 ? "100%" : "50%" }}
            className={
              (markDate.length > 0 && " active:scale-90") +
              " w-full p-2 text-[1.7rem] font-bold text-center rounded-lg bg-blue-500 my-3 transition-all hover:opacity-90"
            }
            onClick={handlePay}
          >
            ชำระเงิน
          </button>
        </section>
      </div>
    </div>
  );
}

const monthNames = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];
