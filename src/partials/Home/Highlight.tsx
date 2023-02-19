import Image from "next/image"
import Jett from "../../assets/Jett.png"

export default function Highlight() {
  return (
    <div className="bg-background-accent w-full p-16 flex flex-row flex-wrap justify-center gap-16">
      {/* Jett Image */}
      <Image
        src={Jett}
        alt="Jett"
        height={300}
        className="inline-block"
        data-aos="fade-right"
      />

      {/* Text */}
      <div 
        className="inline-block max-w-2xl my-auto"
        data-aos="fade-left"
      >
        <h1 className="text-3xl font-bold text-white mb-[1px]">Play, Practice, and Progress like the Pros.</h1>
        <p className="text-gray-400">
          With the In-House Discord Bot, organizing and running custom games has never been easier.
          Let us take care of the details so you can focus on what matters most - the fun of playing with your friends and community.
        </p>
      </div>
    </div>
  )
}