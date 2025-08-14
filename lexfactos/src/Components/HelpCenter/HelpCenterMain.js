import React from "react";
import Header from "../Header/Header";
import HelpCenter from "./HelpCenter/HelpCenter";
import PopularTopics from "./PopularTopic/PopularTopic";
import HelpSection from "./HelpSection/HelpSection";
import Footer from "../Footer/Footer";

export default function HelpCenterMain() {
  return (
    <div>
      <HelpCenter />
      <PopularTopics />
      <HelpSection />
    </div>
  );
}
