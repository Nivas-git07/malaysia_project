import { useParams } from "react-router-dom";

/**
 * Global CMS Param Builder
 * @param {string} page - home | news | gallery | membership etc.
 */
export const useCMSParams = (page) => {
  const { stateId, clubId } = useParams();


  if (clubId) {
    return {
      page,
      club_id: clubId,
    };
  }


  if (stateId) {
    return {
      page,
      state_id: stateId,
    };
  }


  return {
    page,
    national: "national_page",
  };
};