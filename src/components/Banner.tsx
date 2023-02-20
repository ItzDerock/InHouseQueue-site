import Image from "next/image";
import React from "react";
import banner from "../assets/banner.webp";

// the banner props
export type BannerProps = {
  children: React.ReactNode,
};

// banner component
export default function Banner(props: BannerProps) {
  return (
    <div className="flex items-center justify-center w-full min-h-[67vh] relative">
      {/* background image */}
      <Image 
        src={banner}
        alt="In-House Queue Decorative Banner"
        className="absolute z-0 top-0 left-0 bottom-0 right-0 h-full w-full object-cover select-none"
        fill
        priority // this is an important image
        placeholder="blur" // blur the image until it loads
        quality={100} // no compression
      />

      {/* gradient */}
      <div
        className="absolute z-10 top-0 left-0 h-full w-full object-cover bg-gradient-to-b from-transparent to-background-main"
      />

      {/* banner content */}
      <div className="relative z-20">
        {props.children}
      </div>
    </div>
  );
}