import React from "react"
import MyLearning from "./components/MyLearningPage/MyLearning"
import FilterComponents from "./components/BodyContent/FilteringSection/FilterComponent"
import MainContent from "./components/BodyContent/Main Content/MainContent"
function MyLearningMain() {
  return (
    <>
      <MyLearning />
      <FilterComponents />
      <MainContent/>
    </>
  )
}
export default MyLearningMain
