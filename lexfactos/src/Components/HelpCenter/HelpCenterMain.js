
import HelpCenter from "./HelpCenter/HelpCenter";
import PopularTopics from "./PopularTopic/PopularTopic";
import HelpSection from "./HelpSection/HelpSection";

export default function HelpCenterMain() {
  return (
    <div>
      <HelpCenter />
      <PopularTopics />
      <HelpSection />
    </div>
  );
}
