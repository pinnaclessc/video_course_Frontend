import React, { useState, useEffect } from 'react';
import styles from './PdfUploadForm.module.css';

const PdfUploadForm = () => {
  const [file, setFile] = useState(null);
  const [courseId, setCourseId] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
// <<<<<<< HEAD
//     // Fetch the list of courses when the component mounts
// =======
// >>>>>>> 0724e504c7799da72b5426e048b66b697bdf6c90
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
        formData.append('pdf', file);
        formData.append('courseId', courseId);

        const response = await fetch('http://13.200.156.92:8000/api/upload-pdf', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setUploadStatus('success');
        } else {
          console.error('Failed to upload PDF');
          setUploadStatus('error');
        }
      } catch (error) {
        console.error('Error uploading PDF:', error);
        setUploadStatus('error');
      } finally {
        setLoading(false);
      }
    } else {
      console.error('Please select both a PDF file and a Course.');
      setUploadStatus('error');
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className={styles.fileInput}
      />
      <select value={courseId} onChange={handleCourseChange} className={styles.courseSelect}>
        <option value="" disabled>Select a Course</option>
        {courses.map(course => (
          <option key={course._id} value={course._id}>{course.courseTitle}</option>
        ))}
      </select>
      <button
        onClick={handleUpload}
        disabled={loading}
        className={styles.uploadButton}
      >
        Upload PDF
      </button>
      {uploadStatus === 'uploading' && <div className={styles.uploadStatus}>Uploading...</div>}
      {uploadStatus === 'success' && <div className={styles.uploadStatusSuccess}>PDF uploaded successfully!</div>}
      {uploadStatus === 'error' && <div className={styles.uploadStatusError}>Failed to upload PDF.</div>}
    </div>
  );
};

export default PdfUploadForm;





export default PdfUploadForm;



