import React, { useState, useRef } from "react";
import Navbar from "../navbar/nav";
import "../../style/dashboard/Athlete.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { postgallery, get_recent_gallery } from "../../api/news_api";
// import Preview from "../../hook/preview/preview";
import { FiTrash2 } from "react-icons/fi";
import { deletegallery } from "../../api/news_api";
import SkeletonLoader from "../../components/common/SkeletonLoader";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";
export default function Gallery() {
  const [uploading, setUploading] = useState(false);
  const [fileType, setFileType] = useState("");
  const fileRef = useRef(null);

  const queryClient = useQueryClient();

  const deleteImage = async (id) => {
    console.log("Deleting image with ID:", id);
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await deletegallery(id);
        alert("Image deleted successfully");
        queryClient.invalidateQueries(["recentGallery"]);
      } catch (err) {
        console.log(err);
        alert("Failed to delete image");
      }
    }
  };
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["recentGallery"],
    queryFn: get_recent_gallery,
    refetchOnWindowFocus: false,
  });

  const galleryItems = data?.data ?? null;
  console.log("Gallery Items:", galleryItems);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="mu-membership-wrapper">
          <SkeletonLoader variant="card" count={6} />
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Navbar />
        <div className="mu-membership-wrapper">
          <ErrorState
            title="Unable to load gallery"
            message="Please check your connection and try again."
            onRetry={() => refetch()}
          />
        </div>
      </>
    );
  }

  // 🔥 HANDLE FILE CLICK
  const handleClick = () => {
    fileRef.current.click();
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    const isVideo = file.type.startsWith("video");

    setUploading(true);
    setFileType(isVideo ? "video" : "image");

    try {
      if (isVideo) {
        formData.append("video", file);
      } else {
        formData.append("image", file);
      }

      await postgallery(formData);

      alert(`${isVideo ? "Video" : "Image"} uploaded successfully`);

      queryClient.invalidateQueries(["recentGallery"]);

      setUploading(false);
      setFileType("");
      fileRef.current.value = ""; // reset input
    } catch (err) {
      console.log(err);
      alert("Upload failed");

      setUploading(false);
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
              accept="image/*,video/*"
              hidden
            />

            <div className="gallery-upload-box" onClick={handleClick}>
              <div className="gallery-upload-content">
                <div className="upload-icon">☁️</div>

                <h3>Drag and drop images here</h3>

                <p>PNG, JPG or WEBP up to 10MB</p>

                {uploading && (
                  <p className="upload-status">
                    {fileType === "video"
                      ? "Uploading video..."
                      : "Uploading image..."}
                  </p>
                )}

                <button
                  className="upload-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick();
                  }}
                >
                  + Upload Image or Video
                </button>
              </div>
            </div>
          </div>

          <div className="gallery-wrapper">
            <div className="gallery-header">
              <h2>Uploaded Images</h2>
            </div>

            {galleryItems && galleryItems.length > 0 ? (
              <div className="gallery-grid">
                {galleryItems.map((item, i) => {
                  const isVideo = item.video;

                  return (
                    <div className="gallery-card" key={item.id || i}>
                      {isVideo ? (
                        <video
                          src={item.video}
                          className="gallery-img"
                          controls
                        />
                      ) : (
                        <img
                          src={item.image}
                          alt="gallery"
                          className="gallery-img"
                        />
                      )}

                      <div className="gallery-overlay">
                        <button
                          className="gallery-delete-btn"
                          onClick={() => deleteImage(item.media_id)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="gallery-empty-wrapper">
                <EmptyState
                  title="No media available"
                  message="Upload an image or video to see it here."
                  actionLabel="Retry"
                  onAction={() => refetch()}
                />
              </div>
            )}
          </div>
        </div>

        {/* <Preview /> */}
      </div>
    </>
  );
}
