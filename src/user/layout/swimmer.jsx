import Navbar from "./navbar";
import video from "../assets/animate5.mp4";
import { get_content } from "../api/home_api";
import { useQuery } from "@tanstack/react-query";
import { useCMSParams } from "../../utils/cmsparam";
export default function Swimmer({ children }) {
  const params = useCMSParams("home");

  const { data: homecontent } = useQuery({
    queryKey: ["home", params],
    queryFn: () => get_content(params),
  });

  const content = homecontent?.data;
  console.log("content video", content);
  return (
    <>
      <Navbar />
      <section className="hero">
        {/* VIDEO BACKGROUND */}
        <video
          key={content?.home_page_banner || video}
          className="heroVideo"
          src={content?.home_page_banner || video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        {children}
      </section>
    </>
  );
}
