import AthleteNavbar from "../../layout/athletenavbar";
import AthleteMembersipPurchaseCenter from "../../components/membership/membershippurchase";
import AthleteMembershipALLStatus from "../../components/membership/membershipallstatus";
import { useQuery } from "@tanstack/react-query";
import { get_purchased_membership } from "../../../admin/api/membership";
import SkeletonLoader from "../../components/common/SkeletonLoader";
import ErrorState from "../../components/common/ErrorState";
function AthleteMembership() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["purchased-memberships"],
    queryFn: get_purchased_membership,
  });
  console.log("Purchased Memberships:", data?.data || []);
  const memberships = data?.data || [];

  if (isLoading) return <SkeletonLoader variant="card" count={3} />;
  if (isError)
    return (
      <ErrorState
        title="Unable to load memberships"
        message="Please check your connection and try again."
        onRetry={() => window.location.reload()}
      />
    );
  if (memberships.length === 0) {
    return <AthleteMembersipPurchaseCenter />;
  }
  return <AthleteMembershipALLStatus memberships={memberships} />;
}
export default AthleteMembership;
