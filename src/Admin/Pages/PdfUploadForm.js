// import React, { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import styles from './PdfUploadForm.module.css'; // Import your CSS module

// // Component definition
// const PdfUploadForm = ({ onUploadPdf }) => {
//   const [pdfFile, setPdfFile] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState('idle');

//   const handleFileChange = (e) => {
//     setPdfFile(e.target.files[0]);
//     setUploadStatus('idle');
//   };

//   const handleUpload = async () => {
//     if (pdfFile) {
//       setUploadStatus('uploading');
//       try {
//         const formData = new FormData();
//         formData.append('pdf', pdfFile);

//         const response = await fetch('http://localhost:8000/api/upload-pdf', {
//           method: 'POST',
//           body: formData,
//         });

//         if (response.ok) {
//           const data = await response.json();
//           console.log('PDF uploaded successfully!', data.s3Key);
//           toast.success('PDF uploaded successfully!');
//           setUploadStatus('success');
//           // You can handle additional logic after a successful upload, if needed
//           // onUploadPdf();
//         } else if (response.status === 409) {
//           toast.error('File already exists. Please upload a new file.');
//           setUploadStatus('error');
//         } else {
//           console.error('Failed to upload PDF');
//           toast.error('Error uploading PDF. Please try again.');
//           setUploadStatus('error');
//         }
//       } catch (error) {
//         console.error('Error uploading PDF:', error);
//         toast.error('Error uploading PDF. Please try again.');
//         setUploadStatus('error');
//       }

//       // Clear the form after upload
//       setPdfFile(null);
//     } else {
//       console.error('Please select a PDF file.');
//       toast.error('Please select a PDF file.');
//       setUploadStatus('error');
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.uploadSection}>
//         <h4>Upload PDF</h4>
//         <input
//           type="file"
//           accept="application/pdf"
//           onChange={handleFileChange}
//           className={styles.fileInput}
//         />
//         <button
//           onClick={handleUpload}
//           disabled={uploadStatus === 'uploading'}
//           className={styles.uploadButton}
//         >
//           Upload PDF
//         </button>
//       </div>

//       {uploadStatus === 'uploading' && <div className={styles.statusMessage}>Uploading...</div>}
//       {uploadStatus === 'success' && (
//         <div className={`${styles.statusMessage} ${styles.successStatus}`}>
//           PDF uploaded successfully!
//         </div>
//       )}
//       {uploadStatus === 'error' && (
//         <div className={`${styles.statusMessage} ${styles.errorStatus}`}>
//           File already exists. Please upload a new file.
//         </div>
//       )}
//       <ToastContainer />
//     </div>
//   );
// };

// // Export the component
// export default PdfUploadForm;

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './PdfUploadForm.module.css';

const PdfUploadForm = ({ onUploadPdf }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [courseId, setCourseId] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch the list of courses when the component mounts
    fetch('http://localhost:8000/api/courses')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
    setUploadStatus('idle');
  };

  const handleCourseChange = (e) => {
    setCourseId(e.target.value);
  };

  const handleUpload = async () => {
    if (pdfFile && courseId) {
      setUploadStatus('uploading');
      try {
        const formData = new FormData();
        formData.append('pdf', pdfFile);
        formData.append('courseId', courseId);

        const response = await fetch('http://localhost:8000/upload-pdf', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log('PDF uploaded successfully!', data.s3Key);
          toast.success('PDF uploaded successfully!');
          setUploadStatus('success');
          onUploadPdf(); // You can trigger additional logic after a successful upload
        } else if (response.status === 409) {
          toast.error('File already exists. Please upload a new file.');
          setUploadStatus('error');
        } else {
          console.error('Failed to upload PDF');
          toast.error('Error uploading PDF. Please try again.');
          setUploadStatus('error');
        }
      } catch (error) {
        console.error('Error uploading PDF:', error);
        toast.error('Error uploading PDF. Please try again.');
        setUploadStatus('error');
      } finally {
        setLoading(false);
      }
    } else {
      console.error('Please select both a PDF file and a Course.');
      toast.error('Please select both a PDF file and a Course.');
      setUploadStatus('error');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.uploadSection}>
        <h4>Upload PDF</h4>
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
      </div>

      {uploadStatus === 'uploading' && <div className={styles.statusMessage}>Uploading...</div>}
      {uploadStatus === 'success' && (
        <div className={`${styles.statusMessage} ${styles.successStatus}`}>
          PDF uploaded successfully!
        </div>
      )}
      {uploadStatus === 'error' && (
        <div className={`${styles.statusMessage} ${styles.errorStatus}`}>
          File already exists. Please upload a new file.
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default PdfUploadForm;

