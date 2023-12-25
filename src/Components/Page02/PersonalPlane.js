import React from "react";
import Styles from "./PersonalPlane.module.css";
import Image from "./carousel01.jpg";
import { AiOutlineCheckCircle, AiOutlineCheck } from "react-icons/ai";

export default function PersonalPlane() {
  return (
    <>
      
      <div className={Styles["PersonalPlane-fullPage"]}>
        <div className={Styles["main-container1"]}>
          <div className={Styles["container1"]}>
            <div className={Styles["PersonalPlane-para"]}>Personal Plane</div>
            <div>
              <h1>Take your career to the next level</h1>
            </div>
            <div className={Styles["subscription-para"]}>
              Go further at work and in life with subscription access to a
              collection of top-rated courses in tech, business, and more.
            </div>
            <div className={Styles["subscription-div"]}>
              <button className={Styles["subscription-btn"]}>
                Start Subscription
              </button>
            </div>
            <div className={Styles["subscription-para"]}>
              Starting at ₹750 per month. Cancel anytime.
            </div>
          </div>
          <div className={Styles["container2"]}>
            <img
              src={Image}
              alt=""
              className={Styles["container2-image"]}
            ></img>
          </div>
        </div>
        <div className={Styles["Choose-plan-heading"]}>
          {" "}
          Choose a plan that works for you
        </div>

        <div className={Styles["main-container1"]}>
          <div className={Styles["sub-container1"]}>
            <div className={Styles["Personal-Plan-cart"]}>
              <div className={Styles["best-value-div"]}>
                {" "}
                <AiOutlineCheckCircle />
                &nbsp;&nbsp; Best value
              </div>
              <div className={Styles["personl-plane-heading"]}>
                Personal Plan
              </div>
              <div className={Styles["Small-para"]}>
                Streamline your career goals
              </div>
              <div className={Styles["bellow-Small-para"]}>
                Starting at ₹750 per month. Cancel anytime.
              </div>
              <div className={Styles["Small-para-02"]}>
                Billed monthly or annually. Cancel anytime.
              </div>
              <div className={Styles["points-div"]}>
                <div className={Styles["points"]}>
                  <AiOutlineCheck /> 8,000+ professional and personal
                  development courses
                </div>
                <div className={Styles["points"]}>
                  <AiOutlineCheck />
                  4.4/5 average rating
                </div>
                <div className={Styles["points"]}>
                  <AiOutlineCheck />
                  4,000+ practice exercises
                </div>
                <div className={Styles["points"]}>
                  <AiOutlineCheck />
                  3,000+ top instructors
                </div>
                <div className={Styles["points"]}>
                  <AiOutlineCheck />
                  Career guides for web developers and data scientists
                </div>
              </div>

              <button className={Styles["StartSubscription-btn"]}>
                Start Subscription
              </button>
            </div>
          </div>
          <div className={Styles["sub-container2"]}>
            <div className={Styles["individual-courses-cart"]}>
              <div className={Styles["buyCourse-heading"]}>Buy individual courses</div>
              <div className={Styles["Small-para"]}>Learn anything</div>
              <div>₹20-₹200</div>
              <div className={Styles["Small-para-02"]}>One time purchase</div>
              <div className={Styles["points-div"]}>
                <div className={Styles["points"]}><AiOutlineCheck /> 213,000+ professional and personal development courses</div>
                <div className={Styles["points"]}><AiOutlineCheck /> Pay as you go</div>
                {/* <div className={Styles["points"]}> &#x274C;Career guides for web developers and data scientists</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
