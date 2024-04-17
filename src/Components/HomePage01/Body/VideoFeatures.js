import React from 'react'
import classes from "./VideoFeatures.module.css"


export default function VideoFeatures() {
  return (
    <div className={classes.VideoFeatures_fullCourse}>
       <div className={classes.Heading_section}>
        <div className={classes.heading}><em>Now you have India's highest options of courses to explore</em></div>
        <div><button className={classes.Features_btn}>Features</button></div>
       </div>
       <div className={classes.content_section}>
        <div className={classes.content_box1}>
          <div className={classes.features}>01. Highly organized contents</div>
          <div className={classes.features}>02. Videos + class notes</div>
          <div className={classes.features}>03. Progress report</div>
          <div className={classes.features}>04. Modern video player</div>
          <div className={classes.features}>05. increase or decrease speed</div>
          <div className={classes.features}>06. Increase or decrease quality</div>
        </div>
        <div className={classes.content_box2}>
        <div className={classes.features}>07. watch on web - Laptop/desktop or mobile app</div>
        <div className={classes.features}>08. Day wise/topic wise schedule</div>
        <div className={classes.features}>09. Highly experienced and trained faculty</div>
        <div className={classes.features}>10. Exam oriented content</div>
        <div className={classes.features}>11. Notes making facility</div>

        </div>

       </div>


    </div>
  )
}
