import React, { useState, useEffect } from "react";
import Styles from "./HoverCart.module.css";
import { FaRegHeart } from "react-icons/fa";

export default function Hoverwishlist() {
  const [CARTDATA, setCARTDATA] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        const response = await fetch(`http://localhost:8000/wishlist/${userId}`);
        const data = await response.json();
        // Check if the response is successful and contains cartCourses
        if (data.success && Array.isArray(data.cartCourses)){
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
  if (!Array.isArray(CARTDATA) || CARTDATA.length === 0) {
    console.log("No data is in the cart");
  }

  const calculateTotalPrice = () => {
    return CARTDATA.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className={Styles.learning}>
      <div className={Styles.dropdown}>
        <button className={Styles.dropbtn}>
          <FaRegHeart size={30}/>
        </button>
        <div className={Styles.dropdown_content}>
          <div className={Styles.myLearningContainer}>
            <div className={Styles.myLearning_Description}>
              {CARTDATA.map((data) => {
                return (
                  <div key={data._id} className={Styles["CartList-ul"]}>
                    <div
                      className={Styles["both-ImageSection-descriptionSection"]}
                    >
                      <div className={Styles["CartList-ImageSection"]}>
                        {/* You may need to adjust the property names based on your API response */}
                        <img 
                        src={data.courseImage} 
                        alt="cImage"className={Styles["Image"]}></img>
                      </div>

                      <div className={Styles["CartList-descriptionSection"]}>
                        <div className={Styles["courseName"]}>
                          {data.courseTitle}
                        </div>
                        <div className={Styles["facult"]}>{data.teacherName}</div>
                        <div className={Styles["Prise-fPrice-section"]}>
                          <div> &#8377;{data.price}</div>
                          {/* Assuming you have a property called 'fPrice' in your API response */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className={Styles["Total-GoTocart-Section"]}>
                <div className={Styles["TotalSection"]}>
                  <p>Total : &#8377; {calculateTotalPrice()}</p>
                </div>
                <button className={Styles["GoToCart-btn"]}> Go to cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
