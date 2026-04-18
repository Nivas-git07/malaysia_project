import Navbar from "../navbar/nav";
import MembershipPayment from "../../../user/auth/form/membershippayment";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom"
function AdminMembershipPayment() {
  const { planName } = useParams();

  return (
    <>
    
      <Navbar />
      <div className="mu-membership-wrapper">
        <MembershipPayment plan={planName} />
      </div>
    </>
  );
}

export default AdminMembershipPayment;
