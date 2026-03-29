import Swimmer from "../../layout/swimmer";
import Footer from "../../layout/footer";
import WhyJoinMFSA from "../../components/membershipcomponent/whyjoin";
import MembershipBenefits from "../../components/membershipcomponent/membsershipbenefit";
export default function Membership() {
  return (
    <>
      <Swimmer>
        <div className="homeHeroContent">
          <h1 className="homeHeroTitle">Membership</h1>
          <p className="homeHeroSub">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <br />
            Vivamus vehicula, lorem a porttitor porttitor, velit erat
          </p>
        </div>
      </Swimmer>

      <WhyJoinMFSA />
      <MembershipBenefits />
      <Footer />
    </>
  );
}
