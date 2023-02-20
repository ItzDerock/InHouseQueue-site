import Banner from "../components/Banner";
import Button from "../components/Button";
import Footer from "../partials/Footer";
import CallToAction from "../partials/Home/CallToAction";
import Feature1 from "../partials/Home/Feature1";
import Feature2 from "../partials/Home/Feature2";
import Highlight from "../partials/Home/Highlight";
import StatCards from "../partials/Home/StatCards";
import SupportedGames from "../partials/Home/SupportedGames";
import Navbar from "../partials/Navbar";
export default function HomePage() {
  return (
    <>
      <Navbar
        absolute={true}
      />

      <Banner>
        <div className="flex flex-col gap-3 text-center justify-center">
          <h2 className="text-slate-200 text-xl font-bold">
            Presenting
          </h2>
          <h1 className="text-white text-4xl font-bold" data-aos="zoom-out">
            In-House Queue
          </h1>
          <p className="text-slate-200 text-xl">
            A Discord Bot Designed to organize In-House Custom Games.
            Currently in beta.
          </p>

          {/* buttons */}
          <div className="flex flex-row flex-wrap gap-8 justify-center">
            <Button
              variant="primary"
              href="https://discord.com/oauth2/authorize?client_id=1001168331996409856&permissions=3489918032&scope=bot"
              target="_blank"
            >
              Add to Discord
            </Button>

            <Button
              variant="secondary"
              href="/commands"
            >
              Commands
            </Button>
          </div>
        </div>
      </Banner>

      {/* stat cards */}
      <StatCards />

      {/* page content */}
      <div className="flex flex-col gap-4">
        {/* main content part 1 */}
        <div className="flex flex-col gap-28 max-w-[96rem] justify-center mx-auto">
          {/* supported games */}
          <SupportedGames />

          {/* feature 1 */}
          <Feature1 />
        </div>

        {/* play practice progress */}
        {/* needs to be full width */}
        <Highlight />

        {/* main content part 2 */}
        <div className="flex flex-col gap-28 max-w-[96rem] justify-center mx-auto">
          {/* feature 2 */}
          <Feature2 />
        </div>

        {/* call to action */}
        <CallToAction />
      </div>
    </>
  )
}