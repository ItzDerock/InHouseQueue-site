import Image, { type StaticImageData } from "next/image";
import LeagueOfLegends from "../../assets/games/leagueoflegends.svg";
import Overwatch from "../../assets/games/overwatch.svg";
import Valorant from "../../assets/games/valorant.svg";

export default function SupportedGames() {
  return (
    <div className="flex flex-row flex-wrap gap-16 justify-center mx-4 md:mx-0">
      {/* left text */}
      <div className="h-full">
        <h1 className="font-bold text-3xl text-white">Supports League of Legends</h1>
        <p className="text-gray-400">With Valorant and Overwatch support comming soon</p>
      </div>

      {/* right images */}
      <div className="max-w-full flex flex-row gap-8 sm:gap-11">
        {/* League of Legends Logo */}
        <div className="flex items-center justify-center py-2 col-span-2 md:col-auto">
          <Image className="max-w-full" height={64} src={LeagueOfLegends as StaticImageData} alt="League of Legends" />
        </div>

        {/* Overwatch Logo */}
        <div className="flex items-center justify-center py-2 col-span-2 md:col-auto">
          <Image className="max-w-full" height={64} src={Overwatch as StaticImageData} alt="Overwatch" />
        </div>

        {/* Valorant Logo */}
        <div className="flex items-center justify-center py-2 col-span-2 md:col-auto">
          <Image className="max-w-full" height={64} src={Valorant as StaticImageData} alt="Valorant" />
        </div>
      </div>
    </div>
  )
}