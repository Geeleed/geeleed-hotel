"use client";

import {
  RootState,
  actions,
  useAppDispatch,
  useAppSelector,
} from "@/app/component/GlobalStateWrapper";
import useAuth from "@/app/customHook/useAuth";
import {
  ep_deleteRoomCard,
  ep_loadImage,
  ep_loadRoom,
} from "@/config/api_endpoint";
import { clpl } from "@/config/clpl";
import { iconList } from "@/config/iconList";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Page() {
  return useAuth({ page: <Room />, currentUrl: "/lobby/admin/room" });
}

const Room = () => {
  const [roomCard, setRoomCard] = useState<object[]>();
  const base64_load = useAppSelector(
    (state: RootState) => state.loadImage.data
  );
  const setBase64_load = useAppDispatch();
  const firstLoadImageFromMongo = async () => {
    await fetch(ep_loadImage)
      .then((res) => res.json())
      .then((res) => setBase64_load(actions.loadImage.setLoadImage(res.data)));
  };
  useEffect(() => {
    !base64_load && firstLoadImageFromMongo();
  }, []);
  const firstLoadRoomCard = async () => {
    await fetch(ep_loadRoom)
      .then((res) => res.json())
      .then((data) => {
        setRoomCard(data);
      });
  };
  useEffect(() => {
    firstLoadRoomCard();
  }, []);
  return (
    <div className=" px-2 md:px-[10%]">
      <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1">
        {roomCard &&
          roomCard.map((item: any) => (
            <RoomCard
              firstLoadRoomCard={firstLoadRoomCard}
              key={item._id}
              imageId={item.imageId}
              roomId={item.roomId}
              roomName={item.roomName}
              roomType={item.roomType}
              roomSize={item.roomSize}
              guestLimit={item.guestLimit}
              canCancel={item.canCancel}
              canCancelPrice={item.canCancelPrice}
              pricePerDay={item.pricePerDay}
              breakfast={item.breakfast}
              breakfastPrice={item.breakfastPrice}
              freeParking={item.freeParking}
              freeInternet={item.freeInternet}
              description={item.description}
              createAt={item.createAt}
              _id={item._id}
            />
          ))}
      </div>
    </div>
  );
};

interface RoomCard {
  firstLoadRoomCard: any;
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
}
const RoomCard = ({
  firstLoadRoomCard,
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
}: RoomCard) => {
  const base64_load = useAppSelector(
    (state: RootState) => state.loadImage.data
  );
  return (
    <div
      style={{ borderColor: clpl.c2 }}
      className=" p-2 rounded-md border border-dashed"
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
};

const DetailList = ({
  iconElement,
  text,
}: {
  iconElement: any;
  text: string;
}) => {
  return (
    <div className=" flex gap-2">
      <div className=" w-5" style={{ fill: clpl.c4 }}>
        {iconElement}
      </div>
      <label className=" flex w-full">{text}</label>
    </div>
  );
};
