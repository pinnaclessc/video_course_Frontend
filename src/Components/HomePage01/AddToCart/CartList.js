import React from "react";
import Styles from "./CartList.module.css";

export default function CartList(props) {
  if (props.CartData.length === 0) {
    return (
      <div className={Styles["empty-cart"]}>
        <p className={Styles["empty-cart-para"]}> Your cart is empty.</p>
        <button className={Styles["Keep-shopping-btn"]}>Keep shopping</button>
      </div>
    );
  }

  return (
    <div className={Styles["CartList-fullPage"]}>
      {props.CartData.map((data) => {
        return (
          <div key={data.id} className={Styles["CartList-ul"]}>
            <div className={Styles["both-ImageSection-descriptionSection"]}>
              <div className={Styles["CartList-ImageSection"]}>
                <img
                  src={data.courseImage}
                  alt={data.id}
                  className={Styles["Image"]}
                ></img>
              </div>

              <div className={Styles["CartList-descriptionSection"]}>
                <div className={Styles["courseName"]}>{data.courseName}</div>
                <div className={Styles["facult"]}>{data.faculty}</div>
                <div className={Styles["Prise-fPrice-section"]}>
                  <div> &#8377;{data.Price}</div>
                  <div className={Styles["fPrice"]}> &#8377;{data.fPrice}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className={Styles["Total-GoTocart-Section"]}>
        <div className={Styles["TotalSection"]}>
          <p>Total : &#8377; total-price</p>
        </div>
        <button className={Styles["GoToCart-btn"]}> Go to cart</button>
      </div>
    </div>
  );
}
