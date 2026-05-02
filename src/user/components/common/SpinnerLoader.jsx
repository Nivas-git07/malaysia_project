export default function SpinnerLoader({ label = "Loading..." }) {
  return (
    <div className="mfsaSpinnerWrap" role="status" aria-live="polite">
      <span className="mfsaSpinner" />
      <span className="mfsaSpinnerText">{label}</span>
    </div>
  );
}
