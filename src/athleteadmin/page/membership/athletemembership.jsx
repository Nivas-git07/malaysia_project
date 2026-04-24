import AthleteNavbar from "../../layout/athletenavbar";
import AthleteMembersipPurchaseCenter from "../../components/membership/membershippurchase";
import AthleteMembershipALLStatus from "../../components/membership/membershipallstatus";
import { useQuery } from "@tanstack/react-query";
import { get_purchased_membership } from "../../../admin/api/membership";
function AthleteMembership() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["purchased-memberships"],
    queryFn: get_purchased_membership,
  });
  console.log("Purchased Memberships:", data?.data || []);
  const memberships = data?.data || [];

  if (isLoading) return <p style={{ padding: 20 }}>Loading...</p>;
  if (memberships.length === 0) {
    return <AthleteMembersipPurchaseCenter />;
  }
  return <AthleteMembershipALLStatus memberships={memberships} />;
}
export default AthleteMembership;
