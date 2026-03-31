import Header from "../../auth/top";
import MembershipStep from "../../auth/form/membershipsubmission";
import Footer from "../../layout/footer";
import MembershipPayment from "../../auth/form/membershippayment";
export default function Registermembershipsubmission() {
  return (
    <div>
      <Header />
      <MembershipStep />
        <MembershipPayment />
      <Footer />
    </div>
  );
}
