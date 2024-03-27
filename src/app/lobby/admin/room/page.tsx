"use client";

import {
  RootState,
  actions,
  useAppDispatch,
  useAppSelector,
} from "@/app/component/GlobalStateWrapper";
import useAuth from "@/app/customHook/useAuth";
import { ep_loadImage, ep_loadRoom } from "@/config/api_endpoint";
import React, { useEffect, useState } from "react";
import RoomCard from "../../../component/room/RoomCard";

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
              key={item._id}
              firstLoadRoomCard={firstLoadRoomCard}
              props={{ ...item }}
            />
          ))}
      </div>
    </div>
  );
};
