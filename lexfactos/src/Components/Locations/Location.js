import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import BrowseByStates from "./BrowseByLocation/BrowseByStates";
import BrowseByCities from "./BrowseByCity/BrowseByCity";
import QuestionsList from "./QuestionsList/QuestionsList";




function LocationMainPage() {
  return (
    <div>
     <Header/>
     <BrowseByStates/>
     <BrowseByCities/>
     <QuestionsList/>
     <Footer/>
 
    </div>

  );
}

export default LocationMainPage;
