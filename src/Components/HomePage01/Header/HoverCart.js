import React, { useState, useEffect } from "react";
import Styles from "./HoverCart.module.css";
import { BsCart3 } from "react-icons/bs";

export default function HoverCart() {
  const [CARTDATA, setCARTDATA] = useState([]);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const getUserId = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user)._id : null;
  };

  const userId = getUserId();

  useEffect(() => {
    if (!userId) {
      console.log("No user logged in.");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`http://13.200.156.92:8000/cart/${userId}`);
        const data = await response.json();

        if (data.success && Array.isArray(data.cartCourses)) {
          setCARTDATA(data.cartCourses);
        } else {
          console.error("Invalid data format received from the API:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const calculateTotalPrice = () => {
    return CARTDATA.reduce((total, item) => total + item.price, 0);
  };

  const toggleShowCourses = () => {
    setShowAllCourses(!showAllCourses);
  };

  // Determine the number of courses to display based on showAllCourses state
  const displayedCourses = showAllCourses ? CARTDATA : CARTDATA.slice(0, 3);

  return (
    <div className={Styles.learning}>
      <div className={Styles.dropdown}>
        <button className={Styles.dropbtn}>
          <BsCart3 size={30} />
        </button>
        {CARTDATA && CARTDATA.length > 0 ? (
          <div className={Styles.dropdown_content}>
            <div className={Styles.myLearningContainer}>
              <div className={Styles.myLearning_Description}>
                {displayedCourses.map((data) => (
                  <div key={data._id} className={Styles["CartList-ul"]}>
                    <div className={Styles["both-ImageSection-descriptionSection"]}>
                      <div className={Styles["CartList-ImageSection"]}>
                      <img src={data.imageUrl} alt="course image" className={Styles["Image"]} />
                      </div>
                      <div className={Styles["CartList-descriptionSection"]}>
                        <div className={Styles["courseName"]}>{data.courseTitle}</div>
                        <div className={Styles["facult"]}>{data.teacherName}</div>
                        <div className={Styles["Prise-fPrice-section"]}>
                          <div>&#8377;{data.price}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {CARTDATA.length > 3 && (
                  <button className={Styles["ToggleCourses-btn"]} onClick={toggleShowCourses}>
                    {showAllCourses ? 'Show Less' : 'Show More'}
                  </button>
                )}
                <div className={Styles["Total-GoTocart-Section"]}>
                  <div className={Styles["TotalSection"]}>
                    <p>Total: &#8377;{calculateTotalPrice()}</p>
                  </div>
                  <button className={Styles["GoToCart-btn"]}>Go to cart</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={Styles.dropdown_content}>
            <p>No items in the cart.</p>
          </div>
        )}
      </div>
    </div>
  );
}
