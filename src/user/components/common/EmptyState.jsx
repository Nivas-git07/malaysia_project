export default function EmptyState({
  title = "No data found",
  message = "There is nothing to display right now.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="mfsaUiState mfsaEmptyUiState">
      <h3>{title}</h3>
      <p>{message}</p>
      {actionLabel && onAction && (
        <button type="button" className="mfsaUiRetryBtn" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
