import React, { useState, useEffect } from "react";
import YouMightAlsoLike from "./YouMightAlsoLike";
import image from "./empty-shoping-cart.png";
import Styles from "./CartPage.module.css";

export default function CartPage() {
  const [cartData, setCartData] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/cart/${userId}`);
        const data = await response.json();
        if (data.success && Array.isArray(data.cartCourses)) {
          setCartData(data.cartCourses);
        } else {
          console.error("Invalid data format received from the API:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);
  const removeFromCartHandler = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:8000/remove-from-cart/${userId}/${courseId}`, {
        method: 'POST',
      });
      const data = await response.json();

      if (data.success) {
        // Remove the item from the cartData state
        setCartData((prevCartData) => prevCartData.filter((item) => item._id !== courseId));
      } else {
        console.error('Failed to remove course from cart:', data.message);
      }
    } catch (error) {
      console.error('Error removing course from cart:', error);
    }
  };

  const keepShoppingHandler = () => {};

  if (cartData.length === 0) {
    return (
      <div className={Styles.cartPageContainer}>
        <div className={Styles.emptyCartContainer}>
          <div className={Styles.cartHeader}>Shopping Cart</div>
          <div className={Styles.cartInfo}>0 Courses in Cart</div>
          <div>
            <img src={image} alt="emptyImage" />
            Your cart is empty. Keep shopping to find a course!
          </div>
          <div>
            <button
              className={Styles.checkoutButton}
              onClick={keepShoppingHandler}
            >
              Keep Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={Styles.cartPageContainer}>
      <div className={Styles["cartHeader-info-div"]}>
      <div className={Styles.cartHeader}>Shopping Cart</div>
      <div className={Styles.cartInfo}>
        <b>{cartData.length}</b> Courses in Cart
      </div>
      </div>
      <div className={Styles["cart-total-Container"]}>
        <div className={Styles["cartItem-container"]}>
          {cartData.map((data) => (
            <div key={data._id} className={Styles.cartItem}>
              <div className={Styles["image-section"]}>
                <img
                  src="https://dgkwgu5olgqh6.cloudfront.net/test-images/coverImage0101.svg"
                  alt="courseImage"
                  className={Styles.courseImage}
                />
                
              </div>
              <div className={Styles.itemDetails}>
                <div>{data.courseTitle}</div>
                <div>{data.teacherName}</div>
                <div>{data.rating} rated</div>
              </div>
              <div className={Styles.itemDetails}>
                <div>&#8377; {data.price}</div>
                <div>
                  &#8377;<s> {data.fprice || 1000}</s>
                </div>
              </div>
              <div className={Styles.itemActions}>
              <button className={Styles.checkoutButton} onClick={() =>removeFromCartHandler(data._id)}>
                Remove
              </button>
              </div>
            </div>
          ))}
        </div>

        <div className={Styles.cartTotal}>
          <div>Total:&#8377; {calculateTotalPrice()}</div>
          <div>&#8377; {calculateTotalFPrice()}</div>
          <div>{calculateDiscount()}% off</div>
          <div>
            <button className={Styles.checkoutButton}>CheckOut</button>
          </div>
          <div className={Styles.promotions}>Promotions</div>
          <div>
            <button className={Styles.applyButton}>Apply</button>
          </div>
        </div>
      </div>
      <div className={Styles.alsoLikeHeader}> You Might Also Like </div>
      <YouMightAlsoLike/>
    </div>
  );

  function calculateTotalPrice() {
    return cartData.reduce((total, item) => total + item.price, 0);
  }

  function calculateTotalFPrice() {
    return cartData.reduce((total, item) => total + item.fprice, 0);
  }

  function calculateDiscount() {
    const totalFPrice = calculateTotalFPrice();
    const totalDiscount = totalFPrice - calculateTotalPrice();
    return ((totalDiscount / totalFPrice) * 100).toFixed(2);
  }
}
