import { ep_getSessionIdByOrder_id } from "@/config/api_endpoint";
import { PK_STRIPE } from "@/config/pk_stripe";
import { loadStripe } from "@stripe/stripe-js";

export default function CancelCard({ params }: { params: any }) {
  return (
    <div className=" flex flex-col items-center mt-5">
      <b className=" text-1.2rem">เลขที่รายการ</b>
      <div>{params.orderid}</div>
      <div className=" text-red-400">{"ชำระเงินไม่สำเร็จ โปรดลองอีกครั้ง"}</div>
      <button
        className=" p-2 px-5 bg-blue-500 rounded-md hover:opacity-90 active:scale-90 transition-all m-5"
        onClick={async () => {
          const sessionId = await fetch(
            ep_getSessionIdByOrder_id + "/" + params.orderid
          )
            .then((res) => res.json())
            .then((res) => res["session_id"]);
          const stripe = await loadStripe(PK_STRIPE);
          stripe?.redirectToCheckout({ sessionId });
        }}
      >
        {`ไปชำระเงิน`}
      </button>
    </div>
  );
}
