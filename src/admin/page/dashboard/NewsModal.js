import React,{useState,useEffect} from "react";
import "../../style/dashboard/NewsModal.css";

export default function NewsModal({close,data}){

  const [form,setForm] = useState({
    title:"",
    description:"",
    content:"",
    visibility:"Public",
    status:"Save as Draft"
  });

  /* AUTO FILL WHEN EDIT */
  useEffect(()=>{
    if(data){
      setForm({
        title:data.title || "",
        description:"",
        content:"",
        visibility:data.visibility || "Public",
        status:data.status || "Save as Draft"
      });
    }
  },[data]);

  return(
    <div className="modalOverlay">

      <div className="newsModal">

        <div className="modalHeader">
          <h3>CREATE / EDIT NEWS</h3>
          <span onClick={close}>✕</span>
        </div>

        <label>Title</label>
        <input value={form.title} placeholder="Enter news title"/>

        <label>Show description</label>
        <textarea placeholder="Enter a short summary for preview..."/>

        <label>Full Content</label>
        <textarea placeholder="Filter by State"/>

        <label>Upload Image</label>
        <input type="file"/>

        <label>Visibility level</label>
        <select>
          <option>Public</option>
        </select>

        <label>Status</label>
        <select>
          <option>Save as Draft</option>
        </select>

        <div className="modalActions">
          <button className="cancelBtn" onClick={close}>Cancel</button>
          <button className="saveBtn">Save news</button>
        </div>

      </div>
    </div>
  )
}