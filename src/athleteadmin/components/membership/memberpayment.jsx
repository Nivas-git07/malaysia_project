import Navbar from "../navbar/nav";
import MembershipPayment from "../../../user/auth/form/membershippayment";
import { useParams } from "react-router-dom";
import { checksession } from "../../api/home_api";
import { useQuery } from "@tanstack/react-query";

function AthleteMembershipPayment() {


  const { data: sessionData } = useQuery({
    queryKey: ["checkSession"],
    queryFn: checksession,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const user = sessionData?.data || {};

 
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
      <Navbar />

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