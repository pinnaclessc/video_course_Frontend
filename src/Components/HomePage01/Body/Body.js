import React from "react";
import VideoFeatures from "./VideoFeatures";
import Categories from "./Categories";
import Comments from "./Comments";
import classes from "./Body.module.css";
import RecLunchedCourse from "./RecLunchedCourse";
import UpcomingCourse from "./UpcomingCourse";
import MostPopularCourses from "./MostPopularCourses";

export default function Body() {
  return (
    <>
      <div className={classes.Body_FullPage}>
        <div className={classes["Categories-VideoFeatures-Comments-div"]}>
        <div className={classes.categories_component}>
          <Categories/>
        </div>
        <div className={classes.videoAndComments_div}>
          <div><VideoFeatures /></div>
         <div className={classes.Comments_div}> <Comments /></div>
        </div>
        </div>

      
      <div className={classes.RecLunchedCourse_div}><RecLunchedCourse/></div>
      <div className={classes.UpcomingCourse_div}><UpcomingCourse/></div>
      <div className={classes.MostPopularCourses_div}><MostPopularCourses/></div>
      </div>
    </>
  );
}
