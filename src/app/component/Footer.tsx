import { clpl } from "@/config/clpl";
import React from "react";
import MyContact from "./MyContact";

export default function Footer() {
  return (
    <footer
      className=" w-full p-5 lg:py-10"
      style={{ backgroundColor: clpl.c1, color: clpl.c4 }}
    >
      <b className=" text-[1.3rem] lg:text-[1.8rem]">ติดต่อสอบถามเพิ่มเติม</b>
      <p className=" lg:text-[1.3rem]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste inventore,
        ea commodi totam a officia! Veritatis expedita reprehenderit molestiae
        praesentium!
      </p>
      <hr style={{ borderColor: clpl.c4, margin: "5px 0px" }} />
      <div className=" lg:text-[1.2rem]">
        <MyContact />
      </div>
    </footer>
  );
}
