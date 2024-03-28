"use client";
import { ep_deleteOrder } from "@/config/api_endpoint";
import { clpl } from "@/config/clpl";
import Link from "next/link";
import React from "react";

export default function OrderRow({
  order,
  setAllOrder,
}: {
  order: any;
  setAllOrder: any;
}) {
  const {
    email,
    order_id,
    room_id,
    bookedDate,
    price,
    status,
    guestNote,
    adminNote,
  } = order;
  return (
    <div
      className=" grid grid-cols-12 gap-4 my-1 py-1 border-b text-[0.9rem] px-2"
      style={{ borderColor: clpl.c3 }}
    >
      {/* Order.email */}
      <Link
        className=" hover:underline underline-offset-4"
        href={"mailto:" + email}
      >
        {email}
      </Link>
      {/* Order.order_id */}
      <div className=" col-span-2 text-[0.7rem]">{order_id}</div>
      {/* Order.room_id */}
      <div className=" col-span-2">{room_id}</div>
      {/* Order.bookedDate */}
      <div>
        {bookedDate.map((item: any) => (
          <div key={item}>{item}</div>
        ))}
      </div>
      {/* Order.price */}
      <div>{price + " ฿"}</div>
      {/* Order.status */}
      {status === "complete" ? (
        <div className=" bg-green-500 text-black px-2 rounded-md flex justify-center items-center w-full h-full">
          ชำระแล้ว
        </div>
      ) : (
        <div className=" bg-blue-500 text-black px-2 rounded-md flex justify-center items-center w-full h-full">
          ยังไม่ชำระ
        </div>
      )}
      {/* Order.guestNote */}
      <div className=" col-span-3">{guestNote}</div>
      {/* Order.adminNote */}
      {/* <div className=" col-span-2">{adminNote}</div> */}
      <button
        onClick={async () => {
          const cancel = confirm(
            "การยกเลิกจะเป็นการลบข้อมูลออกจากฐานข้อมูล ทำต่อหรือไม่?"
          );
          if (cancel) {
            await fetch(ep_deleteOrder + "/" + order_id, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((res) => {
                setAllOrder((prev: any) =>
                  prev.filter((item: any) => item.order_id !== order_id)
                );
                alert(res.message);
              });
          }
        }}
        className=" hover:underline underline-offset-4 "
      >
        ยกเลิก
      </button>
    </div>
  );
}
