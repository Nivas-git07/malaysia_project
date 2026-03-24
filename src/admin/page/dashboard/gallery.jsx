import React from "react";
import Navbar from "../navbar/nav";
import "../../style/dashboard/Athlete.css";
import { getAthletes } from "../../api/athlete_api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import new1 from "../../assets/news1.png";
import new2 from "../../assets/new2.png";
import new3 from "../../assets/new3.png";
// import new1 from "../../assets/news1.png";

export default function Gallery() {
  const items = [
    { title: "National Finals 2023", tag: "Competition", img: new1 },
    { title: "Gear Inspection", tag: "Equipment" ,img: new2 },
    { title: "Elena Petrova Profile", tag: "Athletes",img: new3  },
    { title: "Opening Ceremony", tag: "Events",img: new1  },
  ];
  return (
    <>
      <Navbar />
      <div className="mu-membership-wrapper">
        <div className="dataTitle">Gallery</div>
        <div className="mfsaAdminGalleryX">
          {/* ===== UPLOAD ===== */}
          <div className="mfsaAdminUploadX">
            <div className="mfsaUploadBoxX">
              <div className="mfsaUploadInnerX">
                <div className="mfsaUploadIconX">📤</div>

                <p className="mfsaUploadTitleX">
                  Drag & drop images or click to upload
                </p>

                <span className="mfsaUploadSubX">
                  Support: JPG, PNG, WEBP (Max 5MB)
                </span>
              </div>
            </div>

            <button className="mfsaUploadBtnX">Upload Image</button>
          </div>

          {/* ===== RECENT HEADER ===== */}
          <div className="mfsaRecentHeaderX">
            <h3>Recent Uploads</h3>

            <div className="mfsaFilterX">
              <button>Filter</button>
              <button>Sort by Date</button>
            </div>
          </div>

          {/* ===== GRID ===== */}
          <div className="mfsaGalleryGridX">
            {items.map((item, i) => (
              <div className="mfsaGalleryCardX" key={i}>
                <img className="mfsaGalleryImgX" src={item.img} />

                <div className="mfsaGalleryContentX">
                  <span className="mfsaTagX">{item.tag}</span>
                  <h4>{item.title}</h4>
                  <p>Uploaded: Oct 12, 2023</p>
                </div>
              </div>
            ))}
          </div>

          {/* ===== LOAD MORE ===== */}
          <div className="mfsaLoadMoreWrapX">
            <button className="mfsaLoadMoreBtnX">Load More Assets →</button>
          </div>
        </div>
      </div>
    </>
  );
}
