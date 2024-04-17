import Feature from "../../components/Feature";
import FeatureImage2 from "../../assets/features/2.png";

export default function Feature2() {
  return (
    <Feature
      title="Unlock Your Players True Potential"
      description=""
      direction="rtl"
      image={FeatureImage2}
    >
      {/* checkmarks */}
      <ol className="checkmark-list">
        {
          [
            "Unique In-Game role assignment",
            "Unlock built in Achievements",
            "Spectators Buttons",
            "Track your stats and match history",
            "Dedicated server site leaderboard",
            "Duo Queue",
            "Captain Queue",
            "Customize Team sizes (1v1 - 8v8)",
            "So much more...",
          ].map((item, index) => (
            <li
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {item}
            </li>
          ))
        }
      </ol>

      {/* support server */}
      <p className="mt-8">
        Contact us via our{" "}
        <a
          href="https://discord.com/invite/NDKMeT6GE7"
          target="_blank"
          rel="noreferrer"
        >
          Support Server
        </a>.
      </p>
    </Feature>
  )
}