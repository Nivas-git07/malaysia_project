import React,{useState,useEffect} from "react";
import "../../style/dashboard/NewsModal.css";
import { postnews } from "../../api/news_api";
export default function NewsModal({close,data}){
 
  const [form,setForm] = useState({
    title:"",
    description:"",
    content:"",
    image:null,
    visibility:"PUBLIC",
    status:"DRAFT"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }
  const handleFileChange = (e) => {
    setForm({
      ...form,
      image: e.target.files[0]
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
      console.log(form);
      postnews(form.title, form.description, form.content, form.image, form.visibility, form.status)
      
        .then((res)=>{
          alert("News posted successfully!");
          close();
        })
        .catch((err)=>{
          console.error(err);
          alert("Failed to post news. Please try again.");
        });
    }catch(err){
      console.error(err);
      alert("An error occurred. Please try again.");
    }
   
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
        <input value={form.title} placeholder="Enter news title" onChange={handleChange} name="title"/>

        <label>Show description</label>
        <textarea value={form.description} placeholder="Enter a short summary for preview..." onChange={handleChange} name="description"/>

        <label>Full Content</label>
        <textarea value={form.content} placeholder="Filter by State" onChange={handleChange} name="content"/>

        <label>Upload Image</label>
        <input type="file" onChange={handleFileChange}/>

        <label>Visibility level</label>
        <select value={form.visibility} onChange={handleChange} name="visibility">
          <option value="PUBLIC">Public</option>
          <option value="STATE">state</option>
          <option value="CLUB">Club</option>
        </select>

        <label>Status</label>
        <select value={form.status} onChange={handleChange} name="status">
          <option value="DRAFT">Save as Draft</option>
          <option value="PUBLISHED">Publish</option>
        </select>

        <div className="modalActions">
          <button className="cancelBtn" onClick={close}>Cancel</button>
          <button className="savesBtn" onClick={handleSubmit}>Save news</button>
        </div>

      </div>
    </div>
  )
}