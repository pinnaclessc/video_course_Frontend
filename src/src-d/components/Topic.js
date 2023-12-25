import React from "react"
import classes from "./Topic.module.css"
import { IoMdContacts } from "react-icons/io"
import Card from "./BodyContent/Card/Card"

function Topic() {
  return (
    <div className={classes.topic_container}>
      <h3 className={classes.topic_heading}>SSC CGL</h3>
      <h4 className={classes.topic_subheading}>
        SSC CGL related courses are available here
      </h4>
      <IoMdContacts className={classes.icon} size={20} />
      <div className={classes.topic_content}>
        <div className={classes.topic_image}>
          <img src="/images/coverImage0101.svg" />
        </div>
        <div className={classes.topic_data}>
          <h3 className={classes.topic_heading1}>For SSC cgl student:</h3>
          <h3 className={classes.topic_heading2}>For SSC cgl student:</h3>
          <h3 className={classes.topic_heading3}>For SSC cgl student:</h3>
        </div>
      </div>
      <Card className={classes.topic_card}>
        <h4 className={classes.subHeading}>Courses to get you started</h4>
        <div className={classes.subsubheading}>Most Popular</div>
        <div className={classes.subsubheading}>Most Popular</div>
        <div className={classes.data}></div>
      </Card>
      <div>
        <h3 className={classes.heading}>
          Evaluate your skills with assessmenaltts
        </h3>
        <h3 className={classes.heading}>
          Identify your proficiency level and get content recommendations based
          on your results.
        </h3>
      </div>
      <Card>
        <img src="/images/analytics.svg" />
      </Card>
    </div>
  )
}

export default Topic
