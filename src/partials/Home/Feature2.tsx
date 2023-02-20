import Feature from "../../components/Feature";
import FeatureImage2 from "../../assets/features/2.png";

export default function Feature2() {
  return (
    <Feature
      title="Unlock Your Players True Potential"
      description="In-House Queue bot features a built-in matchmaking system using the TrueSkill algorithm, ensuring fair and balanced matchups. In addition, our bot offers leaderboards, MVP voting, and other features to add depth and excitement to your gaming experience. That's not all, Take to the battle field with your Duo partner and track your stats per Champion, Agent or Hero!"
      direction="rtl"
      image={FeatureImage2}
    >
      {/* checkmarks */}
      <ol className="checkmark-list">
        {
          [
            "Unique In-Game role assignment",
            "Dynamic Top 10 Leaderboard",
            "Spectators Buttons",
            "Ready Up Check",
            "Vote for your MVP of the Match!",
            "Track your stats for individual Champions, Heroes and Agents",
            "Duo Queue"
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