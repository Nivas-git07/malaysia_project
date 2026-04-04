import Swimmer from "../../layout/swimmer";
import Footer from "../../layout/footer";

import NewsDetailX from "../../components/newscomponent/newsdetails";
export default function News() {
  return (
    <>
      <Swimmer>
        <div className="homeHeroContent">
          <h1 className="homeHeroTitle">News</h1>
          <p className="homeHeroSub">
            Discover the latest updates, stories, and highlights from across our
            network.
            <br />
            From major events to key announcements — stay informed and
            connected.
          </p>  
        </div>
      </Swimmer>
      <NewsDetailX />

      <Footer />
    </>
  );
}
