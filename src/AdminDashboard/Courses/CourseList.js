import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CourseList.module.css';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [coursesPerPage] = useState(10);

    useEffect(() => {
        axios.get('http://13.200.156.92:8000/courses')
            .then(response => {
                setCourses(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
                setError('Error fetching courses. Please try again later.');
                setLoading(false);
            });
    }, []);

    // Calculate the currently displayed courses
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className={styles.courseListContainer}>
            <h4>Course List</h4>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table className={styles.courseTable}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Instructor Name</th>
                        <th>Price</th>
                        <th>MRP</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCourses && currentCourses.length > 0 ? (
                        currentCourses.map(course => (
                            <tr key={course._id}>
                                <td>{course.title}</td>
                                <td>{course.category}</td>
                                <td>{course.instructorName}</td>
                                <td>{course.price}</td>
                                <td>{course.mrp}</td>
                                <td>{new Date(course.created_at).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No courses available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className={styles.pagination}>
                {Array.from({ length: Math.ceil(courses.length / coursesPerPage) }, (_, index) => (
                    <button key={index + 1} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? styles.active : ''}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CourseList;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import HTMLRenderer from './HTMLRenderer';
// import styles from './CourseList.module.css';

// const CourseList = () => {
//     const [courses, setCourses] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         axios.get('http://13.200.156.92:8000/courses')
//             .then(response => {
//                 setCourses(response.data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching courses:', error);
//                 setError('Error fetching courses. Please try again later.');
//                 setLoading(false);
//             });
//     }, []);

//     return (
//         <div className={styles.courseListContainer}>
//             <h4>Course List</h4>
//             {loading && <p>Loading...</p>}
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <table className={styles.courseTable}>
//                 <thead>
//                     <tr>
//                         <th>Title</th>
//                         {/* <th>Short Description</th>
//                         <th>Long Description</th> */}
//                         <th>Category</th>
//                         <th>Instructor Name</th>
//                         <th>Price</th>
//                         <th>MRP</th>
//                         {/* <th>SEO Code</th> */}
//                         {/* <th>Review</th>
//                         <th>Is Active</th>
//                         <th>Rating</th> */}
//                         {/* <th>Hindi Cover Image</th>
//                         <th>English Cover Image</th> */}
//                         <th>Timestamp</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {courses && courses.length > 0 ? (
//                         courses.map(course => (
//                             <tr key={course._id}>
//                                 <td>{course.title}</td>
//                                 {/* <td>{course.shortDescription}</td> */}
//                                 {/* <td>
//                                     <HTMLRenderer htmlContent={course.longDescription} />
//                                 </td> */}
//                                 <td>{course.category}</td>
//                                 <td>{course.instructorName}</td>
//                                 <td>{course.price}</td>
//                                 <td>{course.mrp}</td>
//                                 {/* <td>{course.SEOCode}</td> */}
//                                 {/* <td>{course.review}</td>
//                                 <td>{course.isActive ? 'Yes' : 'No'}</td>
//                                 <td>{course.rating}</td> */}
//                                 {/* <td>{course.hindiCoverImage}</td> */}
//                                 {/* <td>{course.englishCoverImage}</td> */}
//                                 <td>{new Date(course.created_at).toLocaleString()}</td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="12">No courses available</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default CourseList;