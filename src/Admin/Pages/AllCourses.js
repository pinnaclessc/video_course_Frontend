import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import styles from './AllCourses.module.css'

export default function AllCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://13.200.156.92:8000/api/courses")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        if (Array.isArray(data)) {
          // Check if data is an array
          setCourses(data);
        } else {
          console.error("Data is not an array:", data);
          setCourses([]); // Set an empty array in case of non-array data
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  
  const deleteHandler= async(id)=>{
    const confirm=window.confirm("Delete");
    if(confirm){
      let result= await fetch(` http://13.200.156.92:8000/course/${id}`,
      {method:"Delete"});
      window.location.reload();
      result=await result.json();

    }
  
  }

  const searchHandler = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://13.200.156.92:8000/search/${key}`);
      result = await result.json();
      if (result) {
        setCourses(result);
      }
    } 
    // else {
    //   window.location.reload();
    // }
  };


  return(
  <div className={styles['AllCourses-FullDiv']}>
            <div className={styles["AllCourses-searchbar-div"]}>
          <input type='text' placeholder='Search for Courses'className={styles["AllCourses-searchbar"]} onChange={searchHandler}/>
        </div>
    <div className={styles["AllCourses-heading"]}>
        <div className={styles["AllCourses-srno"]}>Sr.No.</div>
        <div className={styles["AllCourses-nameOfCourse"]}>Name Of Course</div>

    </div>
       {courses.length>0?courses.map((item, index) =>(
          <div key={item._id} className={styles["AllCourses-subheading"]}>
            <div className={styles["AllCourses-srno"]}>{index+1}</div>
            <div className={styles["AllCourses-nameOfCourse"]}>{item.courseTitle} </div>
            <div><button onClick={()=>deleteHandler(item._id)} className={styles["AllCourses-DeleteBTN"]}>Delete</button>
            <Link to={"/admin/updateCourse/"+item._id}  className={styles["AllCourses-editLink"]}>Edit</Link></div>
            <Link to={"/admin/updateChapter/"+item._id}  className={styles["AllCourses-edit-course-content-Link"]}>Edit Course Content</Link>
            <Link to={`/admin/all-PDFs/`+item._id}  className={styles["AllCourses-edit-course-content-Link"]}>All PDFs</Link>
            <Link to={`/admin/all-videos/`+item._id}  className={styles["AllCourses-edit-course-content-Link"]}>All Videos</Link>
            </div>
        )):<p>No data Found</p>
      }
  
    </div>
  );
}