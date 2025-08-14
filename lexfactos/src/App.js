// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./Components/AboutUS/AboutUs";
import HelpCenterMain from "./Components/HelpCenter/HelpCenterMain";
import LegalHelpFormMain from "./Components/LegalHelpForm/LegalHelpForm";
import SignInPage from "./Components/SignIn/SignInMain";
import SupportPageMain from "./Components/Support/Support";
import LocationMainPage from "./Components/Locations/Location";
import LandingPageMain from "./Components/LandingPage/LandingPage";
import LegalAdviceTopicMain from "./Components/LegalAdviceTopic/LegalAdviceTopic";
import LawyersByLocation from "./Components/LawyersByLocation/LawyersByLocation";
import LawyerRegistration from "./Components/LawyerRegistration/LawyerRegistration1/SignIn";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPageMain />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/support" element={<SupportPageMain />} />
        <Route path="/lawyers-by-location" element={<LawyersByLocation />} />
        <Route path="/help-center" element={<HelpCenterMain />} />
        <Route path="/legal-help" element={<LegalHelpFormMain />} />
        <Route path="/locations" element={<LocationMainPage />} />
        <Route path="/topics" element={<LegalAdviceTopicMain />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-in-lawyer" element={<LawyerRegistration/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
