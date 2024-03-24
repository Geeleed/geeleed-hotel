"use client";
import Link from "next/link";
import {
  RootState,
  actions,
  useAppDispatch,
  useAppSelector,
} from "../component/GlobalStateWrapper";
import { ep_loadImage } from "@/config/api_endpoint";
import { useEffect } from "react";
import Signout from "../component/Signout";
import Footer from "../component/Footer";
import { clpl } from "@/config/clpl";

export default function LobyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
  return (
    <div style={{ color: clpl.c4 }}>
      <div
        className=" sticky top-0 z-[1] flex justify-between items-center md:px-20"
        style={{ backgroundColor: clpl.c1 }}
      >
        <div className=" flex flex-col justify-between items-center w-full md:flex-row">
          <div className=" font-bold text-[1.5rem] md:text-[2rem]">
            Geeleed Hotel
          </div>
          <nav className=" flex gap-4 items-center pb-3">
            <Link
              className=" translate-y-1 transition-all hover:translate-y-0 hover:underline underline-offset-8"
              href={"/lobby"}
            >
              รายการห้อง
            </Link>
            <Link
              className=" translate-y-1 transition-all hover:translate-y-0 hover:underline underline-offset-8"
              href={"/lobby/me"}
            >
              การจองของฉัน
            </Link>
            <Link
              className=" translate-y-1 transition-all hover:translate-y-0 hover:underline underline-offset-8"
              href={"/lobby/admin"}
            >
              ผู้ดูแล
            </Link>
            <div className=" translate-y-1 transition-all hover:translate-y-0 hover:underline underline-offset-8">
              <Signout />
            </div>
          </nav>
        </div>
      </div>
      {children}
      <Footer />
    </div>
  );
}
