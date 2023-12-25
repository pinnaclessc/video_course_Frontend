import React from "react";
import Styles from "./RefundPolicy.module.css";
import Header from "../Components/HomePage01/Header/Header";
import Footer from "../Footer02.js/Footer";

export default function RefundPolicy() {
  return (
    <>
      <div className={Styles["RefundPolicy-fullPage"]}>
        <div className={Styles["RefundPolicy-heading"]}>Refund Policy</div>
        <div className={Styles["RefundPolicy-Para"]}>
          Please read the subscription terms and conditions carefully before
          subscribing to any of the subscription plans, as once you have
          subscribed you cannot change, cancel your subscription plan. Once you
          subscribe and make the required payment, it shall be final and there
          cannot be any
          <br />
          changes or modifications to the same, and neither will there be any
          refund.
        </div>
      </div>
    </>
  );
}
