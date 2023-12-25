import React, { useState } from "react"
import Loading from "../BodyContent/ProgresBar"
import classes from "./MyLearningHover.module.css"
import data from "./data.json"
import Card from "../BodyContent/Card/Card"
import { NavLink } from "react-router-dom"

export default function MyLearning() {
  const [showCard, setShowCard] = useState(false)

  const handleMouseEnter = () => {
    setShowCard(true)
  }

  const handleMouseLeave = () => {
    setShowCard(false)
  }

  return (
    <>
      <div
        className={classes.dropdown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button className={classes.mylearning_btn}> My Learning</button>
        {showCard && (
          <Card className={classes.card}>
            <div className={classes.dropdown}>
              <div className={classes.heading}>
                <div className={classes.courses_para}>Courses</div>
                <NavLink to="/">
                  <div className={classes.mylearn_para}> My Learning</div>
                </NavLink>
              </div>
              <div className={classes.dropdown_content}>
                {data.map((course) => (
                  <React.Fragment key={course.id}>
                    <div className={classes.myLearningContainer}>
                      <div className={classes.card_img_container}>
                        <img src={course.image} alt="" width="80" height="80" />
                        <img
                          src={course.imageUrl}
                          alt=""
                          width="80"
                          height="80"
                        />
                      </div>

                      <div className={classes.myLearning_Description}>
                        {course.title}
                        <div className={classes.myLearning_progress}>
                          <Loading />
                        </div>
                      </div>
                    </div>
                    <hr className={classes.hr} />
                  </React.Fragment>
                ))}
                <NavLink to="/">
                  <div className={classes.GotoMyLearinig_div}>
                    <button className={classes.GotoMyLearinig_btn}>
                      Go to my learning
                    </button>
                  </div>
                </NavLink>
              </div>
            </div>
          </Card>
        )}
      </div>
    </>
  )
}
