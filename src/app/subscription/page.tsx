import Banner from "../../components/Banner";
import banner from "../../assets/banner.webp";
import Navbar from "../../partials/Navbar";
import { Fragment, type ReactNode } from "react";
import Button from "../../components/Button";
import ComingSoon from "./ComingSoon";

enum PlanType {
  Normal,
  Special,
  ComingSoon,
  Aside,
}

type PlanDetail = {
  type: PlanType;
  title: ReactNode;
  description: ReactNode;
  price: ReactNode;
  url: string;
  highlights?: { title: ReactNode; description: ReactNode }[];
  features: ReactNode[];
};

/**
 * List of plan details.
 */
const PLAN_DETAILS = [
  /************** TIER 1 - BRONZE **************/
  {
    type: PlanType.Normal,
    title: "Tier 1 - Bronze",
    description: "This is the tier if you want to support the Dev team!",
    price: "$40/mo",
    url: "https://patreon.com/checkout/InHouseQueue?rid=9495552",
    highlights: [
      {
        title: "Custom Queue Banner Image",
        description:
          "Have a customized banner image for the queues. THis is the image displayed in the queue embed.",
      },
      {
        title: "Custom Queue Embed Colour",
        description:
          "A customized colour for the queue to align with your server aesthetic.",
      },
      {
        title: "Early access to updates",
        description:
          "Help shape the future of InHouse Queue by getting access to upcoming features. Provide feedback, and help us test!",
      },
      {
        title: "Monthly Leaderboard",
        description:
          "We send your servers leaderboard in CSV format to you (Email or Discord)",
      },
    ],
    features: [
      "Premium Bot Support",
      "Private Patreon Channel Access",
      "Custom Queue Embed Color",
      "Discord Role",
      "Discord Access",
    ],
  },

  /************** TIER 2 - Coming Soon **************/
  {
    type: PlanType.ComingSoon,
    title: "Tier 2 - Emerald",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: "$??/mo",
    url: "#",
    highlights: [
      {
        title: "Coming Soon",
        description: (
          <Fragment>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet
            consectetur adipiscing elit ut aliquam purus sit amet luctus.
            Pretium lectus quam id leo in vitae. Tempus iaculis urna id volutpat
            lacus. Libero enim sed faucibus turpis. Ac orci phasellus egestas
            tellus rutrum tellus pellentesque. Eleifend mi in nulla posuere
            sollicitudin. Est sit amet facilisis magna etiam tempor. Id aliquet
            lectus proin nibh nisl condimentum id venenatis. Convallis tellus id
            interdum velit laoreet id donec ultrices tincidunt.
          </Fragment>
        ),
      },
    ],
    features: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Placeholder text that will not be displayed.",
      "Exists just to fill space.",
      "If you are a user and see this... oops, pulled a rito and their 🍝 code",
      "this is probably enough text",
    ],
  },

  /************** TIER 3 - CHALLENGER **************/
  {
    type: PlanType.Special,
    title: "Tier 3 - Challenger",
    price: "$25/month",
    url: "https://patreon.com/checkout/InHouseQueue?rid=9495619&is_free_trial=true",
    description: (
      <Fragment>
        The top 0.1% <br />
        <span className="font-bold">Includes benefits from ALL packages</span>
      </Fragment>
    ),
    highlights: [
      {
        title: "Customized Bot",
        description: (
          <Fragment>
            We will create and host your own{" "}
            <span className="font-bold">CUSTOMIZED</span> InHouseQueue bot for
            your server. We take care of hosting, cost and set-up.
            <br />
            <br />
            Have a customized bot to fit{" "}
            <span className="font-bold">your srever branding</span>.
            <br />
            <br />
            Things you can customize:
            <ul className="list-inside list-disc">
              <li>Bot Name</li>
              <li>Bot Avatar / Display Picture</li>
              <li>
                Status - eg <i>Playing Valorant</i>
              </li>
              <li>Queue Banner Image</li>
              <li>Queue Color</li>
            </ul>
            <br />
            Your bot will <span className="font-bold">always</span> be kept in
            sync with <span className="font-bold">InHouseQueue</span>, which
            includes bug fixes, quality-of-life changes and all future{" "}
            <span className="font-bold">features</span> and{" "}
            <span className="font-bold">improvements</span>, all at no extra
            cost for as long as you&apos;re a member.
            <br />
            <br />
            If disruptions occur, our automatic healing systems detect and
            restart the bot, ensuring consistent uptime.
            <br />
            <br />
            You will have a dedicated section on our status page:{" "}
            <a
              href="https://inhousequeue.statuspage.io/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500"
            >
              https://inhousequeue.statuspage.io/
            </a>
            <br />
            <br />
            Free 7-Day TRIAL!
            <ul className="list-inside list-disc">
              <li>
                This is to familiarise yourself with the bot, give you time to
                test and for us to get it all set up!
              </li>
            </ul>
            <br />
            <span className="font-bold">One server only</span>
            <br />
            <br />
            <span className="font-bold">Includes Tier 1 + 2 benefits.</span>
            <br />
            <span className="italic">
              We will continue to add more benefits to all tiers over time!
            </span>
          </Fragment>
        ),
      },
    ],
    features: ["Love from the Dev Team", "Discord Access"],
  },

  /************** Custom Bot Hosting **************/
  {
    type: PlanType.Aside,
    title: "Custom Bot Hosting",
    price: "$6/month",
    url: "https://patreon.com/checkout/InHouseQueue?rid=9581709",
    description: (
      <Fragment>
        Special independent teir for Bot hosting. If you have a bot we have
        coded for you please select this tier. Does{" "}
        <span className="font-bold">not</span> include other Tier Benefits, this
        is for hosting any bot that is not{" "}
        <span className="font-bold">InHouseQueue</span>.
      </Fragment>
    ),
    highlights: [
      {
        title: "Instant Changes",
        description:
          "As we are hosting we can make any changes quickly and efficiently. Any improvements, Bug fixes or QOL changes can be live within minutes.",
      },
      {
        title: "99.5% Uptime",
        description:
          "Your bot will be online 24/7. Any downtime will be communicated to you prior.",
      },
    ],
    features: [
      "Hosting Provided by us",
      "Default hosted in North Virginia NA Region.",
      "Premium support and debugging for Custom bot",
      "Private Patreon Channel Access",
      "Premium Bot Support",
      "Love from the Dev Team",
      "Discord Role",
      "Discord Access",
    ],
  },
] satisfies PlanDetail[];

