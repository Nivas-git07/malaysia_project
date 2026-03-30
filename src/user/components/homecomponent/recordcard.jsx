import swimmer from "../../assets/swimmer.png";

export default function RecordCardX({ name, discipline, time, img }) {
  return (
    <div className="mfsaRecordX-card">

      <div className="mfsaRecordX-imgWrap">
        <img src={img} alt={name} />
      </div>

      <p className="mfsaRecordX-name">{name}</p>

      <span className="mfsaRecordX-discipline">{discipline}</span>

      <h3 className="mfsaRecordX-time">{time}</h3>

    </div>
  );
}