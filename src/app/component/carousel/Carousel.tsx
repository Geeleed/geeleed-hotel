import Image from "next/image";

import React, { useEffect, useState } from "react";

export default function Carousel({
  images_src,
  time_ms,
}: {
  images_src: string[];
  time_ms: number;
}) {
  const [image_src, setImage_src] = useState(images_src[images_src.length - 1]);
  useEffect(() => {
    let index = 0;
    const len = images_src.length;
    const timeIntervalId = setInterval(() => {
      setImage_src(images_src[index]);
      if (index === len - 1) index = 0;
      else index++;
    }, time_ms);

    return () => clearTimeout(timeIntervalId);
  }, []);
  return (
    <div className=" w-full overflow-hidden aspect-[1.618]">
      {
        <Image
          key={image_src}
          src={image_src}
          height={700}
          width={700}
          alt=""
          className={` w-full animate-[fade_ease-in_infinite]`}
          style={{ animationDuration: `${time_ms}ms` }}
        />
      }
    </div>
  );
}
