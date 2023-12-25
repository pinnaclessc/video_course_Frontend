import React from "react";
import Styles from "./HoverCart.module.css";
import { BsCart3 } from "react-icons/bs";

export default function HoverCart() {
  const CARTDATA = [
    {
      id: 1,
      courseImage: "/image/coverImage0101.svg",
      courseName: "Maths 6800 TCS MCQ Chapter wise Book Video course ",
      Price: 499,
      fPrice: 1999,
      faculty: "Ramniwas sir",
    },
    {
      id: 2,
      courseImage: "/image/coverImage0101.svg",
      courseName: "Maths 6800 TCS MCQ Chapter wise Book Video course ",
      Price: 499,
      fPrice: 1999,
      faculty: "Ramniwas sir",
    },
  ];

  if (CARTDATA.length === 0) {
    console.log("No data is in the cart");
  }
  return (
    <div className={Styles.learning}>
      <div className={Styles.dropdown}>
        <button className={Styles.dropbtn}>
          <BsCart3 size={30} />
        </button>
        <div className={Styles.dropdown_content}>
          <div className={Styles.myLearningContainer}>
            <div className={Styles.myLearning_Description}>
              {CARTDATA.map((data) => {
                return (
                  <div key={data.id} className={Styles["CartList-ul"]}>
                    <div
                      className={Styles["both-ImageSection-descriptionSection"]}
                    >
                      <div className={Styles["CartList-ImageSection"]}>
                        <img
                          src={data.courseImage}
                          alt={data.id}
                          className={Styles["Image"]}
                        ></img>
                      </div>

                      <div className={Styles["CartList-descriptionSection"]}>
                        <div className={Styles["courseName"]}>
                          {data.courseName}
                        </div>
                        <div className={Styles["facult"]}>{data.faculty}</div>
                        <div className={Styles["Prise-fPrice-section"]}>
                          <div> &#8377;{data.Price}</div>
                          <div className={Styles["fPrice"]}>
                            {" "}
                            &#8377;{data.fPrice}
                          </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
