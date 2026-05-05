import { useEffect, useState } from "react";
import Navbar from "./navbar";
import videoFallback from "../assets/animate5.mp4";
import { get_content } from "../api/home_api";
import { useQuery } from "@tanstack/react-query";
import { useCMSParams } from "../../utils/cmsparam";

export default function Swimmer({ children }) {
  const params = useCMSParams("home");

  const { data: homecontent } = useQuery({
    queryKey: ["home", params],
    queryFn: () => get_content(params),
    keepPreviousData: true, // ✅ IMPORTANT
  });

  const content = homecontent?.data;

  /* =========================
     VIDEO STATE MANAGEMENT
  ========================= */
  const [videoSrc, setVideoSrc] = useState(videoFallback);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const newVideo = content?.home_page_banner;

    if (!newVideo) return;

    // If same video → do nothing
    if (newVideo === videoSrc) return;

    setLoading(true);

    const video = document.createElement("video");
    video.src = newVideo;

    video.oncanplay = () => {
      setVideoSrc(newVideo); // switch only when ready
      setLoading(false);
    };
  }, [content?.home_page_banner]);

  return (
    <>
      <Navbar />

      <section className="hero">

        {/* VIDEO */}
        <video
          key={videoSrc}
          className={`heroVideo ${loading ? "blur" : ""}`}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        {/* OPTIONAL LOADER OVERLAY */}
        {loading && (
          <div className="videoLoader">
            <span>Loading...</span>
          </div>
        )}

        {children}
      </section>
    </>
  );
}