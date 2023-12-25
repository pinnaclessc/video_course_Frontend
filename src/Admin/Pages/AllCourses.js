import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import styles from './AllCourses.module.css'

export default function AllCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/courses")
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
      let result= await fetch(` http://localhost:8000/course/${id}`,
      {method:"Delete"});
      window.location.reload();
      result=await result.json();

    }
  
  }

  const searchHandler=async(event)=>{
    let key= event.target.value;
    if(key){
      let result= await fetch(`http://localhost:8000/search/${key}`);
      result=await result.json();
      if(result){
        setCourses(result);
      }
    }
    // else{
    // window.location.reload();
    // }
}


  return(
  <div className={styles['AllCourses-FullDiv']}>
    <div className={styles['title-searchBar-div']}>
    <div><h3>All Course List</h3></div>
    <div><input className="searchInputBox" placeholder="Search Products" onChange={searchHandler}></input></div>
    </div>
    <div className={styles["AllCourses-heading"]}>
        <div className={styles["AllCourses-srno"]}>Sr.No.</div>
        <div className={styles["AllCourses-nameOfCourse"]}>Name Of Course</div>
        <div className={styles["AllCourses-teacherName"]}>Teacher Name</div>
        <div className={styles["AllCourses-heading-rating"]}>Rating</div>
        <div className={styles["AllCourses-heading-price"]}>Price</div>
        <div className={styles["AllCourses-heading-mrp"]}>MRP</div>

    </div>
       {courses.length>0?courses.map((item, index) =>(
          <div key={item._id} className={styles["AllCourses-subheading"]}>
            <div className={styles["AllCourses-srno"]}>{index+1}</div>
            <div className={styles["AllCourses-nameOfCourse"]}>{item.courseTitle} </div>
            <div className={styles["AllCourses-teacherName"]}>{item.teacherName} </div>
            <div className={styles["AllCourses-heading-rating"]}>{item.rating}</div>
            <div className={styles["AllCourses-heading-price"]}>{item.price}</div>
            <div className={styles["AllCourses-heading-mrp"]}>{item.mrp}</div>
            <div><button onClick={()=>deleteHandler(item._id)} className="deleteBtn">Delete</button><Link to={"/admin/updateCourse/"+item._id} className="editLink">Edit</Link></div>
            </div>
        )):<h1>No Result Found</h1>
      }
  
    </div>
  );
}
