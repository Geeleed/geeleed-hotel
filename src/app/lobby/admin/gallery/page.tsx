"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ep_deleteImage,
  ep_loadImage,
  ep_uploadImage,
} from "@/config/api_endpoint";
import {
  RootState,
  actions,
  useAppDispatch,
  useAppSelector,
} from "@/app/component/GlobalStateWrapper";
import { iconList } from "@/config/iconList";
import { clpl } from "@/config/clpl";
import useAuth from "@/app/customHook/useAuth";

export default function Page() {
  return useAuth({ page: <Gallery />, currentUrl: "/lobby/admin/gallery" });
}

const Gallery = () => {
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [base64Images, setBase64Images] = useState<string[]>([]);
  const base64_load = useAppSelector(
    (state: RootState) => state.loadImage.data
  );
  const setBase64_load = useAppDispatch();
  const firstLoadImageFromMongo = async () => {
    await fetch(ep_loadImage)
      .then((res) => res.json())
      .then((res) => setBase64_load(actions.loadImage.setLoadImage(res.data)));
  };
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      let imagesArray: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        const file = files[i];
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (reader.result) {
            imagesArray.push(reader.result as string);
            if (imagesArray.length === files.length) {
              setBase64Images(imagesArray);
            }
          }
        };
      }
    }
  };

  useEffect(() => {
    !base64_load && firstLoadImageFromMongo();
  }, []);
  return (
    <div className=" md:px-[10%]">
      <div style={{ color: clpl.c4 }}>
        <div className=" h-12 flex justify-between items-center my-1">
          <div
            className=" h-full border-2 border-dashed flex items-center px-3 cursor-pointer hover:opacity-90 transition-all"
            style={{ borderColor: clpl.c4 }}
            onClick={() => inputImageRef.current?.click()}
          >
            เลือกรูปภาพจากอุปกรณ์
          </div>
          <input
            className=" hidden"
            ref={inputImageRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <div className=" h-full flex gap-1">
            <button
              className=" px-3 h-full  flex justify-center items-center hover:opacity-90 transition-all"
              style={{ backgroundColor: clpl.c2 }}
              onClick={() => {
                setBase64Images([]);
                inputImageRef.current!.value = "";
              }}
            >
              ยกเลิก
            </button>
            <button
              className=" px-3 h-full  flex justify-center items-center hover:opacity-90 transition-all"
              style={{ backgroundColor: clpl.c2 }}
              onClick={async () => {
                await fetch(ep_uploadImage, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ images: base64Images }),
                });
                setBase64Images([]);
                inputImageRef.current!.value = "";
                await firstLoadImageFromMongo();
              }}
            >
              ยืนยันอัปโหลด
            </button>
          </div>
        </div>
        <div className=" grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {base64Images &&
            base64Images.map((BASE64, index) => (
              <Image
                key={index}
                className=" w-full"
                src={BASE64}
                height={100}
                width={600}
                alt=""
              />
            ))}
        </div>
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          {base64_load &&
            base64_load.map((data: any) => (
              <div
                key={data._id}
                className=" flex flex-col p-1 rounded-md border border-dashed "
                style={{ borderColor: clpl.c2 }}
              >
                <div className=" flex justify-between text-[0.7rem] mb-1">
                  <label>{data._id}</label>
                  <button
                    onClick={async () => {
                      await fetch(ep_deleteImage + `/${data._id}`, {
                        method: "DELETE",
                      });
                      await firstLoadImageFromMongo();
                    }}
                  >
                    {iconList.bin}
                  </button>
                </div>
                <div className=" overflow-hidden ">
                  <Image
                    className=" w-full hover:scale-110 transition-all aspect-[1.33]"
                    src={data.images}
                    height={100}
                    width={600}
                    alt=""
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
