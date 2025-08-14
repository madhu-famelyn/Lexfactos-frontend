import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import LandingPage from "./Hero/Hero"
import StatsSection from "./StatsSection/StatsSection"
import HowItWorks from "./HowItWorks/HowItWorks"
import PracticeAreas from "./PracticeAreas/PracticeAreas"
import ClientExperiences from "./ClientExperiences/ClientExperiences"
import CommonQuestions from "./CommonQuestions/CommonQuestions"



const LandingPageMain = () => {
  return(
    <div>
      <LandingPage/>
      <StatsSection/>
      <HowItWorks/>
      <PracticeAreas/>
      <ClientExperiences/>
      <CommonQuestions/>

    </div>
  )
}


export default LandingPageMain;