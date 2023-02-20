import Button from "../../components/Button";

export default function CallToAction() {
  return (
    <div className="w-full py-16 px-4 bg-background-accent flex flex-row flex-wrap justify-center align-middle gap-4 md:gap-8 lg:gap-16">
      {/* Left text */}
      <div className="max-w-2xl" data-aos="fade-right">
        <p className="text-gray-400">
          Level up your Gaming server by inviting In-House Queue.
        </p>

        {/* gradient title  */}
        <h1 className="text-3xl font-bold text-white mb-[1px]">
          {/* gradient text */}
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-[#FFA500] to-[#FF0000]">
            Start Organizing In House Games Today.
          </span>
        </h1>
      </div>

      {/* right buttons */}
      <div className="flex flex-row flex-wrap gap-4 h-fit" data-aos="fade-left">
        {/* invite button */}
        <Button
          variant="primary"
          href="https://discord.com/oauth2/authorize?client_id=1001168331996409856&permissions=3489918032&scope=bot"
          target="_blank"
        >
          Add to Discord
        </Button>

        {/* commands */}
        <Button
          variant="secondary"
          href="/commands"
          target="_blank"
        >
          Commands
        </Button>
      </div>
    </div>
  )
}