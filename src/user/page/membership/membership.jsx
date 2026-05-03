import Swimmer from "../../layout/swimmer";
import Footer from "../../layout/footer";
import WhyJoinMFSA from "../../components/membershipcomponent/whyjoin";
import MembershipBenefits from "../../components/membershipcomponent/membsershipbenefit";
import { HowJoinMFSA } from "../../components/membershipcomponent/howjoin";
export default function Membership() {
  return (
    <>
      <Swimmer>
        <div className="homeHeroContents">
          <h1 className="homeHeroTitle">Membership</h1>
          <p className="homeHeroSub">
            Become a member and unlock new opportunities in sports and community
            engagement.
            <br />
            Take part in events, competitions, and build your journey with us.
          </p>
        </div>
      </Swimmer>

      <WhyJoinMFSA />
      <MembershipBenefits />
      <HowJoinMFSA />
      <Footer />
    </>
  );
}
