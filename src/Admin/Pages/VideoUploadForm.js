import React, { useState, useEffect } from 'react';
import styles from './VideoUploadForm.module.css';

const VideoUploadForm = () => {
  const [file, setFile] = useState(null);
  const [courseId, setCourseId] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch the list of courses when the component mounts
    fetch('http://13.200.156.92:8000/api/courses')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus('idle');
  };

  const handleCourseChange = (e) => {
    setCourseId(e.target.value);
  };

  const handleUpload = async () => {
    if (file && courseId) {
      setUploadStatus('uploading');
      try {
        const formData = new FormData();
        formData.append('video', file);
        formData.append('courseId', courseId);

        const response = await fetch('http://13.200.156.92:8000/api/upload-video', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setUploadStatus('success');
        } else {
          console.error('Failed to upload Video');
          setUploadStatus('error');
        }
      } catch (error) {
        console.error('Error uploading Video:', error);
        setUploadStatus('error');
      } finally {
        setLoading(false);
      }
    } else {
      console.error('Please select both a Video file and a Course.');
      setUploadStatus('error');
    }
  };

  return (
    <div className={styles.container}>
       <select value={courseId} onChange={handleCourseChange} className={styles.courseSelect}>
        <option value="" disabled>Select a Course</option>
        {courses.map(course => (
          <option key={course._id} value={course._id}>{course.courseTitle}</option>
        ))}
      </select>
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className={styles.fileInput}
      />
     
      <button
        onClick={handleUpload}
        disabled={loading}
        className={styles.uploadButton}
      >
        Upload Video
      </button>
      {uploadStatus === 'uploading' && <div className={styles.uploadStatus}>Uploading...</div>}
      {uploadStatus === 'success' && <div className={styles.uploadStatusSuccess}>Video uploaded successfully!</div>}
      {uploadStatus === 'error' && <div className={styles.uploadStatusError}>Failed to upload Video.</div>}
    </div>
  );
};

export default VideoUploadForm;

