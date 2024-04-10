import React from "react"
import MyLearning from "./components/MyLearningPage/MyLearning"
// import FilterComponents from "./components/BodyContent/FilteringSection/FilterComponent"
import MainContent from "./components/BodyContent/Main Content/MainContent"
import Header from "../Components/HomePage01/Header/Header"
import Footer from "../Footer02.js/Footer"
import styles from "./MyLearningMain.module.css"
import { useParams } from "react-router"

function MyLearningMain() {
  const { userId, course_id } = useParams();
  return (
    <>
    <div className={styles.main_container}>
    <Header/>
      <MyLearning />
      {/* <FilterComponents /> */}
      <MainContent userId={userId} course_id={course_id} />
      <Footer/>
      </div>
    </>
  )
}
export default MyLearningMain;
