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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <br />
            Vivamus vehicula, lorem a porttitor porttitor, velit erat
          </p>
        </div>
      </Swimmer>
      <NewsDetailX />

      <Footer />
    </>
  );
}
