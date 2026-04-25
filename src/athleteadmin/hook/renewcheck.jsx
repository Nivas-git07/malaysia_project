export const HandleRenew = (item, daysLeft) => {
  console.log("Renewing membership:", item, "Days left:", daysLeft);
  if (daysLeft >= 0) {
    alert(
      "Your membership has not ended. You cannot renew it. Please purchase a new membership.",
    );
    return;
  }
  console.log(
    "Navigating to renew page for membership ID:",
    item.membership_id,
  );

  // navigate(`/athlete/membership/renew/${item.membership_id}`);
};
