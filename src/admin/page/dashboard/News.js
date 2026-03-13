import React, { useState } from "react";
import Navbar from "../navbar/nav";
import "../../style/dashboard/News.css";
import NewsModal from "./NewsModal";
import { getnews } from "../../api/news_api";
import { useQuery } from "@tanstack/react-query";
import DateOnly from "../../hook/time/time";
// const newsData = [
//   {
//     id: 1,
//     title: "National Event Highlights",
//     date: "2025-08-01",
//     status: "Published",
//     visibility: "All Users",
//   },
//   {
//     id: 2,
//     title: "State Meet Schedule",
//     date: "2025-08-01",
//     status: "Draft",
//     visibility: "Admins Only",
//   }
// ];

export default function News() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["news"],
    queryFn: getnews,
    refetchOnWindowFocus: false,
    retry: false,
  });
  console.log(data, isLoading, error);
  console.log(data?.data.all_news);
  const newsData = data?.data.all_news || [];

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  /* ADD NEW */
  const handleAdd = () => {
    setEditData(null);
    setOpen(true);
  };

  /* EDIT */
  const handleEdit = (item) => {
    setEditData(item);
    setOpen(true);
  };

  return (
    <>
      <Navbar />
      <div className="mu-membership-wrapper">


      <div className="newsTitle">NEWS</div>

      <div className="newsCard">

        <div className="newsTop">
          <h2>News & Annocements</h2>
          <button className="addNewsBtn" onClick={handleAdd}>
            + Add News
          </button>
        </div>

        <div className="newsHead">
          <div>Title</div>
          <div>Date</div>
          <div>Status</div>
          <div>Visibility</div>
          <div>Action</div>
        </div>

        {newsData.map((item) => (
          <div className="newsRow" key={item.id}>
            <div>{item.title}</div>
            <div><DateOnly value={item.created_at} /></div>
            <div>{item.status}</div>
            <div>{item.visibility}</div>
            <div
              className="editBtn"
              onClick={() => handleEdit(item)}
            >
              ✎ Edit
            </div>
          </div>
        ))}

      </div>

      
      {open && (
        <NewsModal
          close={() => setOpen(false)}
          data={editData}
        />
      )}
      
      </div>
    </>
  )
}