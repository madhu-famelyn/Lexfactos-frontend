import React from "react";
import Header from "../Header/Header";
import Hero from "./Hero/Hero";
import OurMission from "./OurMission/OurMission";
import HowWeWork from "./HowWeWork/HowWeWork";
import WhyChoose from "./WhyChoose/WhyChoose";
import OurPhilosophy from "./OurPhilosophy/OurPhilosophy";
import StatsSection from "./StatsSection/StatsSection";
import CallToAction from "./CallToAction/CallToAction";
import Footer from "../Footer/Footer";

const AboutUs = () => {
  return (
    <div>
      <Hero />
      <OurMission />
      <HowWeWork />
      <WhyChoose />
      <OurPhilosophy />
      <StatsSection />
      <CallToAction />
    </div>
  );
};

export default AboutUs;
