import { useEffect, useState, useRef } from "react";

function CountUp({ value }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = parseInt(value);
          const duration = 1000;
          const increment = end / (duration / 16);

          const timer = setInterval(() => {
            start += increment;

            if (start >= end) {
              start = end;
              clearInterval(timer);
            }

            setCount(Math.floor(start));
          }, 16);

          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);
  }, [value]);

  return (
    <h2 ref={ref} className="homeRecordCount">
      {count}+
    </h2>
  );
}

export default function HomeRecords({ stats }) {
  console.log("HomeRecords stats:", stats);
  const records = [
    {
      count: stats.total_events || "0",
      title: "TOTAL EVENTS",
      para: "Total number of finswimming events organized across all regions, promoting competition and participation.",
    },
    {
      count: stats.states_count || "0",
      title: "TOTAL STATES",
      para: "Number of states actively involved in developing and supporting finswimming activities.",
    },
    {
      count: stats.clubs_count || "0",
      title: "TOTAL CLUBS",
      para: "Registered clubs contributing to athlete training, development, and competitive excellence.",
    },
    {
      count: stats.athletes_count || "0",
      title: "TOTAL SWIMMERS",
      para: "Total athletes participating in finswimming, representing talent and growth in the sport.",
    },
  ];

  return (
    <section className="homeRecordsSection">
      <div className="homeRecordsContainer">
        {records.map((item, index) => (
          <div className="homeRecordItem" key={index}>
            <CountUp value={item.count} />

            <p className="homeRecordTitle">{item.title}</p>

            <p className="homeRecordPara">
              {item.para}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