export default function SubscriptionPage() {
  return (
    <>
      <Navbar absolute />
      <Banner image={banner} height="67vh" />

      <div className="relative z-30 w-full p-8">
        <div className="z-50 mx-auto flex max-w-7xl -translate-y-36 flex-col gap-4 xl:grid xl:grid-cols-3">
          {
            // for each plan detail, render a subscription card
            PLAN_DETAILS.map((planDetail, index) => (
              <div
                className={
                  // base styles
                  "relative flex flex-col gap-4 rounded-md bg-background-accent p-8" +
                  // if the plan is a special plan, add a border and glow effect
                  (planDetail.type === PlanType.Special
                    ? " border-2 border-primary shadow-lg"
                    : " my-8") +
                  // if the plan is aside, made it row not col
                  (planDetail.type === PlanType.Aside
                    ? " xl:col-span-3 xl:grid xl:grid-cols-3"
                    : "")
                }
                // animate on scroll
                data-aos="fade-up"
                data-aos-delay={index * 100}
                key={index}
              >
                {/*  soon */}
                {planDetail.type === PlanType.ComingSoon && <ComingSoon />}

                {/* header */}
                <div className="flex flex-col">
                  {/* card title */}
                  <h1 className="text-3xl font-black text-white">
                    {planDetail.title}
                  </h1>

                  {/* card description */}
                  <p className="mt-2 text-white text-opacity-80">
                    {planDetail.description}
                  </p>

                  {/* card price */}
                  <h1 className="my-8 text-4xl font-semibold text-primary">
                    {planDetail.price}
                  </h1>

                  {planDetail.type === PlanType.Aside && (
                    <div className="flex-grow"> </div>
                  )}

                  {/* join button */}
                  <Button
                    className="my-4 block w-full text-center"
                    variant="secondary"
                    href={planDetail.url}
                    target="_blank"
                  >
                    {
                      // if url has a free trial, render free trial text
                      planDetail.url.includes("is_free_trial=true")
                        ? "Free 7-Day Trial"
                        : "Join Now"
                    }
                  </Button>
                </div>

                <div className="col-span-2">
                  {/* highlights */}
                  {
                    // if the plan has highlights, render them
                    planDetail.highlights &&
                      planDetail.highlights.length > 0 && (
                        <div className="flex flex-col gap-2">
                          {
                            // for each highlight, render a highlight card
                            planDetail.highlights.map((highlight, index) => (
                              <div key={index}>
                                {/* highlight title */}
                                <h1 className="font-bold text-white">
                                  {highlight.title}
                                </h1>

                                {/* highlight description */}
                                <p className="text-white text-opacity-80">
                                  {highlight.description}
                                </p>
                              </div>
                            ))
                          }
                        </div>
                      )
                  }

                  {/* extra features */}
                  {
                    // if the plan has features, render them
                    planDetail.features && planDetail.features.length > 0 && (
                      <ul className="mt-4 flex list-inside list-disc flex-col gap-2">
                        {
                          // for each feature, render a feature card
                          planDetail.features.map((feature, index) => (
                            <li key={index} className="text-white">
                              {feature}
                            </li>
                          ))
                        }
                      </ul>
                    )
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}
