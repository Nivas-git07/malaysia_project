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

  const activeRequest = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const newVideo = content?.home_page_banner;

    // no video from backend
    if (!newVideo) {
      setVideoSrc(videoFallback);
      return;
    }

    // same video avoid reload
    if (newVideo === videoSrc) return;

    setLoading(true);

    const requestId = Date.now();
    activeRequest.current = requestId;

    const preloadVideo = document.createElement("video");

    preloadVideo.src = newVideo;
    preloadVideo.preload = "auto";
    preloadVideo.muted = true;

    // timeout protection
    const timeout = setTimeout(() => {
      if (activeRequest.current !== requestId) return;

      console.log("Video loading timeout");

      setVideoSrc(videoFallback);
      setLoading(false);
    }, 15000);

    preloadVideo.onloadeddata = () => {
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

      preloadVideo.pause();
      preloadVideo.removeAttribute("src");
      preloadVideo.load();
    };
  }, [content?.home_page_banner]);

  /* =========================
     FORCE VIDEO RELOAD
  ========================= */

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();

      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log("Autoplay prevented:", err);
        });
      }
    }
  }, [videoSrc]);

  return (
    <>
      <Navbar />

      <section className="hero">
        {/* VIDEO */}
        <video
          key={videoSrc}
          ref={videoRef}
          className={`heroVideo ${loading ? "blur" : ""}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* OPTIONAL LOADER */}
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