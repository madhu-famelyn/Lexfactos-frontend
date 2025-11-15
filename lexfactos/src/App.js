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
import LawyerAuth from "./Components/LawyerRegistration/Auth/LawyerAuth";
import LawyerForgotPassword from "./Components/LawyerRegistration/ForgotPassword/ForgotPasswrod";
import LawyerResetPassword from "./Components/LawyerRegistration/ForgotPassword/ResetPassword";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import AdminSignIn from "./Components/AdminSignIn/AdminSignIn";
import AdminSignUp from "./Components/AdminSignUp/AdminSignUp";
import AdminLawyer from "./Components/AdminLawyer/AdminLawyer";
import AdminAppointments from "./Components/AdminAppointments/AdminAppointments";
import AdminSupport from "./Components/AdminSupport/AdminSupport";
import LawyerProfile from "./Components/AdminLawyer/Profile";
import { LawyerAuthProvider } from "./Components/Context/LawyerContext";
import LawyerUpdateProfile from "./Components/LawyerRegistration/LawyerUpdate/LawyerUpdate";
// import LawyerDashboard from "./Components/LawyerDashboard/LawyerDashboard/LawyerDashboard";
// import SignIn from "./Components/SignIn/SignIn/SignIn";

import { AuthProvider } from "./Components/Context/AuthContext";
import { AuthProvider as UserProvider } from "./Components/Context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

import BrowseJobGrid from "./Components/ApplyJobs/ApplyJob";
import Dashboard from "./Components/UserProfile/UserProfile/UserProfile";
import PostJob from "./Components/UserProfile/PostJob/PostJob";
import JobsPage from "./Components/UserProfile/ListJobs/ListJobs";
import ViewJobDetails from "./Components/ApplyJobs/ViewJobDetails";
import ApplicantsPage from "./Components/UserProfile/ApplicantsPage/ApplicantsPage";
import MyAppliedJobsPage from "./Components/UserProfile/MyAppliedJobsPage/MyAppliedJobsPage";
import AdminJobs from "./Components/AdminJobs/AdminJobs";
import ForgotPasswordUser from "./Components/ForgotPasswordUser/ForgotPassword";
import LawyerFullRegistration from "./Components/LawyerRegistration/LawyerFullRegistration/LawyerFullRegistration";
import UserResetPassword from "./Components/ForgotPasswordUser/ResetPassword";
import LawyerDashboard from "./Components/LawyerDashboard/LawyerDashboard/LawyerDashboard";
import LawyerReviews from "./Components/LawyerDashboard/ReviewsSection/ClientReviews";
import LawyerExcelUpload from "./Components/AdminUploadLawyerExcel/UploadExcel";
import ContactPage from "./Components/LawyerDashboard/HelpCenter/HelpCenter";

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
    "/profile",
    "/post-job",
    "/view-jobs",
    "/view-job/:id",
    "/applicents",
    "/my-applied-jobs",
    "/job-post",
    "/lawyer-dashboard",
    "/lawyer-reviews",
    "/lawyer-update",
    "/lawyer-update-excel",
    "/contact-page"
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
        {/* AuthProvider wraps the entire app so Header and all routes have access */}
        <AuthProvider>
          <UserProvider>
            <LawyerAuthProvider>
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
                <Route path="/sign-up-lawyer" element={<LawyerRegistration />} />
                <Route path="/lawyer-full-registration" element={<LawyerFullRegistration />} />
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
                <Route path="/profile" element={<Dashboard />} />
                <Route path="/post-job" element={<PostJob />} />
                <Route path="/view-jobs" element={<JobsPage />} />
                <Route path="/applicents" element={<ApplicantsPage />} />
                <Route path="/my-applied-jobs" element={<MyAppliedJobsPage />} />
                <Route path="/job-post" element={<AdminJobs />} />
                <Route path="/lawyer-auth" element={<LawyerAuth />} />
                <Route path="/forgot-password-user" element={<ForgotPasswordUser />} />
                <Route path="/change-lawyer-password" element={<LawyerForgotPassword />} />
                <Route path="/user/reset-password" element={<UserResetPassword />} />
                <Route path="/reset-password" element={<LawyerResetPassword />} />
                <Route path="/lawyer-dashboard" element={<LawyerDashboard />} />
                <Route path="/lawyer-reviews" element={<LawyerReviews />} />
                <Route path="/lawyer-update" element={<LawyerUpdateProfile />} />
                <Route path="/lawyer-update-excel" element={<LawyerExcelUpload />} />
                <Route path="/contact-page" element={<ContactPage/>}/>

                



                {/* Admin routes */}
                <Route path="/admin-signin" element={<AdminSignIn />} />
                <Route path="/admin-signup" element={<AdminSignUp />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/admin-lawyers" element={<AdminLawyer />} />
                <Route path="/admin-appointments" element={<AdminAppointments />} />
                <Route path="/admin-support" element={<AdminSupport />} />
                <Route path="/lawyer/:lawyerId" element={<LawyerProfile />} />
                <Route path="/view-job/:id" element={<ViewJobDetails />} />
              </Routes>
            </Layout>
            </LawyerAuthProvider>
          </UserProvider>
        </AuthProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
