import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./CartPage.module.css";
import Header from '../../HomePage01/Header/Header'; 
import Footer from '../../../src-d/components/Footer/Footer';

function WishlistPage() {
  const getUserId = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user)._id : null;
  };

  const userId = getUserId();

  const [courseDetails, setCourseDetails] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   const fetchCartCourses = async () => {
  //     if (!userId) {
  //       setError("User ID is missing");
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const response = await axios.get(`http://localhost:8000/vc/cart/${userId}`);
  //       if (response.data.success && response.data.addToCart) {
  //         const courseIds = response.data.addToCart;
  //         const fetchedCourses = await Promise.all(
  //           courseIds.map(courseId =>
  //             axios.get(`http://localhost:8000/course/${courseId}`)
  //           )
  //         );
  //         const courses = fetchedCourses.map(res => res.data);
  //         setCourseDetails(courses);
  //         const months = {};
  //         courses.forEach(course => {
  //           months[course._id] = 6; 
  //         });
  //         setSelectedMonths(months);
  //         calculateTotalPrice(courses, months);
  //       } else {
  //         throw new Error("Failed to load cart courses.");
  //       }
  //     } catch (err) {
  //       setError("Failed to load cart courses. Please try again.");
  //       setLoading(false);
  //     }
  //   };

  //   fetchCartCourses();
  // }, [userId]);

  useEffect(() => {
    const fetchWishlistCourses = async () => {
      if (!userId) {
        setError("User ID is missing");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://videocoursebackend.ssccglpinnacle.com/vc/wishlist/${userId}`
        );
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
            const response = await axios.get(
              `https://videocoursebackend.ssccglpinnacle.com/course/${courseId}`
            );
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

    fetchWishlistCourses();
  }, [userId]);

  const handleMonthsChange = (courseId, months) => {
    setSelectedMonths(prev => ({ ...prev, [courseId]: months }));
    calculateTotalPrice(courseDetails, { ...selectedMonths, [courseId]: months });
  };
  const calculateTotalPrice = (courses, months) => {
    const total = courses.reduce((acc, course) => {
      return acc + calculatePrice(course.price, months[course._id]);
    }, 0);
    setTotalPrice(Number(total.toFixed(2))); 
  };
  const calculatePrice = (price, months) => {
    let finalPrice = price;
    switch (months) {
      case 12:
        finalPrice = price * 2 * 0.9; 
        break;
      case 18:
        finalPrice = price * 3 * 0.85;
        break;
      case 24:
        finalPrice = price * 4 * 0.8;
        break;

    }
  
    return Number(finalPrice.toFixed(2));
  };
  

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }
  return (
    <>
      <Header />
      <div className={styles.cartContainer}>
        <h2 className={styles.cartHeader}> Wishlist</h2>
        <div className={styles.courseContainer}>
          {courseDetails.map(course => (
            <div key={course._id} className={styles.courseCard}>
 <div className={styles.courseImageContainer}>
      <img src={course.hindiCoverImage} alt="Hindi Cover" className={styles.coverImage}/>
      <img src={course.englishCoverImage} alt="English Cover" className={styles.coverImage}/>
    </div>
              <div className={styles.courseDetails}>
                <h3 className={styles.courseTitle}>{course.title}</h3>
                <p className={styles.courseInstructor}>{course.instructorName}</p>
                <div className={styles.courseMeta}>
                  <span className={styles.rating}>{course.rating} stars</span>
                  <span>({course.reviewCount} reviews)</span>
                </div>
                <div className={styles.priceSection}>
                  <select
                    value={selectedMonths[course._id] || 6}
                    onChange={(e) => handleMonthsChange(course._id, Number(e.target.value))}
                    className={styles.monthSelector}
                  >
                    <option value={6}>6 Months</option>
                    <option value={12}>12 Months</option>
                    <option value={18}>18 Months</option>
                    <option value={24}>24 Months</option>
                  </select>
                  <p className={styles.price}>Price: ₹{calculatePrice(course.price, selectedMonths[course._id] || 6)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.totalPriceSection}>
          <h3>Total: ₹{totalPrice}</h3>
        </div>
      </div>
      <Footer />
    </>
  );


}

export default WishlistPage;