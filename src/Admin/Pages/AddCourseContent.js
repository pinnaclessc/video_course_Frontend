import React from 'react'
import VideoUploadForm from './VideoUploadForm'
import PdfUploadForm from './PdfUploadForm'
import AddChapter from './AddChapter'
import AddTopicForm from './AddTopicForm'
import styles from "./CourseContent.module.css"

export default function AddCourseContent() {
  return (
    <div className={styles["course-content-wraper"]}>
      <div><h3>Add Course Content </h3></div>
      <div><VideoUploadForm/></div>
      <div><PdfUploadForm/></div>
      <div><AddChapter/></div>
      <div><AddTopicForm/></div>
    </div>
  )
}
