import Feature from "../../components/Feature";
import FeatureImage4 from "../../assets/features/4.png";

export default function Feature3() {
  return (
    <Feature
      title="Empower Your Gaming Community"
      description=""
      direction="ltr"
      image={FeatureImage4}
    >
      {/* checkmarks */}
      <ol className="checkmark-list space-y-3 text-left">
        <li data-aos="fade-up" data-aos-delay={100}>
          <span className="font-bold">Server Customization:</span> Tailor
          the bot to your server&apos;s needs, whether you&apos;re a casual
          player or a competitive gamer.
        </li>

        <li data-aos="fade-up" data-aos-delay={200}>
          <span className="font-bold">Comprehensive Profile and Stats:</span>{" "}
          Access a centralized hub for your profile and stats, tracking MMR, MVP
          votes, longest win streaks and much more.
        </li>

        <li data-aos="fade-up" data-aos-delay={200}>
          <span className="font-bold">Time scheduled queues:</span>{" "}
          Like playing at a certain time everyday? Add a schedule and InHouseQueue
          will automatically send and close a queue at your desired time.
        </li>

        <li data-aos="fade-up" data-aos-delay={400}>
          <span className="font-bold">Team Size customization</span> No matter the game, we have you covered. From 1v1s to 11v11s!
        </li>

        <li data-aos-delay={500} data-aos="fade-up">
          <span className="font-bold">InHouseQueue Challenges:</span> Engage
          your members by offering exclusive Discord roles for completing
          challenges or reaching milestones.
        </li>
      </ol>
    </Feature>
  );
}
