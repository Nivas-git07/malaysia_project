import swimmer from "../../assets/swimmer.png";

export default function RecordCard({
  name,
  time,
  championship,
  state,
  date
}){

  return(

    <div className="recordCard">

      <div className="recordImgWrap">
        <img src={swimmer} alt="swimmer"/>
      </div>

      <p className="recordName">{name}</p>

      <h3 className="recordTime">{time}</h3>

      <p className="recordChamp">{championship}</p>

      <div className="recordBottom">
        <span>{state}</span>
        <span>{date}</span>
      </div>

    </div>

  )
}
