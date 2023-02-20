import Card from "../../components/Card";
import Feature from "../../components/Feature";
import FeatureImage1 from "../../assets/features/3.png";
import { RiSwordFill, RiBook2Fill } from "react-icons/ri";
import { MdOutlineBarChart, MdVerified } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaHandshake } from "react-icons/fa";

export default function Feature1() {
  return (
    <Feature
      title="Your own In-House Custom Games Manager"
      description="Enhance the competitive atmosphere in your server with the In-House Queue Discord Bot. In-House Queue allows you to easily organize and run custom games, giving your members the opportunity to hone their skills and progress in their favorite titles."
      direction="ltr"
      image={FeatureImage1}
    >
      {/* grid for cards - 3 cols that wrap */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Balanced */}
        <Card
          title="Balanced"
          icon={RiSwordFill}
          aosIndex={0}
        >
          Built-in MMR system for balanced matchmaking.
          <br />
          Powered by <a href="https://trueskill.org/">TrueSkill</a>.
        </Card>

        {/* Leaderboard */}
        <Card
          title="Leaderboard"
          icon={MdOutlineBarChart}
          aosIndex={1}
        >
          Generate server-wide leaderboards for MMR, MVP, Wins and more.
        </Card>

        {/* Channel Generation */}
        <Card
          title="Channel Gen"
          icon={IoMdAdd}
          aosIndex={2}
        >
          Automatic Discord Voice and Text channel generation.
        </Card>

        {/* Trusted */}
        <Card
          title="Trusted"
          icon={FaHandshake}
          aosIndex={3}
        >
          Duo Queue. InHouseQueue makes it very easy to grab your best duo and dominate together
        </Card>

        {/* Verified */}
        <Card
          title="Verified"
          icon={MdVerified}
          aosIndex={4}
        >
          Trusted by many Amateur, Orgs and Casual InHouse Servers. <a href="https://discord.com/" target="_blank" rel="noreferrer">Discord</a> and{" "}
          <a href="https://top.gg/bot/1001168331996409856" target="_blank" rel="noreferrer">Top.GG</a> Verified.
        </Card>

        {/* Guide */}
        <Card
          title="Guide"
          icon={RiBook2Fill}
          aosIndex={5}
        >
          Easily get started with our demo guide. Or use the setup command to jump straight into the action.
        </Card>
      </div>
   </Feature>
  )
}