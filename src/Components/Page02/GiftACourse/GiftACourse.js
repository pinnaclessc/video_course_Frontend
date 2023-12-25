import React,{useEffect} from "react";
import Style from "./GiftACourse.module.css";
import Header from "../../HomePage01/Header/Header";
import Footer from "../../../Footer02.js/Footer";
import { useNavigate } from "react-router";

export default function GiftACourse() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate=useNavigate();
  const GiftCourse = [
    {
      id: "c1",
      courseName: "Maths 6800 TCS MCQ Chapter wise Book Video course",
      faculty: "Ramniwas sir",
      image: "/image/coverImage0101.svg",
      image1: "/image/coverImage0102.svg",
    },
  ];
  return (
    <>
      <Header />
      <div className={Style["Main-heading"]}>Gift a course</div>
      <div className={Style["GiftCourse-fullPage"]}>
        <div className={Style["body-container01"]}>
          <div className={Style["container01-section"]}>
            <div className={Style["flex-div"]}>
              <label className={Style["label-div"]}>Recipient’s Name:</label>
              <input
                type="text"
                className={Style["name-email-input-div"]}
              ></input>
            </div>
            <div className={Style["flex-div"]}>
              <label className={Style["label-div"]}>Recipient’s Email:</label>
              <input
                type="text"
                className={Style["name-email-input-div"]}
              ></input>
            </div>
            <div className={Style["flex-div"]}>
              <label className={Style["label-div"]}>
                When do you want to send this gift:
              </label>
              <input
                type="date"
                className={Style["name-email-input-div"]}
              ></input>
            </div>
            <div className={Style["flex-div"]}>
              <label className={Style["label-div"]}>
                Your Message (optional):
              </label>
              <input type="text" className={Style["message-input-div"]}></input>
            </div>
            <div className={Style["checkout-div"]}>
            <button className={Style["checkout-btn"]} onClick={()=>navigate('/checkout')} >Process to checkout</button>
            </div>
          </div>
      
        </div>

        <div className={Style["body-container02"]}>
          {GiftCourse.map((data) => (
            <div className={Style["container02-section"]}>
              <div className={Style["Image-section"]}>
                <img src={data.image} alt="" className={Style["Image"]}></img>
                <img src={data.image1} alt="" className={Style["Image"]}></img>
              </div>
              <div className={Style["courseName"]}>{data.courseName}</div>
              <div className={Style["faculty"]}>
                an online course by {data.faculty}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
