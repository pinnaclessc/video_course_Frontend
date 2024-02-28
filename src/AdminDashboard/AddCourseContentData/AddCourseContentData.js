import React from 'react';
import VideoUploadForm from '../VideoForm/VideoUpload';
import PdfUploadForm from '../../Admin/Pages/PdfUploadForm';
import AddChapter from '../AddChapterData/AddChapterData';
import AddTopicForm from '../AddTopicData/AddTopicData';
import styles from './AddCourseContentData.module.css';

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

    </div>
  );
}

