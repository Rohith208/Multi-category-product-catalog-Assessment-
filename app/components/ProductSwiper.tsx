"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

type Item = {
  index: number;
  itemname: string;
  image: string;
};

type Props = {
  items: Item[];
};

export default function ProductSwiper({ items }: Props) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      // navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 2500 }}
      loop
      className="h-40 sm:h-64 rounded-2xl"
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          <Link href={`/product/${item.index}`}>
          <div className="relative w-full h-full">
            <Image
              src={item.image}
              alt={item.itemname}
              fill
              // className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <span className="absolute top-4 right-4 text-white text-sm font-semibold bg-black/40 px-3 py-1 rounded-lg backdrop-blur-sm">
              {item.itemname}
            </span>
          </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}