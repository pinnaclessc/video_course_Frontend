// <<<<<<< HEAD
// import React from 'react'
// import VideoUploadForm from './VideoUploadForm'
// import PdfUploadForm from './PdfUploadForm'
// import AddChapter from './AddChapter'
// import AddTopicForm from './AddTopicForm'
// import styles from "./CourseContent.module.css"

// export default function AddCourseContent() {
//   return (
//     <div className={styles["course-content-wraper"]}>
//       <div><h3>Add Course Content </h3></div>
//       <div><VideoUploadForm/></div>
//       <div><PdfUploadForm/></div>
//       <div><AddChapter/></div>
//       <div><AddTopicForm/></div>

<<<<<<< HEAD
import React from 'react';
import VideoUploadForm from './VideoUploadForm';
import PdfUploadForm from './PdfUploadForm';
import AddChapter from './AddChapter';
import AddTopicForm from './AddTopicForm';
import styles from './AddCourseContent.module.css';

export default function AddCourseContent() {
  return (
    <div className={styles['AddCourseContent-container']}>
      <div className={styles['AddCourseContent-section']}>
        <div className={styles['AddCourseContent-section-header']}>Video Upload</div>
        <div className={styles['VideoUploadForm-container']}>
          <VideoUploadForm />
        </div>

        <div className={styles['AddCourseContent-section-header']}>PDF Upload</div>
        <div className={styles['PdfUploadForm-container']}>
          <PdfUploadForm />
        </div>
      </div>

      <div className={styles['AddCourseContent-section']}>
        <div className={styles['AddCourseContent-section-header']}>Add Chapter</div>
        <div className={styles['AddChapter-container']}>
          <AddChapter />
        </div>
      </div>

      <div className={styles['AddCourseContent-section']}>
        <div className={styles['AddCourseContent-section-header']}>Add Topic</div>
        <div className={styles['AddTopicForm-container']}>
          <AddTopicForm />
        </div>
      </div>

=======
//   useEffect(() => {
//     fetch("http://localhost:8000/courses")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Fetched data:", data);
//         if (Array.isArray(data)) {
//           // Check if data is an array
//           setCourses(data);
//         } else {
//           console.error("Data is not an array:", data);
//           setCourses([]); // Set an empty array in case of non-array data
//         }
//       })
//       .catch((error) => console.error("Error fetching products:", error));
//   }, []);

//   const searchHandler=async(event)=>{
//     let key= event.target.value;
//     if(key){
//       let result= await fetch(`http://localhost:8000/search/${key}`);
//       result=await result.json();
//       if(result){
//         setCourses(result);
//       }
//     }
//     // else{
//     // window.location.reload();
//     // }
// }


//   return(
//   <div className={styles['AllCourses-FullDiv']}>
//     <div className={styles["AllCourses-heading"]}>
//         <div className={styles["AllCourses-srno"]}>Sr.No.</div>
//         <div className={styles["AllCourses-heading-price"]}>Price</div>
//         <div className={styles["AllCourses-nameOfCourse"]}>Name Of Course</div>

//     </div>
//        {courses.length>0?courses.map((item, index) =>(
//           <div key={item._id} className={styles["AllCourses-subheading"]}>
//             <div className={styles["AllCourses-srno"]}>{index+1}</div>
//             <div className={styles["AllCourses-heading-price"]}>{item.price}</div>
//             <div className={styles["AllCourses-nameOfCourse"]}>{item.courseTitle} </div>
//             <div><Link to={"/admin/courseContent/"+item._id}  className={styles["AllCourses-editLink"]}>Add Course Content</Link></div>
//             </div>
//         )):<p>Loading .....</p>
//       }
  
//     </div>
//   );
// }

import React from 'react'
import VideoUploadForm from './VideoUploadForm'
import PdfUploadForm from './PdfUploadForm'
import AddChapter from './AddChapter'
import AddTopicForm from './AddTopicForm'

export default function AddCourseContent() {
  return (
    <div>
      <div><VideoUploadForm/></div>
      <div><PdfUploadForm/></div>
      <div><AddChapter/></div>
      <div><AddTopicForm/></div>
      
>>>>>>> bc38ad3a6b7ddde425984e296eed7064852f45f8
    </div>
  );
}

