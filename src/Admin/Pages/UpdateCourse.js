import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import styles from '../Admin.module.css'
export default function UpdateProduct() {
    const [courseTitle,setCourseTitle]=useState("");
    const [courseDetails,setCourseDetails]=useState("");
    const [ teacherName,setTeacherName]=useState("");
    const [ rating,setRating]=useState("");
    const [ price,setPrice]=useState("");
    const [ mrp,setMrp]=useState("");
    const navigate=useNavigate();
    const params =useParams();
    useEffect(()=>{
        getCourseDetails();
    },[])

    const getCourseDetails=async()=>{
        let result= await fetch(`http://localhost:8000/course/${params.id}`);
        result=await result.json();
        console.log(result);
        setCourseTitle(result.courseTitle);
        setCourseDetails(result.courseDetails);
        setTeacherName(result.teacherName);
        setRating(result.rating);
        setPrice(result.price);
        setMrp(result.mrp);

}
  const updateProdutHandler= async()=>{
    console.log();
    let result= await fetch(`http://localhost:8000/course/${params.id}`,{
      method:"Put",
      body:JSON.stringify({courseTitle,courseDetails,teacherName,rating,price,mrp}),
      headers:{"Content-Type":"application/json"}
    });
    result=result.json();
    navigate('/');
  }


  return (<>

    {/* ******Copy of Add Course ******* */}


    <div className={styles["AddCourse-fullPage"]}>
      <div className={styles["AddCourse-Heading"]}><h4>Update Course</h4></div>
      <div>Name Of Course</div>
      <input type="text" placeholder="Enter Course Title" className={styles['AddCourse-inputbox']} value={courseTitle} onChange={(e)=>(setCourseTitle(e.target.value))}></input>
      <div>Course Details</div>
      <input type="text" placeholder="Enter Course Details" className={styles['AddCourse-inputbox']} value={courseDetails} onChange={(e)=>(setCourseDetails(e.target.value))}></input>
      <div>Teacher's Name</div>
      <input type="text" placeholder="Teacher's Name" className={styles['AddCourse-inputbox']} value={teacherName} onChange={(e)=>(setTeacherName(e.target.value))}></input>
      <div>Course Rating</div>
      <input type="text" placeholder="Rating" className={styles['AddCourse-inputbox']} value={rating} onChange={(e)=>(setRating(e.target.value))}></input>
      <div>Price</div>
      <input type="text" placeholder="price" className={styles['AddCourse-inputbox']} value={price} onChange={(e)=>(setPrice(e.target.value))}></input>
      <div>MRP </div>
      <input type="text" placeholder="MRP" className={styles['AddCourse-inputbox']} value={mrp} onChange={(e)=>(setMrp(e.target.value))}></input>
      <button type="submit" className={styles['AddCourse-addCourseBtn']} onClick={updateProdutHandler}>Update Course</button>

    </div>
    
    </>
  );
}

