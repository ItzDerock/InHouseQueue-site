import Banner from "../../components/Banner";
import banner from "../../assets/banner.webp";
import Navbar from "../../partials/Navbar";
import { Fragment, type ReactNode } from "react";
import Button from "../../components/Button";

enum PlanType {
  Normal,
  Special,
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
    title: "Tier 1",
    description: "Seed the Future - Customisation",
    price: "$3/month",
    url: "https://patreon.com/checkout/InHouseQueue?rid=9495552",
    highlights: [
      {
        title: "Custom Queue Banner Image",
        description:
          "Customized Banner Image for the queues to align with your server aesthetic.",
      },
      {
        title: "Custom Queue Embed Colour",
        description:
          "Customized colour for the queue to align with your server aesthetic.",
      },
      {
        title: "Early access to updates",
        description:
          "Help Seed the future of InHouseQueue by providing feedback and helping us test!",
      },
    ],
    features: [
      "Premium Bot Support",
      "Private Patreon Channel Access",
      "Custom Queue Banner Image",
      "Custom Queue Embed Color",
      "Discord Role",
    ],
  },

  /************** TIER 2 - Coming Soon **************/
  {
    type: PlanType.Special,
    title: "Tier 2",
    description: "Shape the Future - Commands and Features",
    price: "$5.99/month",
    url: "https://www.patreon.com/checkout/InHouseQueue?rid=9495591",
    highlights: [
      {
        title: "Rename Teams",
        description: "Remove that boring Red vs Blue. Customize your team names in the queue!",
      },
      {
        title: "Hide player names",
        description: "Players remain anonymous until a game starts. Is someone on your dodge list?",
      },
      {
        title: "Queue dodge Penalties",
        description: "Issue timeouts for players who consistently dont ready up.",
      },
      {
        title: "Best of 3 / Best of 5",
        description: "Enable Best of series for the extremely competitive",
      },
      {
        title: "InHouseQueue Decay System",
        description: "Boost your server engagement. Players lose MMR for inactivity. Fully customisable",
      },
      {
        title: "Premium Challenges",
        description: "We have free challenges, watch out for the Premium ones! (Coming Soon)",
      },
    ],
    features: [
      "Rename Teams",
      "Hide player names",
      "Queue dodge Penalties",
      "Best of 3 / Best of 5",
      "InHouseQueue Decay System",
      "Premium Challenges (Coming Soon)",
      "ALL Tier 1 Benefits",
    ],
  },

  /************** TIER 3 - CHALLENGER **************/
  {
    type: PlanType.Normal,
    title: "Tier 3",
    description: "Secure the Future - White Label",
    price: "$9.99/month",
    url: "https://patreon.com/checkout/InHouseQueue?rid=9495619&is_free_trial=true",
    highlights: [
      {
        title: "Customized Bot",
        description: (
          <Fragment>
            <span className="font-bold">White Label</span> InHouseQueue bot.
            <br />
            <br />
            Customisation Include:
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
            As this is a Whitelabel of InHouseQueue, your Tier 3 bot will be kept in
            sync with <span className="font-bold">InHouseQueue</span>. You will get;
            bug fixes, quality-of-life changes and all future{" "}
            <span className="font-bold">features</span> and{" "}
            <span className="font-bold">improvements</span>. All at no extra
            cost for as long as you&apos;re a member.
            <br />
            <br />
            <span className="font-bold">Free 7-Day TRIAL!</span>
            <ul className="list-inside list-disc">
              <li>
                These first 7 Days can be used for setting up and testing. It also gives the developers time to create
                your awesome bot!
              </li>
            </ul>
            <br />
            <span className="font-bold">One server only</span>
            <br />
            <br />
            <span className="font-bold">All data (leaderboards, queues, wins, losses etc.) will automatically transition to your Whitelabel bot.</span>
            <br />
          </Fragment>
        ),
      },
    ],
    features: [
    "Whitelabel InHouseQueue Bot",
     "ALL Tier 1 and Tier 2 Benefits",
    ],
  },

  /************** Custom Bot Hosting **************/
  {
    type: PlanType.Aside,
    title: "Custom Bot Hosting",
    price: "$6/month",
    url: "https://patreon.com/checkout/InHouseQueue?rid=9581709",
    description: (
      <Fragment>
        Independent tier for Casual Bot Hosting. If you have another self coded bot you are having trouble hosting, we can help.
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
      "Discord Role"
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
