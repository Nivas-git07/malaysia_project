import MembersipStatus from "../membership/membershipstatus";
import MembersipPurchaseCenter from "../membership/membershippurchase";
import AdminMembershipPayment from "../membership/memberpayment";
import MembershipALLStatus from "../membership/membershipallstatus";
import { useQuery } from "@tanstack/react-query";
import { get_purchased_membership } from "../../api/membership";
function MembersipRenew() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["purchased-memberships"],
    queryFn: get_purchased_membership,
  });

  const memberships = data?.data || [];

  if (isLoading) return <p style={{ padding: 20 }}>Loading...</p>;
  if(memberships.length === 0) {
    return <MembersipPurchaseCenter />;
  }
  return <MembershipALLStatus memberships={memberships} />;
}

export default MembersipRenew;
