import React from "react";
import "./App.css";
import HomePage01 from "./Components/HomePage01/HomePage01";
import Page02 from "./Components/Page02/Page02";
import Share from "./Components/Page02/ShareComponent/Share";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Language from "./Components/HomePage01/Language/Languages";
import LoginPage from "./Components/HomePage01/LogIn/LoginPage";
import SignUpPage from "./Components/HomePage01/SignUpPage/SignUpPage";
import AddToCart from "./Components/HomePage01/AddToCart/AddToCart";
import CartPage from "./Components/HomePage01/AddToCart/CartPage";
import PageNotFound from "./PageNotFound/PageNotFound";
import CartPage02 from "./Components/HomePage01/AddToCart/CartPage02";
import GiftACourse from "./Components/Page02/GiftACourse/GiftACourse";
import Checkout from "./Components/Page02/GiftACourse/Checkout";
import Profile from "./Profile/Profile";
import Tools from "./Profile/Tools";
import Resources from "./Profile/Resources";
import Commmunication from "./Profile/Commmunication";
import PersonalPlane from "./Components/Page02/PersonalPlane";
import PurchaseHistory from "./Purchase history/PurchaseHistory";
import PaymentSteps from "./HelpDeskBP/PaymentSteps";
import Notification from "./Notifications/Notification";
import AboutUs from "./AboutUs/AboutUs";
import ContectUs from "./Contect us/ContectUs";
import PrivacyPolicy from "./Privacy Policy/PrivacyPolicy";
import RefundPolicy from "./Refund Policy/RefundPolicy";
import TearmAndCondition from "./TearmsAndCondition/TearmAndCondition";
import CourseRating from "./CourseRating.js/CourseRating";
import ReportAbousenew from "./ReportAbouse/ReportAbouse";
import AddCourse from "./Admin/Pages/AddCourse";
import ExplorCategory from "./ExploreByCategory/ExplorCategory";
import ExploreMore from "./ExploreByCategory/ExploreMore";
import Railway from "./ExploreByCategory/Railway";
import CreateCourse from "./Admin/Pages/CreateCourse";
import AllCourses from "./Admin/Pages/AllCourses";
import UpdateCourse from "./Admin/Pages/UpdateCourse";
import AddUserForm from './Admin/user/AddUserForm';
import Header from "./Components/HomePage01/Header/Header";
import InstructorForm from "./Admin/Instructor/InstructorData";
import InstructorDataList from "./Admin/Instructor/InstructorDataList";
import CourseForm from "./Admin/Courses/CourseForm";
import Category from "./Admin/Courses/Category";
import CourseList from "./Admin/Courses/CourseList"
import VideoUploadForm from "./Admin/Pages/VideoUploadForm";

import PdfManagementForm from "./Admin/Pages/PdfManagementForm";
// copy Imports of D
// import PdfUploadForm from "./Admin/D-admin/PdfUploadForm";
// import VideoUploadForm from "./Admin/D-admin/VideoUploadForm";
import MyLearningMain from "./src-d/MyLearningMain";
import VideoCoursesMain from "./src-d/VideoCoursesMain";
import CourseOverview from "./src-d/components/VideoPlayerPage/Navigations Components/CourseOverview";
import QandA from "./src-d/components/VideoPlayerPage/Navigations Components/Q&A/QandA";
import LearningTools from "./src-d/components/VideoPlayerPage/Navigations Components/LearningTools/LearningTools";
import Announcements from "./src-d/components/VideoPlayerPage/Navigations Components/Announcements/Announcements";
import SearchBar from "./src-d/components/VideoPlayerPage/Navigations Components/SearchBar";
import Review from "./src-d/components/VideoPlayerPage/Navigations Components/NotesComponent/Review/Review";
import NotesEditor from "./src-d/components/VideoPlayerPage/Navigations Components/NotesComponent/Notes";
import PinnacleProfile from "./src-d/components/VideoPlayerPage/AccountPage/PublicProfile";
import EditPhoto from "./src-d/components/VideoPlayerPage/AccountPage/EditPhoto";
import AccountSecurity from "./src-d/components/VideoPlayerPage/AccountPage/AccountSecurity";
import Subscriptions from "./src-d/components/VideoPlayerPage/AccountPage/Subscriptions";
import PaymentMethod from "./src-d/components/VideoPlayerPage/AccountPage/PaymentMethod";
import Privacy from "./src-d/components/VideoPlayerPage/AccountPage/Privacy";
import AccountNotification from "./src-d/components/VideoPlayerPage/AccountPage/AccountNotification";
import AccountClose from "./src-d/components/VideoPlayerPage/AccountPage/AccountClose";
import AccountMain from "./src-d/components/VideoPlayerPage/AccountPage/AccountMain";
import GiftACourseD from "./src-d/components/VideoPlayerPage/VideoPageHeaderComponents/GiftCourse";
import Messages from "./src-d/components/VideoPlayerPage/AccountPage/Messages";
import PinnacleHelp from "./src-d/components/VideoPlayerPage/AccountPage/PinnacleHelp";
import SignUpHelp from "./src-d/components/VideoPlayerPage/AccountPage/Messages/SignUpHelp";
import TroubleshootingHelp from "./src-d/components/VideoPlayerPage/AccountPage/Messages/TroubleshootingHelp";
import Footer from "./Footer02.js/Footer";
import AdminPage from "./Admin/AdminPage";
import CourseContent from "./Admin/Pages/CourseContent";
import AddVideoForm from "./Admin/Pages/AddVideoForm";
import UpdateChapter from "./Admin/Pages/UpdateChapter";
import ShowCourseContent from "./Admin/Pages/ShowCourseContent";
// test imports
// import videoContent from "./src-d/components/NewComponentBP/videoContent";

