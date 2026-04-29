import AthleteNavbar from "../../layout/athletenavbar";
import MembershipPayment from "../../../user/auth/form/membershippayment";
import { useParams } from "react-router-dom";
import { checksession } from "../../../admin/api/home_api";
import { useQuery } from "@tanstack/react-query";
// import { get_check } from "../../../user/api/home_api";
function AthleteMembershipPayment() {


  const { data: sessionData } = useQuery({
    queryKey: ["checkSession"],
    queryFn: checksession,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const user = sessionData?.data || {};

  console.log("Session Data:", user);

  

 
  const { planName } = useParams();

  const membershipPlans = [
    {
      name: "INDIVIDUAL_MEMBER",
      price: 50,
    },
    {
      name: "ALLIED_MEMBER",
      price: 100,
    },
    {
      name: "Coach",
      price: 150,
    },
    {
      name: "Technical Official",
      price: 120,
    },
  ];


  const selectedPlan = membershipPlans.find(
    (plan) => plan.name === planName
  );

 
  const amount = selectedPlan?.price || 0;

  console.log("Selected Plan:", selectedPlan);

  return (
    <>
      <AthleteNavbar />

      <div className="mu-membership-wrapper">
        <MembershipPayment
          plan={planName}
          amount={amount} 
          user={user}
        />
      </div>
    </>
  );
}

export default AthleteMembershipPayment;