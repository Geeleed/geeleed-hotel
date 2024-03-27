"use client";
import { ep_getOrderByEmail } from "@/config/api_endpoint";
import { clpl } from "@/config/clpl";
import React, { useEffect, useState } from "react";
import { RootState, useAppSelector } from "@/app/component/GlobalStateWrapper";
import useAuth from "@/app/customHook/useAuth";
import Card from "../../component/me/Card";

export default function Page() {
  return useAuth({ page: <Me />, currentUrl: "/lobby/me" });
}

const Me = () => {
  const [trigger, setTrigger] = useState(false);
  const loadRoom = useAppSelector((state: RootState) => state.loadRoom.data);
  const [room, setRoom] = useState(loadRoom || []);
  const [order, setOrder] = useState([]);
  const loadOrder = async () => {
    const res = await fetch(ep_getOrderByEmail, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => res.json());
    setOrder(res);
  };
  useEffect(() => {
    loadOrder();
  }, [trigger]);
  return (
    <div className=" flex justify-center">
      <div
        className="flex justify-center gap-2 flex-wrap md:max-w-[80%] w-full"
        style={{ color: clpl.c4 }}
        onClick={() => {
          setTrigger(!trigger);
        }}
      >
        {order.length > 0 &&
          order
            .map((item: any) => <Card key={item._id} data={item} room={room} />)
            .reverse()}
      </div>
    </div>
  );
};

const monthTH: any = {
  Jan: "ม.ค.",
  Feb: "ก.พ.",
  Mar: "มี.ค.",
  Apr: "เม.ษ.",
  May: "พ.ค.",
  Jun: "มิ.ย.",
  Jul: "ก.ค.",
  Aug: "ส.ค.",
  Sep: "ก.ย.",
  Oct: "ต.ค.",
  Nov: "พ.ย.",
  Dec: "ธ.ค.",
};

export const formatDateThai = (MMDDYYYY: string) => {
  const mmddyyyy = MMDDYYYY.split(" ");
  return `วันที่ ${mmddyyyy[1]} ${monthTH[mmddyyyy[0]]} ${mmddyyyy[2]}`;
};
