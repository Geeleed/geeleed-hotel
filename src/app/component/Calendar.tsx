"use client";
import { clpl } from "@/config/clpl";
import { range } from "@/config/utils";
import React from "react";

export default function Calendar({
  monthIndex,
  year,
  bookedDate,
  markDateState,
}: {
  monthIndex: number;
  year: number;
  bookedDate?: string[];
  markDateState: any;
}) {
  const month = monthNames[monthIndex];
  const time_1 = `${month} 1 ${year}`;
  const dayNumber = (number: number) => `${month} ${number} ${year}`;
  const start = new Date(time_1).getDay();
  let day = [];
  let num2;
  const booked = bookedDate?.map((item) => new Date(item).getTime());
  for (let i = 1; i < 33; i++) {
    const num = new Date(dayNumber(i)).getDate();
    let status = "available";
    if (booked?.includes(new Date(dayNumber(i)).getTime())) {
      status = "booked";
    }
    num2 = new Date(dayNumber(i - 1)).getDate();
    if (num < num2 || isNaN(num)) {
      break;
    }
    const calen = `${month} ${i} ${year}`;
    day.push({ calen, num, status });
  }
  return (
    <div>
      <div className=" grid grid-cols-7 gap-1 text-[0.6rem] md:text-[1rem] font-bold">
        {[
          "อาทิตย์",
          "จันทร์",
          "อังคาร",
          "พุธ",
          "พฤหัสบดี",
          "ศุกร์",
          "เสาร์",
        ].map((item) => (
          <div
            key={item}
            className=" w-full text-center py-2 rounded-md"
            style={{ backgroundColor: clpl.c3 }}
          >
            {item}
          </div>
        ))}
        {range(1, start).map((item) => (
          <div key={item}></div>
        ))}
        {day.map((item) => (
          <DayPad
            key={item.calen}
            calen={item.calen}
            number={item.num}
            status={item.status}
            markDateState={markDateState}
          />
        ))}
      </div>
    </div>
  );
}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DayPad = ({
  calen,
  number,
  status,
  markDateState,
}: {
  calen: string;
  number: number;
  status: string;
  markDateState: any;
}) => {
  const notAllow =
    status === "booked" || new Date(calen).getTime() < new Date().getTime();
  const check = () => {
    if (status === "available") {
      markDateState.setMarkDate((prev0: string[]) => {
        const prev = new Array(...prev0);
        if (prev.indexOf(calen) >= 0) prev.splice(prev.indexOf(calen), 1);
        else prev.push(calen);
        return prev;
      });
    }
  };
  const checkSelfMarked = () => markDateState.markDate.includes(calen);

  return (
    <div
      onClick={() => {
        if (notAllow) return;
        check();
      }}
      className={
        (notAllow &&
          " bg-black text-white cursor-not-allowed active:scale-100") +
        " w-full aspect-square border rounded-md p-2 cursor-pointer active:scale-90 transition-all font-bold"
      }
      style={{
        borderColor: clpl.c3,
        backgroundColor: checkSelfMarked() && clpl.c2,
      }}
    >
      <div>{number}</div>
      {checkSelfMarked() && "จอง"}
      {notAllow && "ไม่ว่าง"}
    </div>
  );
};
