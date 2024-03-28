"use client";
import { RootState, useAppSelector } from "@/app/component/GlobalStateWrapper";
import { ep_deleteRoomCard } from "@/config/api_endpoint";
import { clpl } from "@/config/clpl";
import { iconList } from "@/config/iconList";
import Image from "next/image";
import React from "react";
import DetailList from "./DetailList";

export interface RoomCard {
  firstLoadRoomCard: any;
  props: {
    imageId: String[];
    roomId: String;
    roomName: String;
    roomType: String;
    roomSize: Number;
    guestLimit: Number;
    canCancel: Boolean;
    canCancelPrice: Number;
    pricePerDay: Number;
    breakfast: Boolean;
    breakfastPrice: Number;
    freeParking: Boolean;
    freeInternet: Boolean;
    description: String;
    createAt: string;
    _id: String;
  };
}
export default function RoomCard({ firstLoadRoomCard, props }: RoomCard) {
  const base64_load = useAppSelector(
    (state: RootState) => state.loadImage.data
  );
  const {
    imageId,
    roomId,
    roomName,
    roomType,
    roomSize,
    guestLimit,
    canCancel,
    canCancelPrice,
    pricePerDay,
    breakfast,
    breakfastPrice,
    freeParking,
    freeInternet,
    description,
    createAt,
    _id,
  } = props;

  return (
    <div
      style={{ borderColor: clpl.c2 }}
      className=" p-2 rounded-md border border-dashed "
    >
      <div className=" flex justify-between items-center">
        <div>Room Id : {roomId}</div>
        <button
          onClick={async () => {
            await fetch(ep_deleteRoomCard + `/${_id}`, {
              method: "DELETE",
            });
            await firstLoadRoomCard();
          }}
        >
          {iconList.bin}
        </button>
      </div>
      <div className=" w-full overflow-x-auto flex gap-1 snap-x aspect-[1.33]">
        {imageId &&
          imageId.map((i) => {
            const obj = base64_load.filter((j: any) => j._id === i)[0] || [];
            return (
              <Image
                className=" flex-none snap-center"
                key={obj._id}
                src={obj.images}
                height={700}
                width={700}
                alt=""
              />
            );
          })}
      </div>
      <div>
        <div>{`ห้อง ${roomName}`}</div>
        <div>{roomType}</div>
        <div>{`ราคาห้อง ${pricePerDay} บาท/วัน`}</div>
        <DetailList
          iconElement={iconList.area}
          text={`${roomSize} ตารางเมตร`}
        />
        <DetailList
          iconElement={iconList.people}
          text={`พักได้ ${guestLimit} คน`}
        />
        <DetailList
          iconElement={iconList.parking}
          text={freeParking ? "มีที่จอดรถ" : "ไม่มีที่จอดรถ"}
        />
        <DetailList
          iconElement={iconList.wifi}
          text={freeInternet ? "มีอินเทอร์เน็ต" : "ไม่มีอินเทอร์เน็ต"}
        />
        <div>
          {canCancel
            ? `สามารถยกเลิกได้ เพิ่ม ${canCancelPrice} บาท`
            : "ไม่สามารถยกเลิกได้"}
        </div>
        <div>
          {breakfast
            ? `มีอาหารเช้าเพิ่ม ${breakfastPrice} บาท`
            : `ไม่มีอาหารเช้า`}
        </div>
        <div>{description}</div>
        <div>สร้างข้อมูลเมื่อ {createAt}</div>
      </div>
    </div>
  );
}
