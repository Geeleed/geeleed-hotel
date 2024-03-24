"use client";

import { ep_signin, ep_stayIn } from "@/config/api_endpoint";
import { clpl } from "@/config/clpl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { setToken } from "./actions";

export default function Signin() {
  const router = useRouter();
  const [formData, setFormData] = useState<any>({});
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(ep_signin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((res) => res.json());
      await setToken(res.token);
      localStorage.setItem("token", res.token);
      (await res.process) ? router.push("/lobby") : alert(res.message);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    const stayIn = async () => {
      if (!localStorage.token) return;
      const res = await fetch(ep_stayIn, {
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        },
      }).then((res) => res.json());
      if (res.process) {
        await setToken(res.token);
        localStorage.setItem("token", res.token);
        router.push("/lobby");
      } else {
        localStorage.removeItem("token");
        router.push("/");
      }
    };
    stayIn();
  }, []);
  return (
    <div
      className=" relative flex justify-center md:bg-[url('/image/visualsofdana-T5pL6ciEn-I-unsplash.jpg')]
       bg-cover bg-center bg-no-repeat h-screen before:absolute before:w-full before:h-full before:bg-[#000000aa]"
      style={{ color: clpl.c4 }}
    >
      <form
        onSubmit={handleSubmit}
        className=" m-[10%] flex flex-col w-full max-w-[30rem] z-[1] md:mx-0 md:p-10 md:h-fit backdrop-blur-md rounded-md"
      >
        <b className=" w-full text-center text-[3rem] my-5">เข้าระบบ</b>
        <label htmlFor="email">อีเมล์</label>
        <input
          ref={emailRef}
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
          ref={passwordRef}
          style={{ color: clpl.c1 }}
          className=" p-2 rounded-md text-[1.2rem] outline-none"
          name="password"
          type="password"
          placeholder="กรอกรหัสผ่าน"
          onChange={handleChange}
          required
        />
        <div className=" flex items-center justify-between my-2">
          {/* <div className=" flex items-center gap-1">
            <input
              type="checkbox"
              className=" aspect-square w-5"
            />
            จำรหัสผ่าน
          </div> */}
          <Link className=" hover:underline" href={"/forgot"}>
            ลืมรหัสผ่าน
          </Link>
        </div>
        <button
          className=" p-2 text-[1.5rem] rounded-md hover:opacity-80 transition-all"
          style={{ backgroundColor: clpl.c2 }}
        >
          เข้าระบบ
        </button>
        <Link className=" hover:underline text-center my-3" href={"/signup"}>
          สมัครสมาชิก
        </Link>
        <Link className=" hover:underline text-center my-3" href={"/"}>
          กลับ
        </Link>
      </form>
    </div>
  );
}
