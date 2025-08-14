import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import BreadcrumbPage from "./BreadcrumbPage/BreadcrumbPage";
import SupportPage from "./SupportPage/SupportPage";
import HelpSection from "../HelpCenter/HelpSection/HelpSection";

function SupportPageMain() {
  return (
    <div>
     <BreadcrumbPage/>
     <SupportPage/>
     <HelpSection/>
    </div>

  );
}

export default SupportPageMain;