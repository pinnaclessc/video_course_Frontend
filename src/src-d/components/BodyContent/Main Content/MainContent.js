import React, { useState, useEffect, useRef } from "react";
import classes from "./MainContent.module.css";
import { FaPlay } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import Card from "../Card/Card";
import Loading from "../ProgressBar/ProgressBar";
import { Link } from "react-router-dom";
import SideDots from "../Three Dots/SideDots";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


function MainContent() {
  const { userId} = useParams();
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [error, setError] = useState(null);
  const [isVerticalOptions, setVerticalOptions] = useState([]);
  const [openIndex, setOpenIndex] = useState(-1);
  const [lastClickedIndex, setLastClickedIndex] = useState(-1);
  const [isSideDotsOpen, setSideDotsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        if (!userId) {
          throw new Error('User ID not found in URL parameters.');
        }
        const response = await axios.get(`http://13.200.156.92:8000/purchased-courses/${userId}`);
        setPurchasedCourses(response.data.purchasedCourses);
        setVerticalOptions(Array(response.data.purchasedCourses.length).fill(false));
      } catch (error) {
        console.error('Error fetching purchased courses:', error);
        setError('Error fetching purchased courses. Please try again.');
      }
    };

    fetchPurchasedCourses();
  }, [userId]);

  const handleCloseSideDots = () => {
    setSideDotsOpen(false); 
  };

  const handlePlayClick = (link) => {
    console.log("Opening video link:", link);
  };

  const handleDotClick = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setVerticalOptions(Array(purchasedCourses.length).fill(false));
      setLastClickedIndex(-1);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [purchasedCourses.length]);   
    
  return (
    <div className={classes.card_container}>
      {purchasedCourses.map((item, index) => (
        <Card key={item.id} className={classes.card}>
        <div className={classes.card_img_container}>
          <div className={classes.card_img}>
            <img src={item.image} alt="" width="95" height="95" />
            <img src={item.imageUrl} alt="" width="95" height="95" />
            <Link to={`/mylearning/${userId}/${item._id}`}><div
              className={classes.play_icon}
            >
                <FaPlay  size={30} />
            </div>
            </Link>
          </div>
        </div>
        <div className={classes.sidedots} ref={ref}>
          <button onClick={() => handleDotClick(index)}>
            <div className={classes.dots}>
              <BsThreeDotsVertical className={classes.threedots} size={15} />
            </div>
          </button>
          {openIndex === index && (
            <SideDots isOpen={true} onClose={handleCloseSideDots} />
          )}
        </div>
        <div className={classes.heading} >
<Link to={`/mylearning/${userId}/${item._id}`} className={classes.title}>
  {item.courseTitle}
</Link>

<Link to={`/mylearning/${userId}/${item._id}`}><div className={classes.instructor}>{item.teacherName}</div></Link>
        </div>
        <Loading />
      </Card>
      ))}
    </div>
  );
}

export default MainContent;

