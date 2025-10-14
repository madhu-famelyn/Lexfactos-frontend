import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import LawyerRegistrationStep2 from "./Components/LawyerRegistration/LawyerRegistration2/Step2";
import LawyerRegistrationStep3 from "./Components/LawyerRegistration/LawyerRegistration3/Step3";
import Step4 from "./Components/LawyerRegistration/LawyerRegistration4/Step4";
import LawyerRegistrationStep5 from "./Components/LawyerRegistration/LawyerRegistration5/Step5";
import LawyerRegistrationStep6 from "./Components/LawyerRegistration/LawyerRegistration6/Step6";
import ProfileReview from "./Components/ProfileReview/ProfileReview";
import SignupLanding from "./Components/SignUpLanding/SignUpLanding";
import SignupPage from "./Components/SignUp/SignUp";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import LawyerResultsPage from "./Components/LawyerResultPage/LawyerResultPage";
import CaliforniaLawyers from "./Components/LawyerList/LawyerList";
import LawyerProfilePage from "./Components/LawyerResultPage/LawyerDetails";

import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import AdminSignIn from "./Components/AdminSignIn/AdminSignIn";
import AdminSignUp from "./Components/AdminSignUp/AdminSignUp";
import AdminLawyer from "./Components/AdminLawyer/AdminLawyer";
import AdminAppointments from "./Components/AdminAppointments/AdminAppointments";
import AdminSupport from "./Components/AdminSupport/AdminSupport";
import LawyerProfile from "./Components/AdminLawyer/Profile";

import { AuthProvider } from "./Components/Context/AuthContext";
import { AuthProvider as UserProvider } from "./Components/Context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

import BrowseJobGrid from "./Components/ApplyJobs/ApplyJob";

// Replace with your actual Google Client ID
const GOOGLE_CLIENT_ID = "776723084181-ilgvju235ine04lqlkbl7v4nd55rpt3m.apps.googleusercontent.com";

// Layout wrapper
function Layout({ children }) {
  const location = useLocation();

  // You can keep this or remove it since you said no route blocking
  const hideHeaderFooterExact = [
    "/admin-dashboard",
    "/admin-signin",
    "/admin-signup",
    "/admin-lawyers",
    "/admin-appointments",
    "/admin-support",
  ];

  const hideHeaderFooterStartsWith = ["/lawyer/"];

  const shouldHide =
    hideHeaderFooterExact.includes(location.pathname) ||
    hideHeaderFooterStartsWith.some((path) =>
      location.pathname.startsWith(path)
    );

  return (
    <>
      {!shouldHide && <Header />}
      {children}
      {!shouldHide && <Footer />}
    </>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        {/* Wrap the entire app in UserProvider to carry JWT/user info */}
        <UserProvider>
          <Layout>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPageMain />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/support" element={<SupportPageMain />} />
              <Route path="/lawyers-by-location" element={<LawyersByLocation />} />
              <Route path="/help-center" element={<HelpCenterMain />} />
              <Route path="/legal-help" element={<LegalHelpFormMain />} />
              <Route path="/locations" element={<LocationMainPage />} />
              <Route path="/topics" element={<LegalAdviceTopicMain />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignupPage />} />
              <Route path="/sign-in-lawyer" element={<LawyerRegistration />} />
              <Route path="/step2" element={<LawyerRegistrationStep2 />} />
              <Route path="/step3" element={<LawyerRegistrationStep3 />} />
              <Route path="/step4" element={<Step4 />} />
              <Route path="/step5" element={<LawyerRegistrationStep5 />} />
              <Route path="/step6" element={<LawyerRegistrationStep6 />} />
              <Route path="/profile-review" element={<ProfileReview />} />
              <Route path="/signup-landing" element={<SignupLanding />} />
              <Route path="/lawyers/search" element={<LawyerResultsPage />} />
              <Route path="/lawyer/:id" element={<LawyerProfilePage />} />
              <Route path="/browse-jobs" element={<BrowseJobGrid />} />

              <Route path="/lawyer-list" element={<CaliforniaLawyers />} />

              {/* Admin routes wrapped with AuthProvider */}
              <Route
                path="/admin-signin"
                element={
                  <AuthProvider>
                    <AdminSignIn />
                  </AuthProvider>
                }
              />
              <Route
                path="/admin-signup"
                element={
                  <AuthProvider>
                    <AdminSignUp />
                  </AuthProvider>
                }
              />
              <Route
                path="/admin-dashboard"
                element={
                  <AuthProvider>
                    <AdminDashboard />
                  </AuthProvider>
                }
              />
              <Route
                path="/admin-lawyers"
                element={
                  <AuthProvider>
                    <AdminLawyer />
                  </AuthProvider>
                }
              />
              <Route
                path="/admin-appointments"
                element={
                  <AuthProvider>
                    <AdminAppointments />
                  </AuthProvider>
                }
              />
              <Route
                path="/admin-support"
                element={
                  <AuthProvider>
                    <AdminSupport />
                  </AuthProvider>
                }
              />
              <Route
                path="/lawyer/:lawyerId"
                element={
                  <AuthProvider>
                    <LawyerProfile />
                  </AuthProvider>
                }
              />
            </Routes>
          </Layout>
        </UserProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
