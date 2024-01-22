<<<<<<< HEAD
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
=======
import React from 'react';
import VideoUploadForm from './VideoUploadForm';
import PdfUploadForm from './PdfUploadForm';
import AddChapter from './AddChapter';
import AddTopicForm from './AddTopicForm';
import styles from './AddCourseContent.module.css';

export default function AddCourseContent() {
  return (
    <div className={styles['AddCourseContent-container']}>
      <div className={styles['AddCourseContent-section']}>
        <div className={styles['AddCourseContent-section-header']}>Video Upload</div>
        <div className={styles['VideoUploadForm-container']}>
          <VideoUploadForm />
        </div>

        <div className={styles['AddCourseContent-section-header']}>PDF Upload</div>
        <div className={styles['PdfUploadForm-container']}>
          <PdfUploadForm />
        </div>
      </div>

      <div className={styles['AddCourseContent-section']}>
        <div className={styles['AddCourseContent-section-header']}>Add Chapter</div>
        <div className={styles['AddChapter-container']}>
          <AddChapter />
        </div>
      </div>

      <div className={styles['AddCourseContent-section']}>
        <div className={styles['AddCourseContent-section-header']}>Add Topic</div>
        <div className={styles['AddTopicForm-container']}>
          <AddTopicForm />
        </div>
      </div>
>>>>>>> 5e7176a7cd927d8f18fe271c4999aead3aa5c061
    </div>
  );
}

