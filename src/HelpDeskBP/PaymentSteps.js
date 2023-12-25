import React from "react";
import Styles from "./PaymentSteps.module.css";
import {TbPoint} from 'react-icons/tb'

export default function PaymentSteps() {
  return (
    <div className={Styles["PaymentSteps-fullPage"]}>
      <div className={Styles["PaymentSteps-Heading"]}>Purchasing a Course</div>
      <div className={Styles["PaymentSteps-MainContainer"]}>
        <div className={Styles["PaymentSteps-image-div"]}>
          1.&nbsp;&nbsp;
          <img
            src="/snapshort/snap01.svg"
            alt=""
            className={Styles["PaymentSteps-image"]}
          ></img>
        </div>
        <div className={Styles["heading-div"]}>
          Research and Choose a Course:
        </div>
        <div className={Styles["para-div"]}>
          <TbPoint/>
          Identify the specific government exam you're preparing for.
        </div>
        <div className={Styles["para-div"]}>
        <TbPoint/>
          Read reviews and ratings for different courses to find the one that
          suits your needs and learning style.
        </div>

        <div className={Styles["PaymentSteps-image-div"]}>
          2.&nbsp;&nbsp;
          <img
            src="/snapshort/snap02.svg"
            alt=""
            className={Styles["PaymentSteps-image"]}
          ></img>
        </div>

        <div className={Styles["PaymentSteps-image-div"]}>
          3.&nbsp;&nbsp;
          <img
            src="/snapshort/snap03.svg"
            alt=""
            className={Styles["PaymentSteps-image"]}
          ></img>
        </div>
        <div className={Styles["heading-div"]}>Apply Coupons:</div>
        <div className={Styles["para-div"]}>
        <TbPoint/>
          If you have a coupon code or if there's an ongoing discount, apply it
          at this stage. The system will recalculate the total price based on
          the discount.
        </div>
        <div className={Styles["PaymentSteps-image-div"]}>
          4.&nbsp;&nbsp;
          <img
            src="/snapshort/snap04.svg"
            alt=""
            className={Styles["PaymentSteps-image"]}
          ></img>
        </div>
        <div className={Styles["heading-div"]}>Proceed to Checkout</div>
        <div className={Styles["para-div"]}>
        <TbPoint/>
          Click on the "Proceed to Checkout," "Continue to Payment," or similar
          button to move to the payment section.
        </div>
        <div className={Styles["PaymentSteps-image-div"]}>
          5.&nbsp;&nbsp;
          <img
            src="/snapshort/snap05.svg"
            alt=""
            className={Styles["PaymentSteps-image"]}
          ></img>
        </div>
        <div className={Styles["PaymentSteps-image-div"]}>
          <img
            src="/snapshort/snap06.svg"
            alt=""
            className={Styles["PaymentSteps-image"]}
          ></img>
        </div>
        <div className={Styles["heading-div"]}>Choose Payment Method And Enter Billing Information:</div>
        <div className={Styles["para-div"]}>
        <TbPoint/>
          Select the payment method you want to use. Common options include
          credit or debit cards, PayPal, and sometimes other digital wallets.
        </div>
        <div className={Styles["para-div"]}>
        <TbPoint/>
          Provide your billing information, which typically includes your name,
          billing address, and contact details. This is the information
          associated with the payment method you'll be using.
        </div>
        <div className={Styles["PaymentSteps-image-div"]}>
          6.&nbsp;&nbsp;
          <img
            src="snapshort/snap01.svg"
            alt=""
            className={Styles["PaymentSteps-image"]}
          ></img>
        </div>
        <div className={Styles["heading-div"]}>Review Order Summary:</div>
        <div className={Styles["para-div"]}>
        <TbPoint/>
          Before finalizing the payment, review the order summary. Make sure the
          course details, any discounts, and the total amount are correct.
        </div>
        <div className={Styles["PaymentSteps-image-div"]}>
          7.&nbsp;&nbsp;
          <img
            src="snapshort/snap01.svg"
            alt=""
            className={Styles["PaymentSteps-image"]}
          ></img>
        </div>
        <div className={Styles["heading-div"]}>Confirm Payment:</div>
        <div className={Styles["para-div"]}>
        <TbPoint/>
          Once you're satisfied with the order summary, click on the "Confirm
          Payment," "Place Order," or similar button to initiate the payment
          process.
        </div>
        <div className={Styles["PaymentSteps-image-div"]}>
          8.&nbsp;&nbsp;
          <img
            src="/snapshort/snap07.svg"
            alt=""
            className={Styles["PaymentSteps-image"]}
          ></img>
        </div>
        <div className={Styles["PaymentSteps-image-div"]}>
          <img
            src="/snapshort/snap08.svg"
            alt=""
            className={Styles["PaymentSteps-image"]}
          ></img>
        </div>
        <div className={Styles["heading-div"]}>Start Learning:</div>
        <div className={Styles["para-div"]}>
        <TbPoint/>
          Begin exploring the course content by watching the video lessons,
          engaging with assignments, and interacting with any supplementary
          materials provided by the instructor. Remember to keep track of your
          payment confirmation email and any receipts as proof of purchase. If
          you encounter any issues during the payment process, many platforms
          offer customer support to assist you. Always ensure that you're
          entering your payment information on a secure and reputable platform
          to protect your personal and financial information.
        </div>
      </div>
    </div>
  );
}
