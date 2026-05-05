import Swimmer from "../../layout/swimmer";

import AboutPage from "../../components/aboutcomponent/aboutcontent";
import Footer from "../../layout/footer";
import ContactX from "../../components/contactcomponent/contactpage";
import FollowSectionX from "../../components/contactcomponent/followsection";
import { useCMSParams } from "../../../utils/cmsparam";
import { get_content } from "../../api/home_api";
import { useQuery } from "@tanstack/react-query";
export default function Contact() {
  const { data } = useQuery({
    queryKey: ["footer"],
    queryFn: () =>
      get_content({
        page: "footer",
        national: "national_page",
      }),
  });

  const content = data?.data;

  const { data: other } = useQuery({
    queryKey: ["others"],
    queryFn: () =>
      get_content({
        page: "others",
        national: "national_page",
      }),
  });

  const contactcontent = other?.data;

  console.log(contactcontent);

  return (
    <>
      <Swimmer>
        <div className="homeHeroContents">
          <h1 className="homeHeroTitle">Contact US</h1>
          <p className="homeHeroSub">
            {(
              contactcontent?.contactus_page_description ||
              "Have questions or need assistance? We’re here to help.\nReach out to us and we’ll get back to you as soon as possible."
            )
              .split(/\r?\n/)
              .map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i !== arr.length - 1 && <br />}
                </span>
              ))}
          </p>
        </div>
      </Swimmer>
      <ContactX content={content} />
      <FollowSectionX content={contactcontent} />

      <Footer />
    </>
  );
}
