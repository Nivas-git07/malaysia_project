import swimmer from "../../assets/swimmer.png";

export default function RecordCardX({
  full_name,
  discipline,
  best_time,
  profile_picture,
}) {
  return (
    <div className="mfsaRecordX-card">
      <div className="mfsaRecordX-imgWrap">
        <img
           src={`${import.meta.env.VITE_APP_API}/${profile_picture}`}
          alt={name}
        />
      </div>

      <p className="mfsaRecordX-name">{full_name}</p>

      <span className="mfsaRecordX-discipline">{discipline}</span>

      <h3 className="mfsaRecordX-time">{best_time}</h3>
    </div>
  );
}
