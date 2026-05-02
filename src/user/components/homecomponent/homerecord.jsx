import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

// 🔢 CountUp Component
function CountUp({ value }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = parseInt(value) || 0;
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
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [value]);

  return (
    <h2 ref={ref} className="homeRecordCount">
      {count}+
    </h2>
  );
}

// 📊 Main Component
export default function HomeRecords({ stats = {} }) {
  const { stateId, clubId } = useParams();

  let records = [];

  // 🔵 CLUB LEVEL
  // 🔵 CLUB LEVEL
  if (clubId) {
    records = [
      {
        count: stats.total_events || 0,
        title: "TOTAL EVENTS",
        para: "Total finswimming events organized or attended by this club, including competitions and training sessions.",
      },
      {
        count: stats.total_athletes || 0,
        title: "TOTAL SWIMMERS",
        para: "Number of athletes training and competing under this club, reflecting participation and overall team strength.",
      },
      {
        count: stats.total_news || 0,
        title: "TOTAL NEWS",
        para: "Latest updates, announcements, and achievements related to this club and its ongoing activities.",
      },
    ];
  }

  // 🟢 STATE LEVEL
  else if (stateId) {
    records = [
      {
        count: stats.total_events || 0,
        title: "TOTAL EVENTS",
        para: "Total finswimming events conducted across the state, including competitions, training programs, and development initiatives.",
      },
      {
        count: stats.total_clubs || 0,
        title: "TOTAL CLUBS",
        para: "Number of active clubs supporting finswimming development through training, competitions, and athlete engagement statewide.",
      },
      {
        count: stats.total_athletes || 0,
        title: "TOTAL SWIMMERS",
        para: "Total athletes participating across the state, reflecting growth, talent availability, and regional sport engagement.",
      },
      {
        count: stats.total_news || 0,
        title: "TOTAL NEWS",
        para: "Recent finswimming news and updates across the state, keeping communities informed about important developments.",
      },
    ];
  }

  // 🔴 NATIONAL LEVEL
  else {
    records = [
      {
        count: stats.total_events || 0,
        title: "TOTAL EVENTS",
        para: "Total finswimming events conducted nationwide, including championships, competitions, and training programs across regions.",
      },
      {
        count: stats.states_count || 0,   // ✅ CHANGED
        title: "TOTAL STATES",            // ✅ CHANGED
        para: "Number of states actively participating in finswimming, reflecting nationwide reach and regional involvement.",
      },
      {
        count: stats.
          clubs_count
          || 0,
        title: "TOTAL CLUBS",
        para: "Registered clubs across the country supporting finswimming through structured training, competitions, and development programs.",
      },
      {
        count: stats.
          athletes_count || 0,
        title: "TOTAL SWIMMERS",
        para: "Total athletes participating nationwide, reflecting growing popularity, talent development, and increased engagement in finswimming.",
      }

    ];
  }

  return (
    <section className="homeRecordsSection">
      <div className="homeRecordsContainer">
        {records.map((item, index) => (
          <div className="homeRecordItem" key={index}>
            {/* ✅ FIXED HERE */}
            <CountUp value={item.count} />

            <p className="homeRecordTitle">{item.title}</p>
            <p className="homeRecordPara">{item.para}</p>
          </div>
        ))}
      </div>
    </section>
  );
}