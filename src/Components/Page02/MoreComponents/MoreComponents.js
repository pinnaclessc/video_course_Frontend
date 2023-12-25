import React from "react";
import classes from "./MoreComponents.module.css";
import FeaturedReview from "./FeaturedReview";
import FacultyComponent from "./FacultyComponent";
import StudentAlsoBought from  "../Students-also-bought/StudentAlsoBought";
import Frequently_Bought_Together from "../Frequently-Bought-Together/Frequently_Bought_Together"

export default function MoreComponents() {
  return (
    <div className={["MoreComponents-fullpage"]}>
      <div className={classes["featured review-div"]}><FeaturedReview/></div>
      <div className={classes["students-also-bought-div"]}><StudentAlsoBought/></div>
      <div className={classes[""]}><Frequently_Bought_Together /></div>
      <div className={classes["Faculty-div"]}><FacultyComponent/></div>
    </div>
  );
}
