"use client";

import React, { useEffect, useRef, useState } from "react";
import "./page.css";
import {
  RootState,
  actions,
  useAppDispatch,
  useAppSelector,
} from "@/app/component/GlobalStateWrapper";
import { ep_loadImage, ep_newRoom } from "@/config/api_endpoint";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { clpl } from "@/config/clpl";

export default function NewRoom() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({});
  const [imageId, setImageId] = useState<string[]>([]);
  const [freeInternet, setFreeInternet] = useState(false);
  const [freeParking, setFreeParking] = useState(false);
  const handleChkImage = (e: any) => {
    const temp = e.target.value;
    let arr = imageId;
    if (!imageId.includes(temp)) arr = [...arr, temp];
    else arr.splice(arr.indexOf(temp), 1);
    setImageId(arr);
    setFormData((prevData) => ({ ...prevData, imageId: arr }));
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(ep_newRoom, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());
      (await response.process)
        ? router.push("/lobby/admin/room")
        : alert("มีข้อผิดพลาด กรุณาตรวจสอบข้อมูล");
      // ดำเนินการหลังจากส่งข้อมูลเสร็จสิ้น เช่นเปลี่ยนเส้นทาง
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการส่งข้อมูล:", error);
    }
  };

  const base64_load = useAppSelector(
    (state: RootState) => state.loadImage.data
  );
  const setBase64_load = useAppDispatch();
  const firstLoadImageFromMongo = async () => {
    await fetch(ep_loadImage)
      .then((res) => res.json())
      .then((res) => setBase64_load(actions.loadImage.setLoadImage(res.data)));
  };
  useEffect(() => {
    !base64_load && firstLoadImageFromMongo();
  }, []);
  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, freeInternet }));
  }, [freeInternet]);
  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, freeParking }));
  }, [freeParking]);
  return (
    <div className=" w-full flex justify-center">
      <form
        ref={formRef}
        className=" grid grid-cols-1 md:px-[20%] gap-2 p-2 text-[0.7rem] md:text-[1rem]"
        onSubmit={handleSubmit}
      >
        <div>
          <p>{`เลือกภาพ (${imageId.length})`}</p>
          <div className=" grid grid-cols-3 place-items-center gap-1 max-h-[80vh] overflow-auto">
            {base64_load &&
              base64_load.map((item: any) => (
                <div key={item._id} className=" relative w-full aspect-[1.33]">
                  <input
                    type="checkbox"
                    name="imageId"
                    value={item._id}
                    onChange={handleChkImage}
                    className=" absolute top-0 right-0 w-5 h-5 md:w-10 md:h-10 m-1"
                  />
                  <Image
                    src={item.images}
                    height={700}
                    width={700}
                    alt=""
                    className=" w-full h-full"
                  />
                </div>
              ))}
          </div>
        </div>
        <div className=" grid grid-cols-3 gap-1 place-content-start ">
          <div>
            <label htmlFor="roomId">Room ID</label>
            <input
              type="text"
              name="roomId"
              onChange={handleChange}
              placeholder="ไอดีห้อง"
              required
            />
          </div>
          <div>
            <label htmlFor="roomName">ชื่อห้อง</label>
            <input
              type="text"
              name="roomName"
              onChange={handleChange}
              placeholder="ชื่อห้อง"
              required
            />
          </div>
          <div className=" flex flex-col">
            <label htmlFor="roomType">ประเภทห้อง</label>
            <select
              name="roomType"
              onChange={handleChange}
              style={{ color: clpl.c1 }}
              className=" p-2"
            >
              <option value="ห้องสแตนดาร์ด">ห้องสแตนดาร์ด</option>
              <option value="ห้องซูพีเรีย">ห้องซูพีเรีย</option>
              <option value="ห้องดีลักซ์">ห้องดีลักซ์</option>
              <option value="ห้องสวีท">ห้องสวีท</option>
              <option value="ห้องฮันนีมูน">ห้องฮันนีมูน</option>
              <option value="ห้องจัดแต่งตามคำขอ">ห้องจัดแต่งตามคำขอ</option>
              <option value="ห้องโถง">ห้องโถง</option>
              <option value="ห้องประชุม">ห้องประชุม</option>
              <option value="ห้องสัมมนา">ห้องสัมมนา</option>
              <option value="ห้องจัดงานเลี้ยงขนาดเล็ก">
                ห้องจัดงานเลี้ยงขนาดเล็ก
              </option>
              <option value="ห้องจัดงานเลี้ยงขนาดใหญ่">
                ห้องจัดงานเลี้ยงขนาดใหญ่
              </option>
              <option value="ปาตี้">ปาตี้</option>
              <option value="อื่น ๆ">อื่น ๆ</option>
              {/* <option value="standard">ห้องสแตนดาร์ด</option>
              <option value="superior">ห้องซูพีเรีย</option>
              <option value="deluxe">ห้องดีลักซ์</option>
              <option value="suite">ห้องสวีท</option>
              <option value="honeymoon">ห้องฮันนีมูน</option>
              <option value="custom">ห้องจัดแต่งตามคำขอ</option>
              <option value="hall">ห้องโถง</option>
              <option value="meeting">ห้องประชุม</option>
              <option value="seminar">ห้องสัมมนา</option>
              <option value="party1">ห้องจัดงานเลี้ยงขนาดเล็ก</option>
              <option value="party2">ห้องจัดงานเลี้ยงขนาดใหญ่</option>
              <option value="party3">ปาตี้</option>
              <option value="other">อื่น ๆ</option> */}
            </select>
          </div>
          <div>
            <label htmlFor="roomSize">{"ขนาดห้อง (ตารางเมตร)"}</label>
            <input
              type="number"
              name="roomSize"
              placeholder="ขนาดห้อง ตารางเมตร"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="guestLimit">จำนวนผู้เข้าพักสูงสุด</label>
            <input
              type="number"
              name="guestLimit"
              placeholder="จำนวนผู้เข้าพักสูงสุด"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="pricePerDay">ราคาห้องพักต่อวัน</label>
            <input
              type="number"
              name="pricePerDay"
              onChange={handleChange}
              placeholder="ราคา/วัน"
              required
            />
          </div>
          <div>
            <label>การยกเลิก</label>
            <div className=" flex items-center gap-1">
              <input
                className=" w-5 h-5"
                type="radio"
                name="canCancel"
                value="true"
                onChange={handleChange}
                required
              />
              <label htmlFor="canCancel">สามารถยกเลิกได้</label>
            </div>
            <div className=" flex items-center gap-1">
              <input
                className=" w-5 h-5"
                type="radio"
                name="canCancel"
                value="false"
                onChange={handleChange}
                required
              />
              <label htmlFor="canCancel">ไม่สามารถยกเลิกได้</label>
            </div>
            <input
              className=" mt-1"
              type="number"
              name="canCancelPrice"
              placeholder="ค่าปรับเมื่อยกเลิก"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>บริการอาหารเช้า</label>
            <div className=" flex items-center gap-1">
              <input
                className=" w-5 h-5"
                type="radio"
                name="breakfast"
                value="true"
                onChange={handleChange}
                required
              />
              <label htmlFor="breakfast">ใช้บริการ</label>
            </div>
            <div className=" flex items-center gap-1">
              <input
                className=" w-5 h-5"
                type="radio"
                name="breakfast"
                value="false"
                onChange={handleChange}
                required
              />
              <label htmlFor="breakfast">ไม่ใช้บริการ</label>
            </div>
            <input
              className=" mt-1"
              type="number"
              name="breakfastPrice"
              placeholder="ราคาอาหาร"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <div className=" flex items-center gap-1">
              <input
                className=" w-5 h-5"
                type="checkbox"
                name="freeParking"
                onChange={() => setFreeParking((prev) => !prev)}
              />
              <label htmlFor="freeParking">ที่จอดรถฟรี</label>
            </div>
            <div className=" flex items-center gap-1">
              <input
                className=" w-5 h-5"
                type="checkbox"
                name="freeInternet"
                onChange={() => setFreeInternet((prev) => !prev)}
              />
              <label htmlFor="freeInternet">อินเทอร์เน็ตฟรี</label>
            </div>
          </div>

          <div className=" col-span-3 w-full flex flex-col">
            <label htmlFor="description">รายละเอียด</label>
            <textarea
              name="description"
              className=" h-40"
              onChange={handleChange}
              placeholder="รายละเอียดอื่น ๆ"
            />
          </div>

          <button
            className=" font-bold text-[1.2rem] p-2 rounded-md hover:opacity-90 transition-all col-span-3"
            style={{ backgroundColor: clpl.c2 }}
          >
            บันทึก
          </button>
        </div>
        <br />
      </form>
    </div>
  );
}
