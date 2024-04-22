// import React, { useState, useEffect, useRef } from "react";
// import classes from "./MainContent.module.css";
// import { FaPlay } from "react-icons/fa";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import Card from "../Card/Card";
// import Loading from "../ProgressBar/ProgressBar";
// import { Link } from "react-router-dom";
// import SideDots from "../Three Dots/SideDots";
// import axios from 'axios';
// import LoadingSkeleton from "../../../../UI/LoadingSkeleton";
// import { useParams } from 'react-router-dom';

// function MainContent() {
//   const { userId } = useParams();
//   const [courseDetails, setCourseDetails] = useState([]);
//   const [error, setError] = useState(null);
//   const [openIndex, setOpenIndex] = useState(-1);

//   const isLoading = courseDetails.length === 0 && !error;
//   const ref = useRef(null);

//   useEffect(() => {
//     const fetchPurchasedCourses = async () => {
//       try {
//         if (!userId) {
//           throw new Error('User ID not found in URL parameters.');
//         }
//         const response = await axios.get(`http://localhost:8000/vc/purchasedCourses/${userId}`);
//         console.log('Purchased Courses:', response.data.purchasedCourses);
//         fetchCourseDetails(response.data.purchasedCourses);
//       } catch (error) {
//         console.error('Error fetching purchased courses:', error);
//         setError('Error fetching purchased courses. Please try again.');
//       }
//     };

//     const fetchCourseDetails = async (courseIds) => {
//       const courseDetailsPromises = courseIds.map(courseId =>
//         axios.get(`http://localhost:8000/course/${courseId}`).catch(err => {
//           console.error(`Error fetching details for courseId: ${courseId}`, err);
//           return null;
//         })
//       );

//       try {
//         const courseDetailsResponses = await Promise.all(courseDetailsPromises);
//         const details = courseDetailsResponses.filter(response => response !== null).map(response => response.data);
//         setCourseDetails(details);
//       } catch (error) {
//         console.error('Error fetching course details:', error);
//         setError('Error fetching course details. Please try again.');
//       }
//     };

//     fetchPurchasedCourses();
//   }, [userId]);

//   const handleDotClick = (index) => {
//     setOpenIndex(prevIndex => (prevIndex === index ? -1 : index));
//   };

//   const handleClickOutside = (event) => {
//     if (ref.current && !ref.current.contains(event.target)) {
//       setOpenIndex(-1);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   // Render the loading skeletons if the courses are being loaded
//   const renderLoadingSkeletons = () => {
//     // Here, 5 is an arbitrary number of skeletons to show
//     // You can adjust this number as needed
//     return Array.from({ length: 5 }, (_, index) => (
//       <LoadingSkeleton key={index} />
//     ));
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className={classes.card_container}>  
//     {isLoading
//       ? renderLoadingSkeletons()
//       : courseDetails.length > 0 ? courseDetails.map((course, index) => (
//         <Card key={course._id} className={classes.card}>
//           <div className={classes.card_img_container}>
//             <div className={classes.card_img}>
//               {/* <img src={course.hindiCoverImage || course.englishCoverImage} alt={course.title} width="95" height="95" /> */}
//               <img src={course.hindiCoverImage} alt={course._id} width="95" height="95" />
//             <img src={course.englishCoverImage} alt={course._id} width="95" height="95" />
//               {/* <Link to={`/mylearning/${userId}/`}> */}
//               <Link to={`/myplayer/${course._id}`}>
//                 <div className={classes.play_icon}><FaPlay size={30} /></div>
//               </Link>
//             </div>
//           </div>
//           {/* <div className={classes.sidedots} ref={ref}>
//             <button onClick={() => handleDotClick(index)}>
//               <BsThreeDotsVertical className={classes.threedots} size={15} />
//             </button>
//             {openIndex === index && (
//               <SideDots isOpen={true} onClose={() => setOpenIndex(-1)} />
//             )}
//           </div> */}
//           <div className={classes.heading}>
//           <Link to={`/myplayer/${course._id}`} className={classes.title}>
//               {course.courseTitle}
//             </Link>
//             <div className={classes.instructor}>{course.instructorName}</div>
//           </div>
//           <Loading />
//         </Card>
//       ))}
//     </div>
//   );
// }

// export default MainContent;

import React, { useState, useEffect } from "react";
import classes from "./MainContent.module.css";
import { FaPlay } from "react-icons/fa";
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import Card from "../Card/Card";
import LoadingSkeleton from "../../../../UI/LoadingSkeleton";
import Loading from "../ProgressBar/ProgressBar";

function MainContent() {
  const { userId } = useParams();
  const [courseDetails, setCourseDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numOfSkeletons, setNumOfSkeletons] = useState(0); // State to track number of skeletons

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        if (!userId) {
          throw new Error('User ID not found in URL parameters.');
        }
        const response = await axios.get(`http://localhost:8000/vc/purchasedCourses/${userId}`);
////////////////////This is to get the length of courses purchased////////////////////////////
        const courseIds = response.data.purchasedCourses;
        if (courseIds && courseIds.length) {
          setNumOfSkeletons(courseIds.length); 
          fetchCourseDetails(courseIds);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching purchased courses:', error);
        setError('Error fetching purchased courses. Please try again.');
        setIsLoading(false);
      }
    };

    const fetchCourseDetails = async (courseIds) => {
      try {
        const courseDetailsPromises = courseIds.map(courseId =>
          axios.get(`http://localhost:8000/course/${courseId}`).catch(err => {
            console.error(`Error fetching details for courseId: ${courseId}`, err);
            return { data: null };
          })
        );
        const courseDetailsResponses = await Promise.all(courseDetailsPromises);
        const details = courseDetailsResponses.map(response => response.data).filter(course => course !== null);
        setCourseDetails(details);
      } catch (error) {
        console.error('Error fetching course details:', error);
        setError('Error fetching course details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPurchasedCourses();
  }, [userId]);

  const renderLoadingSkeletons = () => {
    return Array.from({ length: numOfSkeletons }, (_, index) => <LoadingSkeleton key={index} />);
  };

  return (
    <div className={classes.card_container}>
      {error && <div>Error: {error}</div>}
      {isLoading
        ? renderLoadingSkeletons()
        : courseDetails.length > 0
          ? courseDetails.map((course, index) => (
              <Card key={course._id} className={classes.card}>
                <div className={classes.card_img_container}>
                  <div className={classes.card_img}>
                  <img src={course.hindiCoverImage} alt={course._id} width="95" height="95" />
            <img src={course.englishCoverImage} alt={course._id} width="95" height="95" />
              <NavLink to={`/myplayer/${course._id}`}>
                <div className={classes.play_icon}><FaPlay className={classes.Faplay_icon}size={30} /></div>
              </NavLink>
            </div>
          </div>
          {/* <div className={classes.sidedots} ref={ref}>
            <button onClick={() => handleDotClick(index)}>
              <BsThreeDotsVertical className={classes.threedots} size={15} />
            </button>
            {openIndex === index && (
              <SideDots isOpen={true} onClose={() => setOpenIndex(-1)} />
            )}
          </div> */}
          <div className={classes.heading}>
          <NavLink to={`/myplayer/${course._id}`} className={classes.courseTitle}>
              {course.courseTitle}
            </NavLink>
            <div className={classes.instructor}>{course.instructorName}</div>
          </div>
          <Loading />
        </Card>
      )) : <div>No Courses Found</div>}
    </div>
  );
}

export default MainContent;
