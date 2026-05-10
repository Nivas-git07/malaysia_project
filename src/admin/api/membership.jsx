import API from "../../user/api/axiosmodal";

export const getmebership = () => {
  return API.get("/super/get-membership-list/");
};

export const getmebershipdetails = (id) => {
  return API.get(`/super/get-membership-data/?id=${id}`);
};

export const approvemembership = (id, status) => {
  return API.patch(`/super/set-status/?id=${id}`, { status });
};

export const rejectmembership = (id, status, rejection_note) => {
  return API.patch(`/super/set-status/?id=${id}`, { status, rejection_note });
};

export const get_purchased_membership = () => {
  return API.get("/super/membership-list/");
};

export const leaveMembership = (id, target_state_id) => {
  console.log(
    "Leaving membership with ID:",
    id,
    "Target State ID:",
    target_state_id,
  );
  return API.post(`/super/initiate-transfer/?membership_id=${id}`, {
    target_state_id,
  });
};
export const leaveclubMembership = (id, target_club_id) => {
  console.log(
    "Leaving membership with ID:",
    id,
    "Target Club ID:",
    target_club_id,
  );

  return API.post(`/super/initiate-transfer/?membership_id=${id}`, {
    target_club_id,
  });
};
export const get_pending_requests = () => {
  return API.get("/super/get-pending-transfers/");
};

export const approve_target_transfer = (id) => {
  return API.post(`/super/transfer-approve/?transfer_id=${id}`);
};

export const get_accepted_transfers = () => {
  return API.get("/super/get-accepted-transfers/");
};

export const reject_target_transfer = (id) => {
  return API.post(`/super/release-membership/?transfer_id=${id}`);
};

export const renew_membership = (id) => {
  return API.post(`/auth/purchase-membership/?action=renew&membership_id=${id}`)
};
