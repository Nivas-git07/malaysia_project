import { useEffect, useState } from "react";
import logo from "../admin/assets/logo.jpg";
import "./MFSAInitialLoader.css";

export default function MFSAInitialLoader({ children }) {
  const [shouldShow, setShouldShow] = useState(() => {
    try {
      if (sessionStorage.getItem("mfsa_splash_done") === "1") return false;

      // Mark immediately to avoid React.StrictMode double-mount splash flicker.
      sessionStorage.setItem("mfsa_splash_done", "1");
      return true;
    } catch {
      return true;
    }
  });
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (!shouldShow) return;

    // Keep the splash visible briefly so the initial “open website” feels intentional.
    const visibleMs = 3000;
    const fadeMs = 250;

    const t1 = window.setTimeout(() => {
      setIsFading(true);
    }, visibleMs);    

    const t2 = window.setTimeout(() => {
      setShouldShow(false);
    }, visibleMs + fadeMs);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [shouldShow]);

  if (!shouldShow) return children;

  return (
    <>
      <div
        className={`mfsaInitialOverlay${isFading ? " fading" : ""}`}
        role="status"
        aria-live="polite"
        aria-label="Loading MFSA website"
      >
        <div className="mfsaInitialInner">
          <img className="mfsaInitialLogo" src={logo} alt="MFSA logo" />
          <div className="mfsaInitialText">Loading MFSA...</div>
        </div>
      </div>
      {children}
    </>
  );
}

