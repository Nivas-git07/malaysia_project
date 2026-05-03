import Swimmer from "../../layout/swimmer";

import AboutPage from "../../components/aboutcomponent/aboutcontent";
import Footer from "../../layout/footer";
import ContactX from "../../components/contactcomponent/contactpage";
import FollowSectionX from "../../components/contactcomponent/followsection";
export default function Contact() {
  return (
    <>
      <Swimmer>
        <div className="homeHeroContents">
          <h1 className="homeHeroTitle">Contact US</h1>
          <p className="homeHeroSub">
            Have questions or need assistance? We’re here to help.
            <br />
            Reach out to us and we’ll get back to you as soon as possible.
          </p>
        </div>
      </Swimmer>
      <ContactX />
      <FollowSectionX />

      <Footer />
    </>
  );
}
