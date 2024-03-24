"use client";
import {
  ep_deleteSessionByOrderId,
  ep_getOrderByEmail,
  ep_loadRoomBy_id,
  ep_order,
} from "@/config/api_endpoint";
import { clpl } from "@/config/clpl";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { PK_STRIPE } from "@/config/pk_stripe";
import { iconList } from "@/config/iconList";
import { clearExpireSession } from "../page";
import { RootState, useAppSelector } from "@/app/component/GlobalStateWrapper";

export default function Me() {
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
        {order &&
          order
            .map((item: any) => <Card key={item._id} data={item} room={room} />)
            .reverse()}
      </div>
    </div>
  );
}

const Card = ({ data }: any) => {
  const { email, session_id, status, order_id, room_id } = data;
  const [thisRoom, setThisRoom] = useState<any>();
  const [orders, setOrders] = useState<any>();
  const loadRoomBy_id = async () => {
    const res = await fetch(ep_loadRoomBy_id + "/" + room_id).then((res) =>
      res.json()
    );
    setThisRoom(res);
  };
  const loadOrder = async () => {
    const res = await fetch(ep_order + "/" + order_id, {}).then((res) =>
      res.json()
    );
    setOrders(res);
  };
  useEffect(() => {
    loadOrder();
    loadRoomBy_id();
    clearExpireSession();
  }, []);
  let place = Boolean(thisRoom && orders);
  return (
    place && (
      <div
        className=" relative max-w-[25rem] grid grid-cols-1 gap-1 border border-dashed p-2 rounded-md"
        style={{ borderColor: clpl.c4 }}
      >
        {status !== "complete" && (
          <button
            className=" absolute top-0 right-0 p-3"
            onClick={async () => {
              await fetch(ep_deleteSessionByOrderId + "/" + order_id, {
                method: "DELETE",
              });
            }}
          >
            {iconList.bin}
          </button>
        )}
        <div className=" p-2 rounded-md" style={{ backgroundColor: clpl.c2 }}>
          <div>เลขที่รายการ</div>
          <p>{order_id}</p>
        </div>
        <div>{`ห้อง ${thisRoom["roomName"]}`}</div>
        <div>{`ห้อง ${thisRoom["roomType"]}`}</div>
        <div>{`ไม่เกิน ${thisRoom["guestLimit"]} คน`}</div>
        <div>{`ยอดรวม ${orders["price"]} บาท`}</div>
        <div>{`ใช้บริการ ${orders["bookedDate"].length} วัน`}</div>
        <div>
          {orders["bookedDate"].map((item: any) => (
            <div key={item}>{formatDateThai(item)}</div>
          ))}
        </div>
        <div>ผู้ใช้บริการ</div>
        <div className=" max-h-40 overflow-y-auto">
          {orders["guestInfo"].map((item: any, index: number) => (
            <div key={index}>
              {` ${index + 1}. ${item["firstname"]} ${item["lastname"]} ${
                item["phoneNumber"]
              }`}
            </div>
          ))}
        </div>
        <div>หมายเหตุ</div>
        <div>{orders["guestNote"]}</div>
        {status === "complete" ? (
          <b className=" p-2 bg-green-500 rounded-md text-black text-center">
            ชำระเงินเรียบร้อย
          </b>
        ) : (
          <button
            className=" p-2 bg-blue-500 rounded-md"
            onClick={async () => {
              const stripe = await loadStripe(PK_STRIPE);
              stripe?.redirectToCheckout({ sessionId: session_id });
            }}
          >
            {`ชำระเงิน ${orders["price"]} บาท`}
          </button>
        )}
      </div>
    )
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

const formatDateThai = (MMDDYYYY: string) => {
  const mmddyyyy = MMDDYYYY.split(" ");
  return `วันที่ ${mmddyyyy[1]} ${monthTH[mmddyyyy[0]]} ${mmddyyyy[2]}`;
};
