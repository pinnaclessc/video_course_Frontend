import React, { useState, useEffect, useRef } from 'react';
import styles from './PdfUploadData.module.css';

const PdfUploadForm = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [courses, setCourses] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('idle');
  const fileInputRef = useRef(null);

  // useEffect(() => {
  //   fetch('http://localhost:8000/courses')
  //     .then(response => response.json())
  //     .then(data => setCourses(data))
  //     .catch(error => console.error('Error fetching courses:', error));
  // }, []);

  useEffect(() => {
    fetch('https://videocoursebackend.ssccglpinnacle.com/courses')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
       
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          throw new Error('Data is not an array');
        }
      })
      .catch(error => {
        console.error('Error fetching courses or data format error:', error);
        setCourses([]); 
      });
  }, []);
  

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus('idle');
  };

  const handleCourseChange = (event) => {
    setSelectedCourseId(event.target.value);
  };

  const handleUpload = async () => {
    if (file && selectedCourseId) {
      setLoading(true);
      setUploadStatus('uploading');
      try {
        const formData = new FormData();
        formData.append('pdf', file);
        formData.append('courseId', selectedCourseId);

        const response = await fetch('http://localhost:8000/api/upload-pdf', {
          method: 'POST',
          body: formData,
        
        });  console.log(formData);

        if (response.ok) {
          const data = await response.json();
          setUploadStatus('success');
          resetFormState();
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

  const resetFormState = () => {
    setFile(null);
    setSelectedCourseId('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={styles.container}>
      <label htmlFor="courseSelect">Select a Course:</label>

      <select
        value={selectedCourseId}
        onChange={handleCourseChange}
        className={styles.courseSelect}
        required
      >
        <option value="">Select a Course</option>

        {courses.map((course) => (
          <option key={course._id} value={course._id}>{course.courseTitle}</option>
        ))}

      </select>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className={styles.fileInput}
        ref={fileInputRef}
      />

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
