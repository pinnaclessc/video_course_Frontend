import React, { useEffect } from "react"
import Styles from "./PaymentMethod.module.css"

import { AiFillLock } from "react-icons/ai"
function PaymentMethod() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className={Styles["checkout-fullpage"]}>
      <div className={Styles["Header"]}>
        <img
          src="/images/Pinnacle logo colored.svg"
          alt="pinnacle Logo"
          className={Styles["logo"]}
        ></img>
        <button className={Styles["cancel-btn"]}> Cancel</button>
      </div>
      <div className={Styles["body-full-div"]}>
        <div className={Styles["part1"]}>
          <div className={Styles["checkout-heading"]}>Checkout</div>
          <div className={Styles["checkout-sub-heading"]}>Billing address</div>
          <div className={Styles["country-state-div"]}>
            <div className={Styles["country-div"]}>
              Country
              <select defaultValue="India" className={Styles["country"]}>
                <option>Please Select</option> <option>India</option>
              </select>
            </div>

            <div className={Styles["State-div"]}>
              State / Union Territory
              <select className={Styles["state"]} defaultValue="Please Select">
                <option>Uttar Pradesh</option>
                <option>Arunachal Pradesh</option>
                <option>Himanchal Pradesh</option> <option>Hariyana</option>
                <option>Please Select</option>
              </select>
            </div>
          </div>
          <div className={Styles["small-para-div"]}>
            Pinnacle is required by law to collect applicable transaction taxes
            for purchases made in certain tax jurisdictions.
          </div>
          <div className={Styles["PaymentGateway-section"]}>
            <div className={Styles["heading-require-div"]}>
              <div className={Styles["checkout-sub-heading"]}>
                Payment Method
              </div>
              <div className={Styles["require-div"]}>
                Secured connection <AiFillLock />
              </div>
            </div>
            <div className={Styles["PaymentGateway-div"]}></div>
          </div>
          <div className={Styles["checkout-sub-heading"]}>Order details</div>
          <div className={Styles["Order-details-div"]}></div>
        </div>
        <div className={Styles["part2"]}>
          <div className={Styles["Summary-section"]}>
            <div className={Styles["checkout-sub-heading"]}>Summary</div>
            <div className={Styles["original-price"]}>
              <div>Original Price:</div> <div> ₹ {`Total`}</div>
            </div>
            <div className={Styles["Total-price"]}>
              <div>Total:</div> <div>₹{`Total`} </div>
            </div>
            <div className={Styles["small-para-div"]}>
              By completing your purchase you agree to these Terms of Service.
              <div className={Styles["Complete-Checkout-div"]}>
                <button className={Styles["Complete-Checkout-btn"]}>
                  Complete Checkout
                </button>
              </div>
              <div className={Styles["last_container"]}>
                30-Day Money-Back Guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethod
