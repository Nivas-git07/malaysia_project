import React, { useState, useRef } from "react";
import Navbar from "../navbar/nav";
import "../../style/dashboard/Athlete.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { postgallery, get_recent_gallery } from "../../api/news_api";
import Preview from "../../hook/preview/preview";
import { FiTrash2 } from "react-icons/fi";
export default function Gallery() {
  const [image, setimage] = useState(null);
  const fileRef = useRef(null);

  const queryClient = useQueryClient();

  // 🔥 FETCH GALLERY DATA
  const { data, isLoading, isError } = useQuery({
    queryKey: ["recentGallery"],
    queryFn: get_recent_gallery,
    refetchOnWindowFocus: false,
  });

  const galleryItems = data?.data ?? null;

  // 🔥 HANDLE FILE CLICK
  const handleClick = () => {
    fileRef.current.click();
  };

  // 🔥 HANDLE UPLOAD
  const handleChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        setimage(file);

        await postgallery(file);

        alert("Successfully uploaded image");

        // 🔥 REFRESH DATA
        queryClient.invalidateQueries(["recentGallery"]);
      } catch (err) {
        console.log(err);
        alert("Upload failed");
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="mu-membership-wrapper">
        <div className="gallery-header-wrapper">
          <h1 className="gallery-title">Gallery Management</h1>
          <p className="gallery-subtitle">
            Upload and manage images for your website
          </p>
        </div>

        <div className="mfsaAdminGalleryX">
      
          <div className="gallery-upload-wrapper">
          
            <input
              type="file"
              ref={fileRef}
              onChange={handleChange}
              accept="image/*"
              hidden
            />

            
            <div className="gallery-upload-box" onClick={handleClick}>
              <div className="gallery-upload-content">
                <div className="upload-icon">☁️</div>

                <h3>Drag and drop images here</h3>

                <p>PNG, JPG or WEBP up to 10MB</p>

                <button
                  className="upload-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent double click trigger
                    handleClick();
                  }}
                >
                  + Upload Image
                </button>
              </div>
            </div>
          </div>

          {/* ===== STATES ===== */}
          {isLoading && (
            <div className="mfsaEmptyState">Loading gallery...</div>
          )}

          {isError && (
            <div className="mfsaEmptyState">Failed to load gallery</div>
          )}

          <div className="gallery-wrapper">
            <div className="gallery-header">
              <h2>Uploaded Images</h2>
            </div>

            <div className="gallery-grid">
              {galleryItems && galleryItems.length > 0
                ? galleryItems.map((item, i) => (
                    <div className="gallery-card" key={item.id || i}>
                      {/* IMAGE */}
                      <img
                        src={item.image}
                        alt="gallery"
                        className="gallery-img"
                      />

                   
                      <div className="gallery-overlay">
                        <button className="gallery-delete-btn">  <FiTrash2 /></button>
                      </div>
                    </div>
                  ))
                : !isLoading && (
                    <div className="gallery-empty">No images available</div>
                  )}
            </div>
          </div>
        </div>

        <Preview />
      </div>
    </>
  );
}
