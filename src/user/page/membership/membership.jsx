import Swimmer from "../../layout/swimmer";
import Footer from "../../layout/footer";
import WhyJoinMFSA from "../../components/membershipcomponent/whyjoin";
import MembershipBenefits from "../../components/membershipcomponent/membsershipbenefit";
import { HowJoinMFSA } from "../../components/membershipcomponent/howjoin";

import { useQuery } from "@tanstack/react-query";
import { get_content } from "../../api/home_api";

/* =========================
   DEFAULT FALLBACK
========================= */
const DEFAULT_MEMBERSHIP = {
  membership_page_description: `Become a member and unlock new opportunities in sports and community engagement.
Take part in events, competitions, and build your journey with us.`,
  membership_page_image: null,
};

/* =========================
   MERGE FUNCTION
========================= */
const mergeData = (apiData) => {
  if (!apiData) return DEFAULT_MEMBERSHIP;

  return {
    membership_page_description:
      apiData.membership_page_description ||
      DEFAULT_MEMBERSHIP.membership_page_description,

    membership_page_image:
      apiData.membership_page_image ||
      DEFAULT_MEMBERSHIP.membership_page_image,
  };
};

export default function Membership() {

  const { data } = useQuery({
    queryKey: ["membership"],
    queryFn: () =>
      get_content({
        page: "membership",
        national: "national_page", 
      }),
  });

  const content = mergeData(data?.data);

  return (
    <>
      <Swimmer bg={content.membership_page_image}>
        <div className="homeHeroContents">
          <h1 className="homeHeroTitle">Membership</h1>

        
          <p className="homeHeroSub">
            {content.membership_page_description
              ?.split("\n")
              .map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
          </p>
        </div>
      </Swimmer>

      {/* PASS FULL DATA ↓ */}
      <WhyJoinMFSA data={data?.data} />
      <MembershipBenefits data={data?.data} />
      <HowJoinMFSA data={data?.data} />

      <Footer />
    </>
  );
}