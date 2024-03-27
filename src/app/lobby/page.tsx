"use client";
import { ep_loadImage, ep_loadRoom, ep_stayIn } from "@/config/api_endpoint";
import { clpl } from "@/config/clpl";
import { iconList } from "@/config/iconList";
import Image from "next/image";
import React, { useEffect } from "react";
import {
  RootState,
  actions,
  useAppDispatch,
  useAppSelector,
} from "../component/GlobalStateWrapper";
import Link from "next/link";
import { clearExpireSession } from "./clearExpireSession";
import useAuth from "../customHook/useAuth";

export default function Page() {
  return useAuth({ page: <Lobby />, currentUrl: "/lobby" });
}

const Lobby = () => {
  const dispatch = useAppDispatch();
  const base64 = useAppSelector((state: RootState) => state.loadImage.data);
  const room = useAppSelector((state: RootState) => state.loadRoom.data);
  const getRoom = async () => {
    const res = await fetch(ep_loadRoom).then((res) => res.json());
    dispatch(actions.loadRoom.setLoadRoom(await res));
  };
  const getImage = async () => {
    const res = await fetch(ep_loadImage).then((res) => res.json());
    dispatch(actions.loadImage.setLoadImage(await res.data));
  };
  useEffect(() => {
    !room && getRoom();
    !base64 && getImage();
    clearExpireSession();
  }, []);
  return (
    <div
      className=" flex flex-col items-center w-full px-5 md:px-0"
      style={{ backgroundColor: clpl.c3, color: clpl.c1 }}
    >
      <br />
      <section>
        <h1 className=" text-[2.5rem]">ห้องพัก</h1>
        <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1">
          {room &&
            room
              .filter((o: RootState) =>
                roomGroup["sleep"].includes(o["roomType"])
              )
              .map((item: RootState) => (
                <RoomCard key={item._id} roomData={item} base64={base64} />
              ))}
        </div>
      </section>
      <br />
      <section>
        <h1 className=" text-[2.5rem]">สถานที่จัดการประชุม</h1>
        <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1">
          {room &&
            room
              .filter((o: RootState) =>
                roomGroup["meet"].includes(o["roomType"])
              )
              .map((item: RootState) => (
                <RoomCard key={item._id} roomData={item} base64={base64} />
              ))}
        </div>
      </section>
      <br />
      <section>
        <h1 className=" text-[2.5rem]">สถานที่จัดงานปาตี้</h1>
        <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1">
          {room &&
            room
              .filter((o: RootState) =>
                roomGroup["party"].includes(o["roomType"])
              )
              .map((item: RootState) => (
                <RoomCard key={item._id} roomData={item} base64={base64} />
              ))}
        </div>
      </section>
      <br />
    </div>
  );
};
const roomGroup = {
  sleep: [
    "ห้องสแตนดาร์ด",
    "ห้องซูพีเรีย",
    "ห้องดีลักซ์",
    "ห้องสวีท",
    "ห้องฮันนีมูน",
    "ห้องจัดแต่งตามคำขอ",
  ],
  meet: ["ห้องโถง", "ห้องประชุม", "ห้องสัมมนา"],
  party: ["ห้องจัดงานเลี้ยงขนาดเล็ก", "ห้องจัดงานเลี้ยงขนาดใหญ่"],
};

const RoomCard = ({ base64, roomData }: any) => {
  return (
    <div
      style={{ backgroundColor: clpl.c1, color: clpl.c4 }}
      className=" p-3 rounded-lg flex flex-col justify-between md:max-w-[20rem] w-full "
    >
      <div>
        <div className=" flex justify-between items-center"></div>
        <div className=" w-full overflow-x-auto flex gap-1 snap-x">
          {roomData.imageId &&
            roomData.imageId.map((i: any) => {
              const obj =
                (base64 && base64.filter((j: any) => j._id === i)[0]) || [];
              return (
                obj.images && (
                  <Image
                    className=" flex-none snap-center w-full aspect-[1.33] rounded-md"
                    key={obj._id}
                    src={obj.images}
                    height={700}
                    width={700}
                    alt=""
                  />
                )
              );
            })}
        </div>
        <div>
          <div>{`ห้อง ${roomData.roomName}`}</div>
          <div>{roomData.roomType}</div>
          <div className=" font-bold text-[1.2rem] bg-blue-500 px-3 rounded-md text-black flex items-center w-fit">{`฿ ${roomData.pricePerDay} บาท/วัน`}</div>
          <DetailList
            iconElement={iconList.area}
            text={`${roomData.roomSize} ตารางเมตร`}
          />
          <DetailList
            iconElement={iconList.people}
            text={`พักได้ ${roomData.guestLimit} คน`}
          />
          <DetailList
            iconElement={iconList.parking}
            text={roomData.freeParking ? "มีที่จอดรถ" : "ไม่มีที่จอดรถ"}
          />
          <DetailList
            iconElement={iconList.wifi}
            text={
              roomData.freeInternet ? "มีอินเทอร์เน็ต" : "ไม่มีอินเทอร์เน็ต"
            }
          />
          <div className=" font-bold">รายละเอียด</div>
          <p className=" max-h-[10rem]">{roomData.description}</p>
        </div>
      </div>

      <Link
        href={`/lobby/${roomData._id}`}
        className=" flex justify-center w-full p-1 text-[1.3rem] font-bold hover:opacity-90 rounded-md"
        style={{ backgroundColor: clpl.c2 }}
      >
        จอง
      </Link>
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
