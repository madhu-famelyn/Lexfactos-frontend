import React from "react";
import InputPage from "./InputPage/InputPage";
import PracticeArea from "./PracticeArea/PracticeArea";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import BrowseByLocation from "./Cities/BrowseByLocation";
import LawyerSection from "./LawyerSection/LawyerSection";
import LawyerTypes from "./LawyerTypes/LawyerTypes";
import PopularPracticeAreas from "./PopularPracticeAreas/PopularPracticeAreas";
import ChooseLawyer from "./ChooseLawyer/ChooseLawyer";
import NextStep from "./NextStep/NextStep";



export default function LawyersByLocation() {
  return (
    <div>
        <InputPage/>
        <PracticeArea/>
        <BrowseByLocation/>
        <LawyerSection/>
        <LawyerTypes/>
        <PopularPracticeAreas/>
        <ChooseLawyer/>
        <NextStep/>
   
    </div>

  );
}
