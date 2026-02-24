import React,{useState,useEffect} from "react";
import "../../style/dashboard/NewsModal.css";
import { postnews } from "../../api/news_api";
export default function NewsModal({close,data}){
 
  const [form,setForm] = useState({
    title:"",
    description:"",
    content:"",
    visibility:"Public",
    status:"Save as Draft"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }
  

 
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
        <textarea value={form.description} placeholder="Enter a short summary for preview..." onChange={handleChange} name="description"/>

        <label>Full Content</label>
        <textarea value={form.content} placeholder="Filter by State" onChange={handleChange} name="content"/>

        <label>Upload Image</label>
        <input type="file" />

        <label>Visibility level</label>
        <select value={form.visibility} onChange={handleChange} name="visibility">
          <option>Public</option>
        </select>

        <label>Status</label>
        <select value={form.status} onChange={handleChange} name="status">
          <option>Save as Draft</option>
        </select>

        <div className="modalActions">
          <button className="cancelBtn" onClick={close}>Cancel</button>
          <button className="savesBtn" onClick={() => postnews(form.title, form.description, form.content, null, form.visibility, form.status)}>Save news</button>
        </div>

      </div>
    </div>
  )
}