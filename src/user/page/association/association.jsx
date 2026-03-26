import Footer from "../../layout/footer";
import Swimmer from "../../layout/swimmer";
import StateAssociationX from "../../components/associatecomponent/associatedstate";
export default function Association() {
  return (
    <div>
        
      <Swimmer>
        <div className="homeHeroContent">
          <h1 className="homeHeroTitle">Associated States</h1>
          <p className="homeHeroSub">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.consectetur adipiscing elit.
            <br />
            Vivamus vehicula, lorem a porttitor porttitor, velit erat.lorem a porttitor porttitor
          </p>
        </div>
      </Swimmer>
      <StateAssociationX />
      <Footer />
    </div>
  );
}
