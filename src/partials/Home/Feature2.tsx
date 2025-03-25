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
            "Simplistic & Aesthetic",
            "Customizable & Flexible",
            "MMR Decay System",
            "InHouseQueue Seasons",
            "Suspension and Ban System",
            "Unique Captains Mode",
            "Much more...",
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