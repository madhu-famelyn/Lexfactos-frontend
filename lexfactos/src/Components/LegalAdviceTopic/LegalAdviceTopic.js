import HeroSection from "./Hero/Hero";
import SearchBar from "./SearchBar/SearchBar";
import LegalQuestions from "./LegalQuestions/LegalQuestions";
import RelatedTopics from "./RelatedTopics/RelatedTopics";
import AskQuestion from "./AskQuestion/AskQuestion";
import AdditionalResources from "./AdditionalResources/AdditionalResources";
import TopCities from "./TopCities/TopCities";

const LegalAdviceTopicMain = () => {
    return(
        <div>
            <HeroSection/>
            <SearchBar/>
            <LegalQuestions/>
            <RelatedTopics/>
            <AskQuestion/>
            <AdditionalResources/>
            <TopCities/>
        </div>
    )
}

export default LegalAdviceTopicMain;