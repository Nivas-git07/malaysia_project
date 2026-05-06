import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function OneNewsCenter({data}) {
//   const news = newsData?.data?.[0];

//   if (isLoading) {
//     return (
//       <section className="mfsaSingleNewsWrap">
//         <div className="mfsaSingleNewsContainer">
//           <div className="mfsaSingleNewsCard">
//             <div className="mfsaSingleNewsSkeleton" />
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (!data) return null;
console.log("the particular news is",data)

  const hasVideo = data?.video;
  const hasImage = data?.image;

  return (
    <section className="mfsaSingleNewsWrap">
      <div className="mfsaSingleNewsContainer">
        {/* TOP LABEL */}
        <div className="mfsaSingleNewsTop">
          <span className="mfsaSingleNewsBadge">MFSA NEWS</span>

          <h1 className="mfsaSingleNewsTitle">{data?.title}</h1>

          <p className="mfsaSingleNewsDesc">{data?.description}</p>
        </div>

        {/* MEDIA */}
        {(hasVideo || hasImage) && (
          <div className="mfsaSingleNewsMediaWrap">
            {hasVideo ? (
              <video
                className="mfsaSingleNewsMedia"
                src={data?.video}
                controls
                playsInline
                preload="metadata"
              />
            ) : (
              <img
                className="mfsaSingleNewsMedia"
                src={data?.image }
                alt={data?.title}
              />
            )}
          </div>
        )}

        {/* CONTENT */}
        <div className="mfsaSingleNewsContentCard">
          {(data?.content || "")
            .split("\n")
            .filter((line) => line.trim() !== "")
            .map((para, i) => (
              <p key={i} className="mfsaSingleNewsParagraph">
                {para}
              </p>
            ))}
        </div>
      </div>
    </section>
  );
}
