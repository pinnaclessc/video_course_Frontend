import React, { useState, useEffect } from 'react';
import styles from './AllStudent.module.css';
import { Link } from 'react-router-dom';

export default function AllStudent() {
  const [students, setStudents] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:8000/vc/allStudents")
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setStudents(data);
        } else {
          console.error("Data is not an array:", data);
          setStudents([]);
        }
      })
      .catch(error => console.error("Error fetching students:", error));
  }, []);

  const deleteHandler = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      try {
        await fetch(`http://localhost:8000/vc/student/${id}`, { method: "DELETE" });
        setStudents(students.filter(student => student._id !== id)); // Optimistically remove the student from UI
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <table>
        <thead>
          <tr>
            <th>Sr.No.</th>
            <th>Name of Student</th>
            <th>Email of Student</th>
            <th>Purchased Courses</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? students.map((student, index) => (
            <tr key={student._id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.purchasedCourses.length}</td>
              <td>
                <button onClick={() => deleteHandler(student._id)} className={styles.deleteBtn}>Delete</button>
                <Link to={`/stUL/${student._id}}`} className={styles.editLink}>Edit</Link>
              </td>
            </tr>
          )) : <tr><td colSpan="5">No Data Found</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
