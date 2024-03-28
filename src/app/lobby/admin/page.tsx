"use client";

import { ep_loadAllOrder } from "@/config/api_endpoint";
import { clpl } from "@/config/clpl";
import React, { useEffect, useState } from "react";
import OrderRow from "../../component/admin/OrderRow";
// import useAuth from "@/app/customHook/useAuth";

// export default function Page() {
//   return useAuth({ page: <Admin />, currentUrl: "/lobby/admin" });
// }

export default function Admin() {
  const [allOrder, setAllOrder] = useState([]);
  const loadOrder = async () => {
    await fetch(ep_loadAllOrder)
      .then((res) => res.json())
      .then((res) => setAllOrder(res));
  };
  useEffect(() => {
    loadOrder();
  }, []);
  return (
    <div className=" w-screen overflow-auto">
      <div className=" flex flex-col items-center min-w-[1600px]">
        <div className="">
          <div
            className=" grid grid-cols-12 gap-4 text-[1.1rem] border-y-4 p-2"
            style={{ borderColor: clpl.c2 }}
          >
            <div>{"Email "}</div>
            <div className=" col-span-2">{"เลขที่รายการ "}</div>
            <div className=" col-span-2">{"ไอดีห้อง (ObjectId) "}</div>
            <div>{"วันที่ใช้บริการ "}</div>
            <div>{"ยอดชำระ "}</div>
            <div>{"สถานะการชำระ "}</div>
            <div className=" col-span-3">{"หมายเหตุลูกค้า "}</div>
            {/* <div className=" col-span-2">{"หมายเหตุจากแอดมิน "}</div> */}
            <div>ยกเลิก</div>
          </div>
          {allOrder &&
            allOrder.map((item: any) => (
              <OrderRow
                key={item.order_id}
                order={item}
                setAllOrder={setAllOrder}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
