import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Data from "./cartData.json";
import Styles from "./Cartpage02.module.css";

export default function CartPage02() {
  return (
    <div>
      <Header />
      <div>  this is cartpage02</div>
      <div className={Styles["cartpage02-fullPage"]}>
        {Data.map((data)=>(
            <div className={Styles["box1-box2-div"]}>
                <div className={Styles["box1"]}>box 1</div>
               

            </div>
        ))}
      </div>
      <div className={Styles["box2"]}> box 2</div>

      <Footer />
    </div>
  );
}
