export default function SkeletonLoader({ variant = "card", count = 3 }) {
  const items = Array.from({ length: count });

  if (variant === "text") {
    return (
      <div className="mfsaSkeletonGroup">
        {items.map((_, idx) => (
          <div key={`text-${idx}`} className="mfsaSkeleton mfsaSkeletonText" />
        ))}
      </div>
    );
  }

  if (variant === "table") {
    return (
      <div className="mfsaSkeletonTableWrap">
        {items.map((_, idx) => (
          <div key={`row-${idx}`} className="mfsaSkeleton mfsaSkeletonTableRow" />
        ))}
      </div>
    );
  }

  return (
    <div className="mfsaSkeletonCards">
      {items.map((_, idx) => (
        <div key={`card-${idx}`} className="mfsaSkeletonCard">
          <div className="mfsaSkeleton mfsaSkeletonMedia" />
          <div className="mfsaSkeleton mfsaSkeletonLine" />
          <div className="mfsaSkeleton mfsaSkeletonLine short" />
          <div className="mfsaSkeleton mfsaSkeletonButton" />
        </div>
      ))}
    </div>
  );
}

