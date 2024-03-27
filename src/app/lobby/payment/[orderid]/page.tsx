"use client";
import CancelCard from "@/app/component/CancelCard";
import SuccessCard from "@/app/component/SuccessCard";
import useAuth from "@/app/customHook/useAuth";
import { ep_order } from "@/config/api_endpoint";
import React, { useEffect, useState } from "react";

// export default function ({ params }: { params: { orderid: string } }) {
//   return useAuth({
//     page: <Payment params={params} />,
//     currentUrl: "/lobby/payment/[orderid]",
//   });
// }

export default function Payment({ params }: { params: { orderid: string } }) {
  const [paymemt, setPaymemt] = useState<any>();
  const getStatus = async () => {
    const res = await fetch(ep_order + "/" + params.orderid).then((res) =>
      res.json()
    );
    setPaymemt(res);
  };
  useEffect(() => {
    getStatus();
  }, []);
  return (
    <div className=" flex justify-center">
      {paymemt && paymemt["status"] === "complete" ? (
        <SuccessCard params={params} />
      ) : (
        <CancelCard params={params} />
      )}
    </div>
  );
}
