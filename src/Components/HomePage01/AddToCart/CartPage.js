import React from "react";
import Styles from "./CartPage.module.css";
import Data from "./cartData.json";
import YouMightAlsoLike from "./YouMightAlsoLike";
import image from "./empty-shoping-cart.png";

export default function CartPage() {
  if (Data.length === 0) {
    return (
      <div className={Styles["cartPage-first-div"]}>
        <div className={Styles["empty-shoping-cart-div"]}>
          <div className={Styles["Shopping-Cart-heading"]}>Shopping Cart</div>
          <div className={Styles["empty-shoping-para"]}>0 Courses in Cart</div>
          <div className={Styles["empty-shoping-cart-body"]}>
            <div>
              <img src={image} alt="emptyImage"></img>
            </div>
            <div>Your cart is empty. Keep shopping to find a course!</div>
            <div className={Styles["keepShoping-div"]}>
              <button className={Styles["keepShoping-btn"]}>
                Keep Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={Styles["CartPage-FullPage"]}>
      <div className={Styles[""]}>
        <div className={Styles["Shopping-Cart-heading"]}>Shopping Cart</div>
        <div className={Styles["empty-shoping-para"]}>
          <b> {Data.length} </b> Courses in Cart
        </div>
          {Data.map((data) => (
            <div>
              <div className={Styles["part1"]}>
                <div className={Styles["Shopping-Cart-body"]}>
                  <div>
                    <div className={Styles["box1"]}>
                      <div className={Styles["Image-div"]}>
                        <img
                          src={data.image}
                          alt={data.id}
                          className={Styles["Image"]}
                        ></img>
                      </div>
                      <div className={Styles["description-div"]}>
                        <div className={Styles["title-teacher-more-div"]}>
                          <div>{data.title}</div>
                          <div>{data.teacher}</div>
                          <div>
                            <div>{data.rating} rated</div>
                            <div></div>
                          </div>
                          <div></div>
                        </div>
                        <div className={Styles["remove-saveforlatter-btns"]}>
                          <button className={Styles["individual-btn"]}>
                            Remove
                          </button>
                          <button className={Styles["individual-btn"]}>
                            Save For Letter
                          </button>
                        </div>
                        <div className={Styles["price-fprice-div"]}>
                          <div className={Styles["price-div"]}>
                            &#8377; {data.price}
                          </div>
                          <div className={Styles["fprice-div"]}>
                            &#8377; {data.fprice}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={Styles["part2"]}>
          <div>Total:</div>
          <div className={Styles['totalPrice']}> &#8377; {1548}</div>
          <div className={Styles['total-F-Price']}> &#8377; {3998}</div>
          <div className={Styles['discount-div']}>83% off</div>
          <div  className={Styles['checkout-div']}><button className={Styles['checkout-Btn']}>CheckOut</button></div>
          <div className={Styles['promotions']}>Promotions</div>
          <div className={Styles['Apply']}>Apply</div>
          </div>
      <div className={Styles["Also-Like-heading"]}>You Might Also Like</div>
      <YouMightAlsoLike className={Styles["YouMightAlsoLike"]}/>
    </div>
  );
}
