import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './StudentList.module.css';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(10);

    useEffect(() => {
        axios.get('http://localhost:8000/vc/allStudents')
            .then(response => {
                setStudents(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
                setError('Error fetching students. Please try again later.');
                setLoading(false);
            });
    }, []);

    const deleteHandler = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this student?");
        if (confirm) {
            try{
                let response = await axios.delete(`http://localhost:8000/vc/student/${id}`);
                if (response.status === 200) {
                    setStudents(students.filter(student => student._id !== id));
                } else {
                    alert("Failed to delete the student.");
                }
            } catch (error) {
                console.error("Error deleting student:", error);
            }
        }
    };

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className={styles.studentListContainer}>
            <h2>Student List</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table className={styles.studentTable}>
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentStudents && currentStudents.length > 0 ? (
                        currentStudents.map((student, index) => (
                            <tr key={student._id}>
                                <td>{indexOfFirstStudent + index + 1}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>
                                <button onClick={() =>deleteHandler(student._id)} className={styles.DeleteBTN}>Delete</button>
                                <Link to={`/stUL/${student._id}`} className={styles.editLink}>Edit</Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No students available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className={styles.pagination}>
                {Array.from({ length: Math.ceil(students.length / studentsPerPage) }, (_, index) => (
                    <button key={index + 1} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? styles.active : ''}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StudentList;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './StudentList.module.css';

// const StudentList = () => {
//     const [students, setStudents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         axios.get('http://localhost:8000/vc/allStudents')
//             .then(response => {
//                 setStudents(response.data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching students:', error);
//                 setError('Error fetching students. Please try again later.');
//                 setLoading(false);
//             });
//     }, []);

//     const fetchPurchasedCourses = async (purchasedCourses) => {
//         try {
//             const courses = await Promise.all(
//                 purchasedCourses.map(async courseId => {
//                     const response = await axios.get(`https://videocoursebackend.ssccglpinnacle.com/course/${courseId}`);
//                     return response.data;
//                 })
//             );
//             return courses;
//         } catch (error) {
//             console.error('Error fetching purchased courses:', error);
//             return [];
//         }
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             const updatedStudents = await Promise.all(
//                 students.map(async (student, index) => {
//                     const purchasedCourses = await fetchPurchasedCourses(student.purchasedCourses);
//                     return { ...student, purchasedCourses, srNo: index + 1 };
//                 })
//             );
//             setStudents(updatedStudents);
//         };
//         if (!loading) {
//             fetchData();
//         }
//     }, [students, loading]);

//     return (
//         <div className={styles.studentListContainer}>
//             <h2>Student List</h2>
//             {loading && <p>Loading...</p>}
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <table className={styles.studentTable}>
//                 <thead>
//                     <tr>
//                         <th>Sr. No.</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Purchased Courses</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {students.map(student => (
//                         <tr key={student._id}>
//                             <td>{student.srNo}</td>
//                             <td>{student.name}</td>
//                             <td>{student.email}</td>
//                             <td>
//                                 {loading ? 'Loading...' : (
//                                     <ul>
//                                         {student.purchasedCourses.map((course, index) => (
//                                             <li key={course._id}>
//                                                 <span>{index + 1}. </span>
//                                                 {course.title}
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 )}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default StudentList;