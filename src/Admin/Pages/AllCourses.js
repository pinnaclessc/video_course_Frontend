import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './AllCourses.module.css';

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state to true

  useEffect(() => {
    fetch("https://videocoursebackend.ssccglpinnacle.com/courses")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          console.error("Data is not an array:", data);
          setCourses([]);
        }
      })
      .catch((error) => console.error("Error fetching courses:", error))
      .finally(() => setLoading(false)); // Set loading to false after fetch completes
  }, []);

  const deleteHandler = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this course?");
    if (confirm) {
      try {
        let response = await fetch(`https://videocoursebackend.ssccglpinnacle.com/course/${id}`, { method: "DELETE" });
        if (response.ok) {
          setCourses(courses.filter(course => course._id !== id)); // Optimistically remove the course from UI
        } else {
        alert("Failed to delete the course.");
        }
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  const searchHandler = async (event) => {
    let key = event.target.value;
    if (!key) {
      setLoading(true);
      // Reload the courses if the search key is cleared
      fetch("https://videocoursebackend.ssccglpinnacle.com/courses")
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setCourses(data);
          } else {
            setCourses([]);
          }
        })
        .catch((error) => console.error("Error fetching courses:", error))
        .finally(() => setLoading(false));
    } else {
      let result = await fetch(`http://localhost:8000/vc/course-search/${key}`);
      result = await result.json();
      if (Array.isArray(result)) {
        setCourses(result);
      } else {
        console.error("Search result is not an array:", result);
      }
    }
  };

  if (loading) {
    return <div className={styles['AllCourses-FullDiv']}><img src="/loading.gif" alt="Loading..." /></div>;
  }

  return (
    <div className={styles['AllCourses-FullDiv']}>
      <div className={styles["AllCourses-searchbar-div"]}>
        <input type='text' placeholder='Search for Courses' className={styles["AllCourses-searchbar"]} onChange={searchHandler}/>
      </div>

      <table>
        <thead>
          <tr>
            <th>Sr.No.</th>
            <th>Name Of Course</th>
            <th>Teacher Name</th>
            <th>Rating</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? courses.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.instructorName}</td>
              <td>{item.rating}</td>
              <td>{item.price}</td>
              <td>
                <button onClick={() => deleteHandler(item._id)} className={styles["AllCourses-DeleteBTN"]}>Delete</button>
                <Link to={`/admin/updateCourse/${item._id}`} className={styles["AllCourses-editLink"]}>Edit</Link>
              </td>
            </tr>
          )) : <tr><td colSpan="6" style={{ textAlign: 'center' }}>No data found</td></tr>}
        </tbody>
      </table>
    </div>
  );
}