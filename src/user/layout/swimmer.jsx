import { useEffect, useRef, useState } from "react";
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
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  const content = homecontent?.data;

  /* =========================
     VIDEO STATE
  ========================= */
  const [videoSrc, setVideoSrc] = useState(videoFallback);
  const [loading, setLoading] = useState(false);

  const activeRequest = useRef(null); // 🔥 track latest request

  useEffect(() => {
    const newVideo = content?.home_page_banner;

    if (!newVideo) {
      setVideoSrc(videoFallback);
      return;
    }

    // prevent duplicate load
    if (newVideo === videoSrc) return;

    setLoading(true);

    const requestId = Date.now();
    activeRequest.current = requestId;

    const video = document.createElement("video");
    video.src = newVideo;
    video.preload = "auto";

    video.oncanplaythrough = () => {
      // 🔥 ignore old requests
      if (activeRequest.current !== requestId) return;

      setVideoSrc(newVideo);
      setLoading(false);
    };

    video.onerror = () => {
      if (activeRequest.current !== requestId) return;

      setVideoSrc(videoFallback);
      setLoading(false);
    };

    // cleanup old video loading
    return () => {
      video.src = "";
    };
  }, [content?.home_page_banner]);

  return (
    <>
      <Navbar />

      <section className="hero">
        {/* VIDEO */}
        <video
          className={`heroVideo ${loading ? "blur" : ""}`}
          src={videoSrc}
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