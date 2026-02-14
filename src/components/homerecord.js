export default function HomeRecords(){

  const records = [
    { count:"350+", title:"TOTAL MATCHES" },
    { count:"10+", title:"TOTAL MATCHES" },
    { count:"142+", title:"TOTAL MATCHES" },
    { count:"112+", title:"TOTAL MATCHES" },
  ];

  return(

    <section className="homeRecordsSection">

      <div className="homeRecordsContainer">

        {records.map((item,index)=>(
          <div className="homeRecordItem" key={index}>

            <h2 className="homeRecordCount">{item.count}</h2>

            <p className="homeRecordTitle">{item.title}</p>

            <p className="homeRecordPara">
              Lorem ipsum is velit amet tempor 3–16.
            </p>

          </div>
        ))}

      </div>

    </section>

  )
}
