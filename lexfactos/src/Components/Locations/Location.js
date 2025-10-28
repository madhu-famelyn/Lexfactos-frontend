import BrowseByStates from "./BrowseByLocation/BrowseByStates";
import BrowseByCities from "./BrowseByCity/BrowseByCity";
import QuestionsList from "./QuestionsList/QuestionsList";




function LocationMainPage() {
  return (
    <div>
     <BrowseByStates/>
     <BrowseByCities/>
     <QuestionsList/>
 
    </div>

  );
}

export default LocationMainPage;
