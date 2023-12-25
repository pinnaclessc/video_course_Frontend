import React from "react";
import image from "./Featured_review_img.svg";
import classes from "./featuredReview.module.css";
import { BsStar, BsStarHalf } from "react-icons/bs";
import {SlLike,SlDislike} from "react-icons/sl"

export default function FeaturedReview() {
  return (
    <div className={classes["featured-review-fullPage"]}>
      <div className={classes["featured-review"]}>
        <div className={classes["featured-review-heading"]}>
          Featured review
        </div>
        <div className={classes["image-section"]}>
          <div className={classes["Image"]}>
            <img src={image} alt="Img" width="70" height="70"></img>
          </div>
          <div>
            <div className={classes["Name"]}>Monika Bansal</div>
            <div className={classes["courses"]}>7 courses</div>
            <div className={classes["courses"]}>6 reviews</div>
          </div>
        </div>
        <div className={classes["rating-section"]}>
          {" "}
          <BsStar />
          <BsStar />
          <BsStar />
          <BsStar />
          <BsStarHalf />
          &nbsp;&nbsp;Rating
        </div>
        <div className={classes["description-section"]}>
          This is highly organized course. Faculty Ramniwas sir has taught in a
          brilliant way to clear all concepts. There is no time wastage in the
          course unlike other teachers on youtube. This will save your lot of
          time. This course is clearing all my doubts. Now I have learnt many
          short cuts through which I am able to solve questions very fast. Exam
          oriented and no time wastage approach making this course ideal course
          for ssc aspirants.
        </div>
        <div className={classes["like-section"]}>Was this review helpful?</div>
        <div className={classes["like-btn-section"]}>
          <button className={classes["btn"]}><SlLike size={15}/></button>
          <button className={classes["btn"]}><SlDislike size={15}/></button>
        </div>
      </div>
    </div>
  );
}
