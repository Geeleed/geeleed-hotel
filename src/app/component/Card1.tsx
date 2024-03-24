import { clpl } from "@/config/clpl";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export default function Card1({
  content,
  scroll,
}: {
  content: any;
  scroll: any;
}) {
  const thisRef = useRef<HTMLDivElement>(null);
  const i = content;
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    const elementHeight = Number(
      thisRef.current?.getBoundingClientRect().height
    );
    const elementPositionY = Number(
      thisRef.current?.getBoundingClientRect().top
    );
    const came = scroll.clientHeight - elementPositionY;
    if (came > 50) setDisplay(true);
    if (came > scroll.clientHeight + elementHeight * 0.85) setDisplay(false);
    if (came < 100) setDisplay(false);
  }, [scroll]);
  return (
    <div
      ref={thisRef}
      key={i.imageSrc}
      className={
        (display ? "opacity-100" : "opacity-0") +
        " relative w-full transition-all duration-500 aspect-[1.618] lg:aspect-[1.3]"
      }
      style={{ backgroundColor: clpl.c1, color: clpl.c4 }}
    >
      <div className=" w-full h-full overflow-hidden">
        <Image
          className=" h-full w-full"
          src={i.imageSrc}
          height={700}
          width={700}
          alt=""
          quality={50}
        />
      </div>
      <div className=" absolute top-0 left-0 hover:opacity-0 transition-all duration-500 w-full h-full">
        <b
          className=" text-[1.2rem] absolute top-0 left-0 w-fit m-1 px-5 py-1 z-[1]"
          style={{ backgroundColor: clpl.c1 + "88", color: clpl.c4 }}
        >
          {i.roomName}
        </b>
        <p
          className=" leading-none text-[0.9rem] absolute bottom-0 left-0 w-full px-5 py-3"
          style={{ backgroundColor: clpl.c1 + "88", color: clpl.c4 }}
        >
          {i.detail}
        </p>
      </div>
    </div>
  );
}
