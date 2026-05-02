export default function ErrorState({
  title = "Something went wrong",
  message = "We could not load this content right now.",
  onRetry,
}) {
  return (
    <div className="mfsaUiState mfsaErrorState" role="alert" aria-live="assertive">
      <h3>{title}</h3>
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="mfsaUiRetryBtn" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
