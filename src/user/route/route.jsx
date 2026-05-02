import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "../hooks/scrolltotop";
import PageWrapper from "../hooks/animateroute";
import Register from "../page/register/register";
import Login from "../page/login/login";
import Home from "../page/home/home";
import Event from "../page/event/event";
import Eventview from "../page/eventdescription/eventview";
import About from "../page/about/about";
import AllAthelete from "../page/allatheletes/athelete";
import Association from "../page/association/association";
import Athelete from "../page/athelete/athelteprofile";
import StatePage from "../page/state/state";
import ClubPage from "../page/club/club";
import Contact from "../page/contact/contact";
import News from "../page/news/news";
import RegistrationAboutForm from "../page/register/resisterabout";
import Registermembership from "../page/register/registermembership";
import Membership from "../page/membership/membership";
import Gallery from "../page/gallery/gallery";
import Registermembershipsubmission from "../page/register/registermemsubmission";
import Aboutpreview from "../../admin/previewtemplate/aboutpreview";
import BestRecords from "../page/bestrecord/bestrecord";
import Unauthorized from "../components/unauthorize/unauthorized";
export default function Page() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="register" element={<PageWrapper><Register /></PageWrapper>} />
          <Route path="login" element={<PageWrapper><Login /></PageWrapper>} />

          <Route path="state/:stateId" element={<PageWrapper><StatePage /></PageWrapper>} />
          <Route path="state/:stateId/club/:clubId" element={<PageWrapper><ClubPage /></PageWrapper>} />
          <Route path="/club/:clubId" element={<PageWrapper><ClubPage /></PageWrapper>} />
          <Route path="event" element={<PageWrapper><Event /></PageWrapper>} />
          <Route path="state/:stateId/event" element={<PageWrapper><Event /></PageWrapper>} />
          <Route path="state/:stateId/club/:clubId/event" element={<PageWrapper><Event /></PageWrapper>} />

          <Route path="eventview/:eventId" element={<PageWrapper><Eventview /></PageWrapper>} />

          <Route path="about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="state/:stateId/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="state/:stateId/club/:clubId/about" element={<PageWrapper><About /></PageWrapper>} />

          <Route path="/athletes" element={<PageWrapper><AllAthelete /></PageWrapper>} />
          <Route path="state/:stateId/club/:clubId/athlete" element={<PageWrapper><AllAthelete /></PageWrapper>} />

          <Route path="association" element={<PageWrapper><Association /></PageWrapper>} />
          <Route path="state/:stateId/association" element={<PageWrapper><Association /></PageWrapper>} />

          <Route path="athelete" element={<PageWrapper><Athelete /></PageWrapper>} />

          <Route path="contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="state/:stateId/club/:clubId/contact" element={<PageWrapper><Contact /></PageWrapper>} />

          <Route path="news" element={<PageWrapper><News /></PageWrapper>} />
          <Route path="state/:stateId/news" element={<PageWrapper><News /></PageWrapper>} />
          <Route path="state/:stateId/club/:clubId/news" element={<PageWrapper><News /></PageWrapper>} />

          <Route path="gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
          <Route path="state/:stateId/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
          <Route path="state/:stateId/club/:clubId/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />

          <Route path="bestrecords" element={<PageWrapper><BestRecords /></PageWrapper>} />
          <Route path="state/:stateId/bestrecords" element={<PageWrapper><BestRecords /></PageWrapper>} />
          <Route path="state/:stateId/club/:clubId/gallery" element={<PageWrapper><BestRecords /></PageWrapper>} />

          <Route path="registerabout" element={<PageWrapper><RegistrationAboutForm /></PageWrapper>} />
          <Route path="registermembership" element={<PageWrapper><Registermembership /></PageWrapper>} />
          <Route path="membershipabout" element={<PageWrapper><Membership /></PageWrapper>} />
          <Route path="membershipsubmission" element={<PageWrapper><Registermembershipsubmission /></PageWrapper>} />

          <Route path="aboutpreview" element={<PageWrapper><Aboutpreview /></PageWrapper>} />
          <Route path="unauthorized" element={<PageWrapper><Unauthorized /></PageWrapper>} />

        </Routes>
      </AnimatePresence>
    </>
  );
}