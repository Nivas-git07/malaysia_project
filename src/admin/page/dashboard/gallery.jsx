import React, { useState, useRef } from "react";
import Navbar from "../navbar/nav";
import "../../style/dashboard/Athlete.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { postgallery, get_recent_gallery } from "../../api/news_api";
import Preview from "../../hook/preview/preview";

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
        <div className="dataTitle">Gallery</div>

        <div className="mfsaAdminGalleryX">
          {/* ===== FILE INPUT ===== */}
          <input
            type="file"
            ref={fileRef}
            onChange={handleChange}
            className="mfsaHiddenInputX"
            accept="image/*"
            hidden
          />

          {/* ===== UPLOAD BOX ===== */}
          <div className="mfsaAdminUploadX">
            <div className="mfsaUploadBoxX" onClick={handleClick}>
              <div className="mfsaUploadInnerX">
                <div className="mfsaUploadIconX">📤</div>

                <p className="mfsaUploadTitleX">Click to upload images</p>

                <span className="mfsaUploadSubX">JPG, PNG, WEBP (Max 5MB)</span>
              </div>
            </div>

            <button className="mfsaUploadBtnX" onClick={handleClick}>
              Upload Image
            </button>
          </div>

          {/* ===== STATES ===== */}
          {isLoading && (
            <div className="mfsaEmptyState">Loading gallery...</div>
          )}

          {isError && (
            <div className="mfsaEmptyState">Failed to load gallery</div>
          )}

          <div className="mfsaRecentHeaderX">
            
            <h3>Recent Uploads</h3>
            
          </div>
          <div className="mfsaGalleryGridX">
            {galleryItems && galleryItems.length > 0
              ? galleryItems.slice(0, 4).map((item, i) => (
                  <div className="mfsaGalleryCardX" key={item.id || i}>
                    <img
                      className="mfsaGalleryImgX"
                      src={item.image}
                      alt="gallery"
                    />
                  </div>
                ))
              : !isLoading && (
                  <div className="mfsaEmptyState">
                    No gallery images available
                  </div>
                )}
          </div>
        </div>

        <Preview />
      </div>
    </>
  );
}
