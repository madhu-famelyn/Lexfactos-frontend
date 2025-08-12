import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import LandingPage from "./Hero/Hero"
import StatsSection from "./StatsSection/StatsSection"
import HowItWorks from "./HowItWorks/HowItWorks"
import PracticeAreas from "./PracticeAreas/PracticeAreas"
const LandingPageMain = () => {
  return(
    <div>
      <Header/>
      <LandingPage/>
      <StatsSection/>
      <HowItWorks/>
      <PracticeAreas/>
      <Footer/>

    </div>
  )
}


export default LandingPageMain;