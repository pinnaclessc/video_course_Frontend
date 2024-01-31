import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import data from "./data.json";
import styles from "./Cart.module.css";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ApplyCoupon from "./ApplyCoupon";
import Share from "./ShareComponent/Share";
import { Link, useParams } from "react-router-dom";
import { IoHeartCircleOutline } from "react-icons/io5";

const Cart = () => {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getCourseDetails();
  }, []);

  const getCourseDetails = async () => {
    try {
      const response = await fetch(
        `http://13.200.156.92:8000/course/${params.id}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch course details. Status: ${response.status}`
        );
      }

      const result = await response.json();
      console.log(result);

      setCourseTitle(result.courseTitle);
      setCourseDetails(result.courseDetails);
      setTeacherName(result.teacherName);
      setRating(result.rating);
      setPrice(result.price);
      setMrp(result.mrp);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  const [selectedMonths, setSelectedMonths] = useState(1);
  const [showCoupon, setShowCoupon] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [courseTitle, setCourseTitle] = useState();
  const [courseDetails, setCourseDetails] = useState();
  const [teacherName, setTeacherName] = useState();
  const [rating, setRating] = useState();
  const [price, setPrice] = useState();
  const [mrp, setMrp] = useState();

  const { image1, image2, heading, description, subscriptionPrice } = data;

  const navigateHandler = () => {
    navigate(`/mylearning/${params.id}`);
  };

  const handleShare = () => {
    setIsShare(!isShare);
  };

  const handleMonthsChange = (event) => {
    setSelectedMonths(Number(event.target.value));
  };

  const ApplyCouponHandler = () => {
    setShowCoupon(!showCoupon);
  };

  const handleBuy = async () => {
    const auth = localStorage.getItem('user');

    if (!auth) {
      navigate('/signup');
     
      return;
    }
    try {
      const userId = JSON.parse(localStorage.getItem("user"))._id;
      const response = await fetch(
        `http://13.200.156.92:8000/purchase/${userId}/${params.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            courseId: params.course_id,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
       
        Swal.fire({
          title: 'Success!',
          text: 'Congratulations! You own this course.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        // Handle error
        console.error("Failed to purchase course");
      }
    } catch (error) {
      console.error("Error during purchase:", error);
    }
  };

  const cartHandler=async () =>{
    const auth = localStorage.getItem('user');

    if (!auth) {
      navigate('/signup');

      return;
    }
    try {
      const userId = JSON.parse(localStorage.getItem("user"))._id;
      const response = await fetch(
        `http://13.200.156.92:8000/add-to-cart/${userId}/${params.id}`,
        
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            courseId: params.course_id,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
     
        Swal.fire({
          title: 'Success!',
          text: 'Added in cart',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        // Handle error
        console.error("Failed to purchase course");
      }
    } catch (error) {
      console.error("Error during purchase:", error);
    }
  }
  const wishlistHandler=async () =>{
    const auth = localStorage.getItem('user');

    if (!auth) {
      navigate('/signup');
   
      return;
    }
    try {
      const userId = JSON.parse(localStorage.getItem("user"))._id;
      const response = await fetch(
        `http://13.200.156.92:8000/add-to-wishlist/${userId}/${params.id}`,
        
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            courseId: params.course_id,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
      
        Swal.fire({
          title: 'Success!',
          text: 'Added to Wishlist',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        // Handle error
        console.error("Failed to purchase course");
      }
    } catch (error) {
      console.error("Error during purchase:", error);
    }
  }

  const getPrice = () => {
    switch (selectedMonths) {
      case 6:
        return 850;
      case 12:
        return 1250;
      case 18:
        return 1500;
      case 24:
        return 2000;
      default:
        return 500;
    }
  };

  return (
    <div className={styles["above-cart-fullpage"]}>
      <div className={styles["cart-fullpage"]}>
        <div className={styles["image-section"]}>
          <img
            src={image1}
            alt="Course1"
            className={styles["image1"]}
            id="cart-image1"
          />
          <img
            src={image2}
            alt="Course2"
            className={styles["image2"]}
            id="cart-image2"
          />
        </div>
        <div className={styles.overlay}>
          <div className={styles["video-preview-div"]}>
            <div className={styles["video-icon"]} onClick={navigateHandler}>
              <AiOutlinePlayCircle size={40} />
            </div>
            <div className={styles["video-icon-p-div"]}>
              <p>Preview this course</p>
            </div>
          </div>

          <h2 className={styles.heading}>{courseTitle}</h2>
          <p className={styles.course}>
            {courseDetails}
            <br />
            <Link to="/personalPlane">Learn More</Link>
          </p>
          {/* <button
            className={styles["Start-Subscription-btn"]}
            onClick={() => navigate("/checkout")}
          >
            Start Subscription
          </button>
          <p className={styles["Subscription-para"]}>
            Starting at ₹ {price} per month Cancel anytime
          </p> */}
          <div className={styles["range-slider-container"]}>
            <input
              type="range"
              min="6"
              max="24"
              step="6"
              value={selectedMonths}
              onChange={handleMonthsChange}
              className={styles["range-slider"]}
            />
          </div>
          <div className={styles["Months-price-section"]}>
            <p className={styles.months}>Months: {selectedMonths}</p>
            <p className={styles.price}>Price: ₹{getPrice()}</p>
          </div>

          <button className={styles["Buy-this-course"]} onClick={handleBuy}>
            Buy this course
          </button>
          <div className={styles["buttons-section"]}>
            <button className={styles["individual-btn"]} onClick={handleShare}>
              Share
            </button>

            <button
              className={styles["individual-btn"]}
              onClick={() => navigate("/gitACourse")}
            >
              Gift this course
            </button>
            <button
              className={styles["individual-btn"]}
              onClick={ApplyCouponHandler}
            >
              Apply coupon
            </button>
          </div>

          <div>{showCoupon && <ApplyCoupon />}</div>
        </div>
      </div>
      {isShare && <Share />}
      <div className={styles["cart-wishlist-Btn-div"]}>
        <button
          className={styles["cartBtn"]}
          onClick={cartHandler}
        >
          Add to Cart
        </button>
        <button
          className={styles["wishListBtn"]}
          onClick={wishlistHandler}
        >
          <IoHeartCircleOutline size={40}/>
        </button>
      </div>
    </div>
  );
};

export default Cart;
