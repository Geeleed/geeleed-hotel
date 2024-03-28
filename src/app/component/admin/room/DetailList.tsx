"use client";
import { clpl } from "@/config/clpl";
import React from "react";

export default function DetailList({
  iconElement,
  text,
}: {
  iconElement: any;
  text: string;
}) {
  return (
    <div className=" flex gap-2">
      <div className=" w-5" style={{ fill: clpl.c4 }}>
        {iconElement}
      </div>
      <label className=" flex w-full">{text}</label>
    </div>
  );
}
