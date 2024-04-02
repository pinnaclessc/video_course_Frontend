import React, { useState, useEffect } from "react";
import axios from 'axios';
import Styles from "./HoverCart.module.css";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Hoverwishlist() {
  const [CARTDATA, setCARTDATA] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false);



  const getUserId = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user)._id : null;
  };

  const userId = getUserId();

  useEffect(() => {
    const fetchCartCourses = async () => {
      if (!userId) {
        console.log("No user logged in.");
        return;
      }

      try {
        const response = await axios.get(`https://videocoursebackend.ssccglpinnacle.com/vc/cart/${userId}`);
        const data = response.data;

        if (data.success && Array.isArray(data.cartCourses)) {
          setCARTDATA(data.cartCourses);
        } else {
          console.error("Invalid data format received from the API:", data);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    const fetchWishlistCourses = async () => {
      if (!userId) {
        setError("User ID is missing");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://videocoursebackend.ssccglpinnacle.com/vc/wishlist/${userId}`);
        if (response.data.success && response.data.wishlistCourses) {
          const courseIds = response.data.wishlistCourses;
          fetchCourseDetails(courseIds);
        } else {
          throw new Error("Failed to load wishlist courses.");
        }
      } catch (err) {
        setError("Failed to load wishlist courses. Please try again.");
        console.error(err);
        setLoading(false);
      }
    };

    const fetchCourseDetails = async (courseIds) => {
      try {
        const details = await Promise.all(
          courseIds.map(async (courseId) => {
            const response = await axios.get(`https://videocoursebackend.ssccglpinnacle.com/course/${courseId}`);
            return response.data;
          })
        );
        setCourseDetails(details);
      } catch (error) {
        setError("Error fetching course details. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchCartCourses();
    fetchWishlistCourses();
  }, [userId]);

  const calculateTotalPrice = () => {
    return CARTDATA.reduce((total, item) => total + item.price, 0);
  };

  const toggleShowCourses = () => {
    setShowAllCourses(!showAllCourses);
  };

  // Determine the number of courses to display based on showAllCourses state
  const displayedCourses = showAllCourses ? [...CARTDATA, ...courseDetails] : [...CARTDATA.slice(0, 3), ...courseDetails.slice(0, 3)];

  return (
    <div className={Styles.learning}>
      <div className={Styles.dropdown}>
        <button className={Styles.dropbtn}>
        <FaRegHeart size={30}/>
        </button>
        {(CARTDATA.length > 0 || courseDetails.length > 0) ? (
          <div className={Styles.dropdown_content}>
            {loading ? <p>Loading...</p> : (
              <div className={Styles.myLearningContainer}>
                {error && <p className={Styles.error}>{error}</p>}
                <div className={Styles.myLearning_Description}>
                  {displayedCourses.map((data, index) => (
                    <div key={index} className={Styles["CartList-ul"]}>
                      <div className={Styles["both-ImageSection-descriptionSection"]}>
                        <div className={Styles["CartList-ImageSection"]}>
                        <img src={data.englishCoverImage} alt="courseimage" className={Styles["Image"]} />
                        {/* <img src={data.hindiCoverImage} alt="courseimage" className={Styles["Image"]} /> */}
                        </div>
                        <div className={Styles["CartList-descriptionSection"]}>
                          <div className={Styles["courseName"]}>{data.title}</div>
                          <div className={Styles["facult"]}>{data.instructorName}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {(CARTDATA.length > 3 || courseDetails.length > 3) && (
                    <button className={Styles["ToggleCourses-btn"]} onClick={toggleShowCourses}>
                      {showAllCourses ? 'Show Less' : 'Show More'}
                    </button>
                  )}
                  <div className={Styles["Total-GoTocart-Section"]}>
                    <Link to={"/wishlistPage"} className={Styles["GoToCart-btn"]} >Go to Wishlist</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className={Styles.dropdown_content}>
            <p>No items in the cart or wishlist.</p>
          </div>
        )}
      </div>
    </div>
  );
}
