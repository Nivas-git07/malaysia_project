import { FiArrowRight } from "react-icons/fi";
export default function Preview() {
  return (
    <div className="mfsaPreviewX-section">
      <div className="mfsaPreviewX-card">
        <div className="mfsaPreviewX-content">
          <span className="mfsaPreviewX-badge">PREVIEW MODE</span>

          <h3>Need a Live Preview?</h3>

          <p>
            View how your changes will appear to association members before
            hitting publish.
          </p>

          <button className="mfsaPreviewX-btn">
            Open Preview Page <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
