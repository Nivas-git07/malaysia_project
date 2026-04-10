import { useState } from "react";
import ClubFormX from "../../auth/form/clubabout";
import Header from "../../auth/top";
import Footer from "../../layout/footer";
export default function RegistrationAboutForm() {
  const [activeTab, setActiveTab] = useState("individual");

  return (
    <>
      <Header />
      <section className="regSection">
        <div className="regContainer">
          <ClubFormX />
        </div>
      </section>
      <Footer />
    </>
  );
}
