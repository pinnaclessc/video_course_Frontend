import React from "react";
import Styles from "./ContectUs.module.css";
import Header from "../Components/HomePage01/Header/Header";
import Footer from "../Footer02.js/Footer";

export default function ContectUs() {
  return (
    <>
      <div className={Styles["ContectUs-fullPage"]}>
      <div className={Styles["ContectUs-heading"]}>Contact Us</div>
      <div className={Styles["ContectUs-Para"]}>
        Address: Pinnacle Civil Services 1st Floor, 1032A/1, MM Tower Railway
        Road, Gurugram-122001 Haryana support@ssccglpinnacle.com
      </div>
      </div>
    </>
  );
}
