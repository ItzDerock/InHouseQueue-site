import type { StaticImageData } from "next/image";
import Image from "next/image";

type FeatureProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  image: StaticImageData;
  direction: "ltr" | "rtl";
}

export default function Feature(props: FeatureProps) {
  return (
    <div className={"flex flex-col flex-wrap gap-16 m-8 align-middle " + (
      props.direction === "ltr" ? "md:flex-row" : "md:flex-row-reverse"
    )}>
      {/* image */}
      <div className="md:flex-1 flex-grow">
        <Image 
          src={props.image} 
          alt={props.title}
          height={600}
          className="max-h-[34rem] h-auto w-auto mx-auto md:mr-0"
        />
      </div>

      {/* content */}
      <div className={`text-gray-400 md:flex-1 text-center h-fit my-auto content ${
        props.direction === "ltr" ? "md:text-right" : "md:text-left"
      }`}>
        {/* title */}
        <h1 className="font-bold text-3xl text-white mb-1">{props.title}</h1>
        
        {/* description */}
        <p className="mb-8">{props.description}</p>

        {/* children */}
        {props.children}
      </div>
    </div>
  )
}