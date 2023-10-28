import Banner from "../../components/Banner";
import banner from "../../assets/banner.webp";
import Navbar from "../../partials/Navbar";
import SubscriptionCard from "./SubscriptionCard";

export default function SubscriptionPage() {
  return (
    <>
      <Navbar absolute />
      <Banner image={banner} height="67vh" />

      <div className="flex flex-row flex-wrap">
        <SubscriptionCard>
          <h1>Tier 1</h1>
        </SubscriptionCard>
      </div>
    </>
  );
}