export default function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
        <Route path="/admin/show-course-Content" element={<ShowCourseContent />}></Route>
          <Route path="/admin/createCourse" element={<CreateCourse />}></Route>
          <Route path="/admin/allCourses" element={<AllCourses/>}></Route>
          <Route path="/admin/add-new-user" element={<AddUserForm />}></Route>
          <Route path="/admin/instructor" element={<InstructorForm />}></Route>
          <Route path="/instructor-list" element={<InstructorDataList/>}/>
          <Route path="/notes" element={<NotesEditor />}></Route> 
          <Route path="/add-course" element={<CourseForm />}></Route> 
          <Route path="/category" element={<Category/>}></Route> 
          <Route path="/courselist" element={<CourseList/>} />
          {/* <Route path="/video-form" element={<VideoUploadForm/>} /> */}
          <Route
            path="/admin/updateCourse/:id"
            element={<UpdateCourse/>}
          ></Route>
            <Route path="/admin/updateChapter/:course_id" element={<UpdateChapter/>} />
            {/* <Route path="/update-chapter"></Route> */}
            <Route path="/admin/courseContent/:id" element={<CourseContent />} />
            <Route path="/pdf-management/:courseId" element={<PdfManagementForm/>} />
            <Route path="/admin/addVideoForm" element={<AddVideoForm />} />
          {/* <Route path="/admin/videoUploadForm" element={<VideoUploadForm />} />
          <Route path="/admin/pdfUploadForm" element={<PdfUploadForm />} /> */}
          <Route path="/admin/addCourse" element={<AddCourse />} />
          <Route path="/" element={<HomePage01 />} />
          {/* <Route path="/page02" element={<Page02 />}/> */}
          <Route path="/CourseDescription/:id" element={<Page02 />} />
          <Route path="/share" element={<Share />} />
          <Route path="/language" element={<Language />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/cartHover" element={<AddToCart />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/error" element={<PageNotFound />} />
          <Route path="/testcart" element={<CartPage02 />} />
          <Route path="/gitACourse" element={<GiftACourse />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/communication" element={<Commmunication />} />
          <Route path="/personalPlane" element={<PersonalPlane />} />
          <Route path="/PurchaseHistory" element={<PurchaseHistory />} />
          <Route path="/PaymentSteps" element={<PaymentSteps />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contectus" element={<ContectUs />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/refundPolicy" element={<RefundPolicy />} />
          <Route path="/TearmAndCondition" element={<TearmAndCondition />} />
          <Route path="/CourseRating" element={<CourseRating />} />
          <Route path="/reportAbouse" element={<ReportAbousenew />} />
          <Route path="/exploreByCategory" element={<ExplorCategory />} />
          <Route path="/exploreMore" element={<ExploreMore />} />
          <Route path="/railwayExploreMore" element={<Railway />} />
          <Route path="/adminPage" element={<AdminPage />} />
          <Route path="/mylearning/:userId/:course_id" element={<VideoCoursesMain />}/>
          <Route path="/course/:courseId" element={<VideoCoursesMain />}/>
          <Route path="/MyLearningPage/:userId" element={<MyLearningMain/>}/>
          {/* <Route path="/learningPage/:userId" element={<LearningPage/>}/> */} 
        </Routes>
        {/* copy All Routes of D */}
         <Routes>
        
          {/* <Route path="/checkout" element={<CheckoutPage/>}/> */}
          {/* <Route path="/mylearning" element={<VideoCoursesMain />}>
            <Route path="/mylearning/overview" element={<CourseOverview/>} />
            <Route path="/mylearning/reviews" element={<Review />} />
            <Route path="/mylearning/search" element={<SearchBar />} />
            <Route
              path="/mylearning/announcement"
              element={<Announcements />}
            />
          </Route> */}
          {/* <Route path="/mylearning/notes" element={<NotesEditor />} />
          <Route path="/mylearning/q&a" element={<QandA />} />
          <Route path="/mylearning/learningtools" element={<LearningTools />} /> */}
          <Route path="/user/username" element={<PinnacleProfile />}/>
          <Route path="/user/edit-photo" element={<EditPhoto />} />
          <Route path="/user/edit-account" element={<AccountSecurity />} />
          <Route
            path="/user/manage-subscriptions"
            element={<Subscriptions />}
          />
          <Route
            path="/user/edit-payment-methods"
            element={<PaymentMethod/>}
          />
          <Route path="/user/edit-privacy" element={<Privacy />} />
          <Route
            path="/user/edit-notifications"
            element={<AccountNotification />}
          />
          <Route path="/user/close-account" element={<AccountClose />} />
          <Route path="/edit/account-settings" element={<AccountMain />} />
          <Route path="/giftcourse" element={<GiftACourseD />} />
          <Route path="/user/messages" element={<Messages />} />
          <Route path="/pinnacle-help" element={<PinnacleHelp />} />
          <Route path="/signuphelp" element={<SignUpHelp />} />
          <Route path="/account-main" element={<AccountMain />} />
          <Route path="/troubleshooting" element={<TroubleshootingHelp />} />
        </Routes> 
        {/* <Footer/> */}
      </Router>
    </div>
  );
}
