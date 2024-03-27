"use client";
import { ep_signup } from "@/config/api_endpoint";
import { clpl } from "@/config/clpl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useAuth from "../customHook/useAuth";

export default function Page() {
  return useAuth({ page: <Signup />, currentUrl: "/signup" });
}

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(ep_signup, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((res) => res.json());
      alert(await res.message);
      (await res.process) && router.push("/signin");
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <div
      className=" relative flex justify-center md:bg-[url('/image/visualsofdana-T5pL6ciEn-I-unsplash.jpg')]
       bg-cover bg-center bg-no-repeat h-screen before:absolute before:w-full before:h-full before:bg-[#000000aa]"
      style={{ color: clpl.c4 }}
    >
      <form
        onSubmit={handleSubmit}
        className=" m-[10%] flex flex-col w-full max-w-[30rem] z-[1] md:mx-0 md:p-10 md:h-fit backdrop-blur-md rounded-md md:mt-20"
      >
        <b className=" w-full text-center text-[3rem] my-5">สมัครสมาชิก</b>
        <label htmlFor="email">อีเมล์</label>
        <input
          style={{ color: clpl.c1 }}
          className=" p-2 rounded-md text-[1.2rem] outline-none"
          name="email"
          type="email"
          placeholder="กรอก email"
          onChange={handleChange}
          required
        />
        <label htmlFor="password">รหัสผ่าน</label>
        <input
          style={{ color: clpl.c1 }}
          className=" p-2 rounded-md text-[1.2rem] outline-none"
          name="password"
          type="password"
          placeholder="กรอกรหัสผ่าน"
          onChange={handleChange}
          required
        />
        <label htmlFor="question">คำถามที่ต้องตอบเมื่อลืมรหัสผ่าน</label>
        <input
          style={{ color: clpl.c1 }}
          className=" p-2 rounded-md text-[1.2rem] outline-none"
          name="question"
          type="text"
          placeholder="ตั้งคำถามของคุณ"
          onChange={handleChange}
          required
        />
        <label htmlFor="answer">คำตอบของคุณเมื่อลืมรหัสผ่าน</label>
        <input
          style={{ color: clpl.c1 }}
          className=" p-2 rounded-md text-[1.2rem] outline-none"
          name="answer"
          type="text"
          placeholder="ตั้งคำตอบของคุณ"
          onChange={handleChange}
          required
        />
        <br />
        <button
          className=" p-2 text-[1.5rem] rounded-md hover:opacity-80 transition-all"
          style={{ backgroundColor: clpl.c2 }}
        >
          สมัคร
        </button>
        <Link className=" hover:underline text-center my-3" href={"/signin"}>
          เข้าระบบ
        </Link>
        <Link className=" hover:underline text-center my-3" href={"/"}>
          กลับ
        </Link>
      </form>
    </div>
  );
};
