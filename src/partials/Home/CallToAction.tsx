import Button from "../../components/Button";
import CWLLogo from "../../assets/cwl.png";
import Image from "next/image";

export default function CallToAction() {
  return (
    <div className="flex w-full flex-col gap-4 bg-background-accent py-16 px-4">
      <div className="flex w-full flex-row flex-wrap justify-center gap-4 align-middle md:gap-8 lg:gap-16">
        {/* Left text */}
        <div className="max-w-2xl" data-aos="fade-right">
          <p className="text-gray-400">
            Level up your Gaming server by inviting In-House Queue.
          </p>

          {/* gradient title  */}
          <h1 className="mb-[1px] text-3xl font-bold text-white">
            {/* gradient text */}
            <span className="bg-gradient-to-br from-[#FFA500] to-[#FF0000] bg-clip-text text-transparent">
              Start Organizing In House Games Today.
            </span>
          </h1>

          <div className="flex flex-row gap-2">
            <h3 className="my-auto text-xl text-gray-400">Proud sponsor of:</h3>
            <Image src={CWLLogo} alt="CWL Logo" height={64} />
          </div>
        </div>

        {/* right buttons */}
        <div
          className="my-auto flex h-fit flex-row flex-wrap gap-4"
          data-aos="fade-left"
        >
          {/* invite button */}
          <Button
            variant="primary"
            href="https://discord.com/api/oauth2/authorize?client_id=1001168331996409856&permissions=1101927804016&scope=bot"
            target="_blank"
          >
            Add to Discord
          </Button>

          {/* commands */}
          <Button variant="secondary" href="/commands" target="_blank">
            Commands
          </Button>
        </div>
      </div>

      {/* sponsor */}
      {/* <div className="mx-auto flex flex-col gap-2 text-center align-middle md:flex-row">
        <h3 className="my-auto text-lg text-gray-400">Proud sponsor of: CWL</h3>
        <Image src={CWLLogo} alt="CWL Logo" height={64} />
      </div> */}
    </div>
  );
}
