import React, { useState, useEffect, useRef } from "react";
import classes from "./MainContent.module.css";
import { FaPlay } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import Card from "../Card/Card";
import Loading from "../ProgressBar/ProgressBar";
import { Link } from "react-router-dom";
import SideDots from "../Three Dots/SideDots";
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MainContent() {
  const { userId } = useParams();
  const [courseDetails, setCourseDetails] = useState([]);
  const [error, setError] = useState(null);
  const [openIndex, setOpenIndex] = useState(-1);
  const ref = useRef(null);

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        if (!userId) {
          throw new Error('User ID not found in URL parameters.');
        }
        const response = await axios.get(`https://videocoursebackend.ssccglpinnacle.com/vc/purchasedCourses/${userId}`);
        console.log('Purchased Courses:', response.data.purchasedCourses);
        fetchCourseDetails(response.data.purchasedCourses);
      } catch (error) {
        console.error('Error fetching purchased courses:', error);
        setError('Error fetching purchased courses. Please try again.');
      }
    };

    const fetchCourseDetails = async (courseIds) => {
      const courseDetailsPromises = courseIds.map(courseId =>
        axios.get(`https://videocoursebackend.ssccglpinnacle.com/course/${courseId}`).catch(err => {
          console.error(`Error fetching details for courseId: ${courseId}`, err);
          return null; // Return null for errors to filter out later
        })
      );

      try {
        const courseDetailsResponses = await Promise.all(courseDetailsPromises);
        const details = courseDetailsResponses.filter(response => response !== null).map(response => response.data);
        setCourseDetails(details);
      } catch (error) {
        console.error('Error fetching course details:', error);
        setError('Error fetching course details. Please try again.');
      }
    };

    fetchPurchasedCourses();
  }, [userId]);

  const handleDotClick = (index) => {
    setOpenIndex(prevIndex => (prevIndex === index ? -1 : index));
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpenIndex(-1);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={classes.card_container}>
      {courseDetails.length > 0 ? courseDetails.map((course, index) => (
        <Card key={course._id} className={classes.card}>
          <div className={classes.card_img_container}>
            <div className={classes.card_img}>
              {/* <img src={course.hindiCoverImage || course.englishCoverImage} alt={course.title} width="95" height="95" /> */}
              <img src={course.hindiCoverImage} alt={course._id} width="95" height="95" />
            <img src={course.englishCoverImage} alt={course._id} width="95" height="95" />
              {/* <Link to={`/mylearning/${userId}/`}> */}
              <Link to={`/myplayer/${course._id}`}>
                <div className={classes.play_icon}><FaPlay size={30} /></div>
              </Link>
            </div>
          </div>
          <div className={classes.sidedots} ref={ref}>
            <button onClick={() => handleDotClick(index)}>
              <BsThreeDotsVertical className={classes.threedots} size={15} />
            </button>
            {openIndex === index && (
              <SideDots isOpen={true} onClose={() => setOpenIndex(-1)} />
            )}
          </div>
          <div className={classes.heading}>
          <Link to={`/myplayer/${course._id}`} className={classes.title}>
              {course.title}
            </Link>
            <div className={classes.instructor}>{course.instructorName}</div>
          </div>
          <Loading />
        </Card>
      )) : <div>No Courses Found</div>}
    </div>
  );
}

export default MainContent;
