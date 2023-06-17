import NumberCounter from "./Number";

export type StatCardProps = {
  count: number;
  label: string;
  aosIndex?: number;
}

export default function StatCard(props: StatCardProps) {
  // return the stat card
  return (
    <div 
      className="backdrop-blur-[10px] bg-gray-600 bg-opacity-[15%] rounded-md flex flex-col justify-center gap-[10px] py-4 px-8 sm:py-6 sm:px-14 shadow-xl"
      // animate on scroll
      data-aos="fade-up"
      data-aos-delay={props.aosIndex ? props.aosIndex * 100 : 0}
    >
      {/* the stat card count */}
      <h1 className="sm:text-3xl text-center text-white">
        <NumberCounter
          number={props.count}
        />
      </h1>

      {/* the stat card label */}
      <h2 className="sm:text-base text-center text-slate-200">
        {props.label}
      </h2>
    </div>
  )
}