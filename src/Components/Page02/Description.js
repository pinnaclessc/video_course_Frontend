import React, { useState, useEffect } from "react";
import classes from "./description.module.css";
import { useParams } from "react-router-dom";

export default function Description() {
  const [courseDetails, setCourseDetails] = useState(null);

  const params = useParams();

  useEffect(() => {
    getCourseDetails();
  }, []); // Dependency array is empty, so this runs once on mount

  const getCourseDetails = async () => {
    let result = await fetch(`https://videocoursebackend.ssccglpinnacle.com/course/${params.id}`);
    result = await result.json();
    setCourseDetails(result.longDescription);
  };

  return (
    <div className={classes["description-fullpage"]}>
      <div className={classes["description-heading"]}>Description</div>
      {/* Use dangerouslySetInnerHTML to parse and render HTML */}
      {courseDetails ? (
        <div className={classes["description-content"]} dangerouslySetInnerHTML={{ __html: courseDetails }}></div>
      ) : (
        <div className={classes["description-content"]}>Loading...</div>
      )}
    </div>
  );
}



// import React, { useState, useEffect } from "react";
// import classes from "./Details.module.css";
// import { useParams } from "react-router-dom";
// export default function Details() {
//   const [courseDetails, setCourseDetails] = useState();

//   const params = useParams();
//   useEffect(() => {
//     getCourseDetails();
//   }, []);
//     const getCourseDetails = async () => {
//     let result = await fetch(`https://videocoursebackend.ssccglpinnacle.com/course/${params.id}`);
//     result = await result.json();
//     setCourseDetails(result.longDescription);
//   };
//   return (
//     <div className={classes["description-fullpage"]}>
//         <div className={classes["description-headind"]}>Description</div>
//         <div className={classes["description-content"]}> {courseDetails}</div>
//         {/* <div className={classes["description-content"]}> dangerouslySetInnerHTML={{ __html: courseDetails }} </div> */}

//         </div>
//   );
// }


// import React from 'react'
// import classes from './description.module.css'

// export default function Description() {
//   return (
    // <div className={classes["description-fullpage"]}>
    //     <div className={classes["description-headind"]}>Description</div>
    //     <div className={classes["description-content"]}>Welcome to 90 days day wise course about SSC Maths 6800 TCS MCQ book.. This video course will help </div>
    //     <div className={classes["description-content"]}>Welcome to 90 days day wise course about SSC Maths 6800 TCS MCQ book.. This video course will help </div>
    //     <div className={classes["description-content"]}>Welcome to 90 days day wise course about SSC Maths 6800 TCS MCQ book.. This video course will help </div>

      
    // </div>
//   )
// }
