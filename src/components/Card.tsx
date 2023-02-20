import type { IconType } from "react-icons";

type CardProps = {
  children: React.ReactNode;
  title: string;
  icon: React.ReactNode | IconType;

  // aos
  aosIndex?: number;
}

export default function Card(props: CardProps) {
  return (
    <div
      className="bg-background-accent p-3 rounded-md"
      // animate on scroll
      data-aos="fade-up"
      data-aos-delay={props.aosIndex ? props.aosIndex * 100 : 0}
    >
      {/* card icon */}
      <div className="mx-auto p-[5px] w-fit rounded-full bg-gray-700 fill-white text-white">
        {
          // if the icon is a react-icon component,
          // render it with the size of 16
          typeof props.icon === "function" ? (
            props.icon({
              size: 20
            })
          ) : (
            // else, render the icon as is
            props.icon
          )
        }
      </div>

      {/* card title */}
      <h1 className="text-center text-white font-bold text-xl mt-2 mb-[1px]">
        {props.title}
      </h1>

      {/* card content */}
      <div className="text-center content whitespace-pre-wrap">
        {props.children}
      </div>
    </div>
  )
}