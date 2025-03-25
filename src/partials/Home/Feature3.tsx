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
          the bot to your server&apos;s needs, casual or competitive.
        </li>

        <li data-aos="fade-up" data-aos-delay={200}>
          <span className="font-bold">Comprehensive Profile and Stats:</span>{" "}
          Access a centralized hub for your profile and stats.
        </li>

        <li data-aos="fade-up" data-aos-delay={200}>
          <span className="font-bold">MMR Decay System:</span>{" "}
          Inactive players have their MMR reduced over time. ⭐
        </li>

        <li data-aos="fade-up" data-aos-delay={400}>
          <span className="font-bold">Unique Captain Mode:</span> Captains take turns picking their team!
        </li>

        <li data-aos-delay={500} data-aos="fade-up">
          <span className="font-bold">Advanced permission system:</span> Delegate admin commands to your Mods and more
        </li>

        <li data-aos-delay={500} data-aos="fade-up">
          <span className="font-bold">Anonymous Queue:</span> Hide player names in queue for anonymity. ⭐
        </li>

        <li data-aos-delay={500} data-aos="fade-up">
          <span className="font-bold">InHouseQueue season:</span> InHouseQueue can automatically start and end your season!
        </li>
      </ol>
    </Feature>
  );
}
