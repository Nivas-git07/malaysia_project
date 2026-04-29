import Navbar from "../navbar/nav";
import MembershipPayment from "../../../user/auth/form/membershippayment";
import { useParams } from "react-router-dom";
import { checksession } from "../../api/home_api";
import { useQuery } from "@tanstack/react-query";
import SkeletonLoader from "../../components/common/SkeletonLoader";
import ErrorState from "../../components/common/ErrorState";

function AdminMembershipPayment() {


  const { data: sessionData, isLoading, error, refetch } = useQuery({
    queryKey: ["checkSession"],
    queryFn: checksession,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const user = sessionData?.data || {};

 
  const { planName } = useParams();

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="mu-membership-wrapper">
          <SkeletonLoader variant="card" count={2} />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="mu-membership-wrapper">
          <ErrorState
            title="Unable to load payment details"
            message="Please check your connection and try again."
            onRetry={() => refetch()}
          />
        </div>
      </>
    );
  }

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
      name: "AFFILIATE_MEMBER",
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
          amount={amount}   // ✅ PASS AMOUNT
          user={user}
        />
      </div>
    </>
  );
}

export default AdminMembershipPayment;