import Register from "../page/register/register";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../page/login/login";
import Home from "../page/home/home";
import Event from "../page/event/event";
import Eventview from "../page/eventdescription/eventview";
import About from "../page/about/about";
import AllAthelete from "../page/allatheletes/athelete";
import Association from "../page/association/association";
import Athelete from "../page/athelete/athelteprofile";
import ScrollToTop from "../hooks/scrolltotop";
import StatePage from "../page/state/state";
import ClubPage from "../page/club/club";
import Contact from "../page/contact/contact";
import News from "../page/news/news";
import RegistrationAboutForm from "../page/register/resisterabout";
import Registermembership from "../page/register/registermembership";
import Membership from "../page/membership/membership";
function Page() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="" element={<Home />} />
        <Route path=":location" element={<StatePage />} />
        <Route path=":location/:club" element={<ClubPage />} />
        <Route path="event" element={<Event />} />
        <Route path="eventview" element={<Eventview />} />
        <Route path="about" element={<About />} />
        <Route path="allathelete" element={<AllAthelete />} />
        <Route path="association" element={<Association />} />
        <Route path="athelete" element={<Athelete />} />
        <Route path="contact" element={<Contact />} />
        <Route path="news" element={<News />} />
        <Route path="registerabout" element={<RegistrationAboutForm />} />
        <Route path="registermembership" element={<Registermembership />} />
        <Route path="membershipabout" element={<Membership />} />
      </Routes>
    </>
  );
}

export default Page;
