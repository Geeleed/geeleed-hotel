import { useRouter } from "next/navigation";

export default function SuccessCard({ params }: { params: any }) {
  const router = useRouter();

  return (
    <div className=" flex flex-col items-center mt-5">
      <b className=" text-1.2rem">เลขที่รายการ</b>
      <div>{params.orderid}</div>
      <div className=" text-green-400">{"ชำระเงินเรียบร้อย"}</div>
      <button
        className=" p-2 px-5 bg-blue-500 rounded-md hover:opacity-90 active:scale-90 transition-all m-5"
        onClick={() => router.push("/lobby")}
      >
        {`ดูห้องต่อ`}
      </button>
    </div>
  );
}
