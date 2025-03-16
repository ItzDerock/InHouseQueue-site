import Image, { type StaticImageData } from "next/image";
import React from "react";
import { Bebas_Neue } from "next/font/google";
import { twMerge } from "tailwind-merge";
import bannerImage from "../assets/banner_bg.webp";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  preload: true,
  display: "swap",
  fallback: ["sans-serif"],
});

// the banner props
export type BannerProps = {
  children?: React.ReactNode;
  image?: StaticImageData;
  // eslint-disable-next-line @typescript-eslint/ban-types
  height?: "image-height" | (string & {});
};

// banner component
export default function Banner(props: BannerProps) {
  const image = props.image ?? bannerImage;
  const height = props.height ?? "max(35rem, 67vh)";

  return (
    <div
      className="relative flex w-full items-center justify-center"
      style={{
        height: height === "image-height" ? "auto" : height,
      }}
    >
      {/* background image */}
      <Image
        src={image}
        alt="In-House Queue Decorative Banner"
        className="bottom-0 left-0 right-0 top-0 z-0 h-full w-full select-none object-cover"
        fill={height !== "image-height"}
        priority // this is an important image
        placeholder="blur" // blur the image until it loads
        quality={100} // no compression
      />

      {/* gradient */}
      {/* <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-b from-transparent to-background-main object-cover" /> */}

      {/* banner content */}
      <div className="z-20">
        {/* text */}
        <div>
          <h1
            className={twMerge(
              bebasNeue.className,
              "inline-block bg-gradient-to-t from-primary via-[#ff3d08] to-[#ff3d08] bg-clip-text text-center text-transparent",
              "mt-32 sm:mt-12 md:mt-0 text-[clamp(8rem,_15vw,_20rem)] leading-[clamp(8rem,_15vw,_20rem)]",
              "drop-shadow-lg"
            )}
          >
            InHouse Queue
          </h1>

          {/* gradient */}
          <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-b from-transparent to-background-main object-cover" />
        </div>

        {/* children */}
        <div className="z-30 relative">
          {props.children}
        </div>
      </div>
    </div>
  );
}
