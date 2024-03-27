"use client";
import Link from "next/link";
import { ep_loadImage } from "@/config/api_endpoint";
import { useEffect } from "react";
import {
  RootState,
  actions,
  useAppDispatch,
  useAppSelector,
} from "@/app/component/GlobalStateWrapper";
import { clpl } from "@/config/clpl";
import useAdmin from "@/app/customHook/useAdmin";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return useAdmin(<AdminLayout>{children}</AdminLayout>);
}

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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
      <div className=" sticky top-0 " style={{ backgroundColor: clpl.c1 }}>
        <nav className=" flex gap-2 w-full justify-center pb-2">
          <Link
            className=" hover:underline underline-offset-4"
            href={"/lobby/admin/gallery"}
          >
            เพิ่มภาพ
          </Link>
          <Link
            className=" hover:underline underline-offset-4"
            href={"/lobby/admin/room"}
          >
            รายการห้อง
          </Link>
          <Link
            className=" hover:underline underline-offset-4"
            href={"/lobby/admin/room/newRoom"}
          >
            เพิ่มห้องใหม่
          </Link>
        </nav>
      </div>
      {children}
    </div>
  );
};
