import Image, { type StaticImageData } from "next/image";
import React from "react";

// the banner props
export type BannerProps = {
  children?: React.ReactNode;
  image: StaticImageData;
  // eslint-disable-next-line @typescript-eslint/ban-types
  height: "image-height" | (string & {});
};

// banner component
export default function Banner(props: BannerProps) {
  return (
    <div
      className="relative flex w-full items-center justify-center"
      style={{
        height: props.height === "image-height" ? "auto" : props.height,
      }}
    >
      {/* background image */}
      <Image
        src={props.image}
        alt="In-House Queue Decorative Banner"
        className="bottom-0 left-0 right-0 top-0 z-0 h-full w-full select-none object-cover"
        fill={props.height !== "image-height"}
        priority // this is an important image
        placeholder="blur" // blur the image until it loads
        quality={100} // no compression
      />

      {/* gradient */}
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-b from-transparent to-background-main object-cover" />

      {/* banner content */}
      <div className="relative z-20">{props.children}</div>
    </div>
  );
}
