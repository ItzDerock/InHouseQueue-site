import Banner from "../components/Banner";
import Button from "../components/Button";
import CallToAction from "../partials/Home/CallToAction";
import Feature1 from "../partials/Home/Feature1";
import Feature2 from "../partials/Home/Feature2";
import Feature3 from "../partials/Home/Feature3";
import Highlight from "../partials/Home/Highlight";
import StatCards from "../partials/Home/StatCards";
import SupportedGames from "../partials/Home/SupportedGames";
import Navbar from "../partials/Navbar";
import banner from "../assets/banner.webp";

export default function HomePage() {
  return (
    <>
      <Navbar absolute={true} />

      <Banner image={banner} height="67vh">
        <div className="mb-28 mt-24 flex flex-col justify-center gap-3 text-center sm:mb-8 sm:mt-0 md:mb-0">
          <h2 className="text-xl font-bold text-slate-200">Presenting</h2>
          <h1 className="text-4xl font-bold text-white" data-aos="zoom-out">
            In-House Queue
          </h1>
          <p className="text-xl text-slate-200">
            A Discord Bot Designed to organize In-House Custom Games. Currently
            in beta.
          </p>

          {/* buttons */}
          <div className="flex flex-row flex-wrap justify-center gap-8">
            <Button
              variant="primary"
              href="https://discord.com/api/oauth2/authorize?client_id=1001168331996409856&permissions=1101927804016&scope=bot"
              target="_blank"
            >
              Add to Discord
            </Button>

            <Button variant="secondary" href="/commands">
              Commands
            </Button>

            <Button variant="secondary" href="https://docs.inhousequeue.xyz">
              Documentation
            </Button>
          </div>
        </div>
      </Banner>

      {/* stat cards */}
      <StatCards />

      {/* page content */}
      <div className="flex flex-col gap-4">
        {/* main content part 1 */}
        <div className="mx-auto flex max-w-[96rem] flex-col justify-center gap-28">
          {/* supported games */}
          <SupportedGames />

          {/* feature 1 */}
          <Feature1 />
        </div>

        {/* play practice progress */}
        {/* needs to be full width */}
        <Highlight />

        {/* main content part 2 */}
        <div className="mx-auto flex max-w-[96rem] flex-col justify-center gap-28">
          {/* feature 2 */}
          <Feature2 />
        </div>

        {/* feature 3 */}
        <div className="bg-background-accent">
          <div className="mx-auto flex max-w-[96rem] flex-col justify-center gap-28 pb-4">
            <Feature3 />
          </div>

          {/* call to action */}
          <CallToAction />
        </div>
      </div>
    </>
  );
}
