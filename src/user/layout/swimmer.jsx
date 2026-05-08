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

  const [videoSrc, setVideoSrc] = useState(videoFallback);
  const [loading, setLoading] = useState(false);

  const videoRef = useRef(null);
  const activeRequest = useRef(null);

  /* =========================
     VIDEO PRELOAD
  ========================= */

  useEffect(() => {
    const newVideo = content?.home_page_banner;

    if (!newVideo) {
      setVideoSrc(videoFallback);
      return;
    }

    // avoid same reload
    if (newVideo === videoSrc) return;

    setLoading(true);

    const requestId = Date.now();
    activeRequest.current = requestId;

    const preloadVideo = document.createElement("video");

    preloadVideo.src = newVideo;
    preloadVideo.preload = "metadata";
    preloadVideo.muted = true;
    preloadVideo.playsInline = true;

    const timeout = setTimeout(() => {
      if (activeRequest.current !== requestId) return;

      console.log("Video timeout");

      setVideoSrc(videoFallback);
      setLoading(false);
    }, 10000);

    preloadVideo.oncanplaythrough = () => {
      if (activeRequest.current !== requestId) return;

      clearTimeout(timeout);

      setVideoSrc(newVideo);
      setLoading(false);
    };

    preloadVideo.onerror = () => {
      if (activeRequest.current !== requestId) return;

      clearTimeout(timeout);

      console.log("Video failed");

      setVideoSrc(videoFallback);
      setLoading(false);
    };

    return () => {
      clearTimeout(timeout);

      preloadVideo.removeAttribute("src");
      preloadVideo.load();
    };
  }, [content?.home_page_banner]);

  /* =========================
     AUTOPLAY
  ========================= */

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (err) {
        console.log("Autoplay blocked:", err);
      }
    };

    playVideo();
  }, [videoSrc]);

  return (
    <>
      <Navbar />

      <section className="hero">
        <video
          ref={videoRef}
          className={`heroVideo ${loading ? "opacity-0" : "opacity-100"}`}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />

        {loading && (
          <div className="videoLoader">
            Loading video...
          </div>
        )}

        {children}
      </section>
    </>
  );
}