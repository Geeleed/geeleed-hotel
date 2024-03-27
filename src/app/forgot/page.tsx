"use client";
import { ep_forgot, ep_reset } from "@/config/api_endpoint";
import { clpl } from "@/config/clpl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useAuth from "../customHook/useAuth";

export default function Page() {
  return useAuth({ page: <Forgot />, currentUrl: "/forgot" });
}

const Forgot = () => {
  const [formData, setFormData] = useState<any>({});
  const [question, setQuestion] = useState();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(ep_forgot, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((res) => res.json());
      res.process && setQuestion(res.question);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <div
      className=" relative flex justify-center md:bg-[url('/image/visualsofdana-T5pL6ciEn-I-unsplash.jpg')]
       bg-cover bg-center bg-no-repeat h-screen before:absolute before:w-full before:h-full before:bg-[#000000aa]"
      style={{ color: clpl.c4 }}
    >
      <form
        onSubmit={handleSubmit}
        className=" mx-[10%] flex flex-col w-full max-w-[30rem] z-[1] md:mx-0 md:p-10 md:h-screen backdrop-blur-md rounded-md"
      >
        <b className=" w-full text-center text-[3rem] my-5">เปลี่ยนรหัส</b>
        <label htmlFor="email">อีเมล์</label>
        <input
          onChange={handleChange}
          style={{ color: clpl.c1 }}
          className=" p-2 rounded-md text-[1.2rem] outline-none mb-2"
          name="email"
          type="email"
          placeholder="กรอก email"
        />
        <button
          className=" p-2 text-[1.5rem] rounded-md hover:opacity-80 transition-all mb-2"
          style={{ backgroundColor: clpl.c2 }}
        >
          ขอเปลี่ยนรหัส
        </button>
        {question && <Reset email={formData["email"]} question={question} />}
        <br />
        <Link className=" hover:underline text-center my-3" href={"/signin"}>
          เข้าระบบ
        </Link>
        <Link className=" hover:underline text-center my-3" href={"/signup"}>
          สมัครสมาชิก
        </Link>
        <Link className=" hover:underline text-center my-3" href={"/"}>
          กลับ
        </Link>
      </form>
    </div>
  );
};

const Reset = ({ email, question }: { email: string; question: string }) => {
  const [formData, setFormData] = useState<any>({});
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(ep_reset, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          answer: formData["answer"],
          newPassword: formData["newPassword"],
          confirmPassword: formData["confirmPassword"],
        }),
      }).then((res) => res.json());
      if (res.process) {
        localStorage.setItem("token", res.token);
        alert(res.message);
        router.push("/lobby");
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <form className=" flex flex-col w-full">
      <label htmlFor="question">คำถาม</label>
      <p className="text-center text-[1.3rem] my-5">{question}</p>
      <label htmlFor="answer">คำตอบ</label>
      <input
        name="answer"
        onChange={handleChange}
        style={{ color: clpl.c1 }}
        className=" p-2 rounded-md text-[1.2rem] outline-none"
        type="text"
        placeholder="คำตอบของคุณ"
      />
      <label htmlFor="newPassword">รหัสผ่านใหม่</label>
      <input
        name="newPassword"
        onChange={handleChange}
        style={{ color: clpl.c1 }}
        className=" p-2 rounded-md text-[1.2rem] outline-none"
        type="password"
        placeholder="กรอกรหัสผ่านใหม่"
      />
      <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</label>
      <input
        name="confirmPassword"
        onChange={handleChange}
        style={{ color: clpl.c1 }}
        className=" p-2 rounded-md text-[1.2rem] outline-none"
        type="password"
        placeholder="ยืนยันรหัสผ่าน"
      />
      <br />
      <button
        onClick={handleSubmit}
        className=" p-2 text-[1.5rem] rounded-md hover:opacity-80 transition-all"
        style={{ backgroundColor: clpl.c2 }}
      >
        ยืนยันการเปลี่ยนรหัส
      </button>
    </form>
  );
};
