import MembersipStatus from "../membership/membershipstatus";
import MembersipPurchaseCenter from "../membership/membershippurchase";
import AdminMembershipPayment from "../membership/memberpayment";
import MembershipALLStatus from "../membership/membershipallstatus";
import { useQuery } from "@tanstack/react-query";
import { get_purchased_membership } from "../../api/membership";
import Navbar from "../navbar/nav";
import SkeletonLoader from "../../components/common/SkeletonLoader";
import ErrorState from "../../components/common/ErrorState";
function MembersipRenew() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["purchased-memberships"],
    queryFn: get_purchased_membership,
  });

  const memberships = data?.data || [];

  if (isLoading)
    return (
      <>
        <Navbar />
        <div className="mu-membership-wrapper">
          <SkeletonLoader variant="card" count={3} />
        </div>
      </>
    );

  if (isError)
    return (
      <>
        <Navbar />
        <div className="mu-membership-wrapper">
          <ErrorState
            title="Unable to load memberships"
            message="Please check your connection and try again."
            onRetry={() => refetch()}
          />
        </div>
      </>
    );
  if(memberships.length === 0) {
    return <MembersipPurchaseCenter />;
  }
  return <MembershipALLStatus memberships={memberships} />;
}

export default MembersipRenew;
