import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// Import components relative to LegalHelpFormMain.js inside LegalHelpForm folder:
import LegalHelpForm from "./LegaHelpForm/LegalHelpForm";
import LegalAreas from "./LegalArea/LegalArea";
import RecentlyAskedQuestions from "./RecentlyAskedQuestions/RecentlyAskedQuestions";

const LegalHelpFormMain = () => {
  return (
    <>
      {/* Uncomment as needed */}
      {/* <AboutUs /> */}
      {/* <HelpCenterMain /> */}
      <LegalHelpForm />
      <LegalAreas />
      <RecentlyAskedQuestions />
    </>
  );
};

export default LegalHelpFormMain;
