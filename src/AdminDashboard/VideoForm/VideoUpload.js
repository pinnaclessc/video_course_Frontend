// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import styles from './VideoUpload.module.css';

// function VideoUploadForm() {
//     const [file, setFile] = useState(null);
//     const [courses, setCourses] = useState([]);
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [selectedCourseId, setSelectedCourseId] = useState('');
//     const [uploadProgress, setUploadProgress] = useState(0);
//     const [isUploading, setIsUploading] = useState(false);
//     const fileInputRef = useRef(null);

//     useEffect(() => {
//         axios.get('http:://localhost:8000/courses')
//             .then(response => {
//                 setCourses(response.data);
//             })
//             .catch(error => console.error('Error fetching courses:', error));
//     }, []);

//     const handleFileChange = (event) => {
//         setFile(event.target.files[0]);
//     };

//     const handleCourseChange = (event) => {
//         setSelectedCourseId(event.target.value);
//     };

//     const resetFormState = () => {
//         setFile(null);
//         setSelectedCourseId('');
//         setUploadProgress(0);
//         setIsUploading(false);
//         setIsProcessing(false);
//         if (fileInputRef.current) {
//             fileInputRef.current.value = '';
//         }
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         if (!file || !selectedCourseId) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: 'Please select a course and a video file first!',
//             });
//             return;
//         }

//         const formData = new FormData();
//         formData.append('video', file);
//         formData.append('courseId', selectedCourseId);

//         setIsUploading(true);

//         Swal.fire({
//             title: 'Uploading...',
//             html: 'Please wait while your video is being processed',
//             allowOutsideClick: false,
//             didOpen: () => {
//                 Swal.showLoading();
//             },
//         });

//         try {
//             await axios.post('http:://localhost:8000/upload', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//                 onUploadProgress: (progressEvent) => {
//                     const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                     setUploadProgress(percentCompleted);
//                 },
//             });
//         // try {
//         //     await axios.post('http:://localhost:8000/upload', formData, {
//         //         headers: {
//         //             'Content-Type': 'multipart/form-data',
//         //         },
//         //         timeout: 7200000, // Timeout set to 2 hours
//         //         onUploadProgress: (progressEvent) => {
//         //             const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//         //             setUploadProgress(percentCompleted);
//         //         },
//         //     });



//             setIsUploading(false);
//             setIsProcessing(true);

//             Swal.fire({
//                 title: 'Processing...',
//                 html: 'Your video is being uploaded',
//                 allowOutsideClick: false,
//                 didOpen: () => {
//                     Swal.showLoading();
//                 },
//             });

//             setTimeout(() => {
//                 setIsProcessing(false);
//                 Swal.fire('Uploaded!', 'Your video has been uploaded and processed successfully.', 'success');
//                 resetFormState();
//             }, 7200000);

//         } catch (error) {
//             setIsUploading(false);
//             setIsProcessing(false);
//             console.error('Error uploading video:', error);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Upload failed',
//                 text: 'There was a problem uploading your video.',
//             });
//         }
//     };

//     return (
//         <div className={styles.formcontainer}>
//             <form onSubmit={handleSubmit} className={styles.formcontainer} aria-labelledby="videoUploadForm">
//                 <label htmlFor="courseSelect">Select a Course:</label>
//                 <select
//                     value={selectedCourseId}
//                     onChange={handleCourseChange}
//                     className={styles.select}
//                     required
//                     aria-required="true"
//                 >
//                     <option value="">Select a Course</option>
//                     {courses.map((course) => (
//                         <option key={course._id} value={course._id}>{course.courseTitle}</option>
//                     ))}
//                 </select>
//                 <label className={styles.label}>
//                     Upload video:
//                     <input
//                         type="file"
//                         accept="video/*"
//                         onChange={handleFileChange}
//                         className={styles.input}
//                         id="videoInput"
//                         ref={fileInputRef}
//                         required
//                         aria-required="true"
//                     />
//                 </label>
//                 {uploadProgress > 0 && (
//                     <div className={styles.progressContainer} aria-live="polite">
//                         <div className={styles.progressBar} style={{ width: `${uploadProgress}%` }}>
//                             {uploadProgress}%
//                         </div>
//                     </div>
//                 )}
//                 <button type="submit" className={styles.button} disabled={isUploading || isProcessing}>
//                     {isUploading || isProcessing ? 'Processing...' : 'Upload Video'}
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default VideoUploadForm;
// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import styles from './VideoUpload.module.css';

// function VideoUploadForm() {
//     const [file, setFile] = useState(null);
//     const [courses, setCourses] = useState([]);
//     const [selectedCourseId, setSelectedCourseId] = useState('');
//     const [uploadProgress, setUploadProgress] = useState(0);
//     const [isUploading, setIsUploading] = useState(false);
//     const fileInputRef = useRef(null);

//     useEffect(() => {
//         axios.get('https://videocoursebackend.ssccglpinnacle.com/courses')
//             .then(response => {
//                 setCourses(response.data);
//             })
//             .catch(error => console.error('Error fetching courses:', error));
//     }, []);

//     const handleFileChange = (event) => {
//         setFile(event.target.files[0]);
//     };

//     const handleCourseChange = (event) => {
//         setSelectedCourseId(event.target.value);
//     };

//     const resetFormState = () => {
//         setFile(null);
//         setSelectedCourseId('');
//         setUploadProgress(0);
//         setIsUploading(false);
//         if (fileInputRef.current) {
//             fileInputRef.current.value = '';
//         }
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         if (!file || !selectedCourseId) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: 'Please select a course and a video file first!',
//             });
//             return;
//         }

//         const formData = new FormData();
//         formData.append('video', file);
//         formData.append('courseId', selectedCourseId);

//         setIsUploading(true);

//         try {
//             await axios.post('http://localhost:8000/upload', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//                 timeout: 7200000,
//                 onUploadProgress: (progressEvent) => {
//                     const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                     setUploadProgress(percentCompleted);
//                 },
//             });

//             setIsUploading(false);
//             Swal.fire('Uploaded!', 'Your video has been uploaded and is being processed.', 'success');
//             resetFormState();
//         } catch (error) {
//             setIsUploading(false);
//             console.error('Error uploading video:', error);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Upload failed',
//                 text: 'There was a problem uploading your video.',
//             });
//         }
//     };

//     return (
//         <div className={styles.formcontainer}>
//             <form onSubmit={handleSubmit} className={styles.formcontainer} aria-labelledby="videoUploadForm">
//                 <label htmlFor="courseSelect">Select a Course:</label>
//                 <select
//                     value={selectedCourseId}
//                     onChange={handleCourseChange}
//                     className={styles.select}
//                     required
//                     aria-required="true"
//                 >
//                     <option value="">Select a Course</option>
//                     {courses.map((course) => (
//                         <option key={course._id} value={course._id}>{course.courseTitle}</option>
//                     ))}
//                 </select>
//                 <label className={styles.label}>
//                     Upload video:
//                     <input
//                         type="file"
//                         accept="video/*"
//                         onChange={handleFileChange}
//                         className={styles.input}
//                         id="videoInput"
//                         ref={fileInputRef}
//                         required
//                         aria-required="true"
//                     />
//                 </label>
//                 {uploadProgress > 0 && (
//                     <div className={styles.progressContainer} aria-live="polite">
//                         <div className={styles.progressBar} style={{ width: `${uploadProgress}%` }}>
//                             {uploadProgress}%
//                         </div>
//                     </div>
//                 )}
//                 <button type="submit" className={styles.button} disabled={isUploading}>
//                     {isUploading ? 'Uploading...' : 'Upload Video'}
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default VideoUploadForm;

/////////////////////////////////WORKING////////////////////////////////////////////
// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import styles from './VideoUpload.module.css';

// function VideoUploadForm() {
//     const [file, setFile] = useState(null);
//     const [courses, setCourses] = useState([]);
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [selectedCourseId, setSelectedCourseId] = useState('');
//     const [uploadProgress, setUploadProgress] = useState(0);
//     const [isUploading, setIsUploading] = useState(false);
//     const fileInputRef = useRef(null);

//     useEffect(() => {
//         axios.get('http://localhost:8000/courses')
//             .then(response => {
//                 setCourses(response.data);
//             })
//             .catch(error => console.error('Error fetching courses:', error));
//     }, []);

//     const handleFileChange = (event) => {
//         setFile(event.target.files[0]);
//     };

//     const handleCourseChange = (event) => {
//         setSelectedCourseId(event.target.value);
//     };

//     const resetFormState = () => {
//         setFile(null);
//         setSelectedCourseId('');
//         setUploadProgress(0);
//         setIsUploading(false);
//         setIsProcessing(false);
//         if (fileInputRef.current) {
//             fileInputRef.current.value = '';
//         }
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         if (!file) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: 'Please select a video file first!',
//             });
//             return;
//         }

//         const formData = new FormData();
//         formData.append('video', file);

//         try {
//             setIsUploading(true);

//             // Show uploading popup
//             Swal.fire({
//                 title: 'Uploading...',
//                 text: 'Please wait while your video is being uploaded',
//                 allowOutsideClick: false,
//                 didOpen: () => {
//                     Swal.showLoading();
//                 }
//             });

//             const response = await axios.post('http://localhost:8000/upload', formData, {
//                 onUploadProgress: progressEvent => {
//                     // Optional: handle progress
//                     const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                     console.log(`${percentCompleted}%`);
//                 }
//             });

//             // Assuming the upload is now complete, show processing dialog
//             Swal.fire({
//                 title: 'Processing...',
//                 text: 'Please wait while your video is being processed',
//                 allowOutsideClick: false,
//                 didOpen: () => {
//                     Swal.showLoading();
//                 }
//             });

//             // Simulate a processing delay or check for processing status if applicable
//             await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate delay

//             // Processing done
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Done!',
//                 text: 'Your video has been processed successfully!',
//             });

//         } catch (error) {
//             console.error('Error during the upload or processing:', error);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Failed to upload',
//                 text: 'There was a problem uploading or processing your video.',
//             });
//         } finally {
//             setIsUploading(false);
//         }
//     };
//     return (
//         <div className={styles.formcontainer}>
//             <form onSubmit={handleSubmit} className={styles.formcontainer} aria-labelledby="videoUploadForm">
//                 <label htmlFor="courseSelect">Select a Course:</label>
//                 <select
//                     value={selectedCourseId}
//                     onChange={handleCourseChange}
//                     className={styles.select}
//                     required
//                     aria-required="true"
//                 >
//                     <option value="">Select a Course</option>
//                     {courses.map((course) => (
//                         <option key={course._id} value={course._id}>{course.courseTitle}</option>
//                     ))}
//                 </select>
//                 <label className={styles.label}>
//                     Upload video:
//                     <input
//                         type="file"
//                         accept="video/*"
//                         onChange={handleFileChange}
//                         className={styles.input}
//                         id="videoInput"
//                         ref={fileInputRef}
//                         required
//                         aria-required="true"
//                     />
//                 </label>
//                 {uploadProgress > 0 && (
//                     <div className={styles.progressContainer} aria-live="polite">
//                         <div className={styles.progressBar} style={{ width: `${uploadProgress}%` }}>
//                             {uploadProgress}%
//                         </div>
//                     </div>
//                 )}
//                 <button type="submit" className={styles.button} disabled={isUploading || isProcessing}>
//                     {isUploading || isProcessing ? 'Processing...' : 'Upload Video'}
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default VideoUploadForm;


import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from './VideoUpload.module.css';

function VideoUploadForm() {
    const [file, setFile] = useState(null);
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:8000/courses')
            .then(response => setCourses(response.data))
            .catch(error => console.error('Error fetching courses:', error));
    }, []);

    const handleFileChange = event => {
        setFile(event.target.files[0]);
    };

    const resetForm = () => {
        setFile(null);
        setSelectedCourseId('');
        setIsUploading(false);
       
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleCourseChange = event => {
        setSelectedCourseId(event.target.value);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        if (!file || !selectedCourseId) {
            Swal.fire('Error', 'Please select a course and video file.', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('video', file);
        formData.append('courseId', selectedCourseId);

        try {
            setIsUploading(true);
            Swal.fire({
                title: 'Uploading...',
                text: 'Please have patience your video is being processed to upload.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const response = await axios.post('https://videocoursebackend.ssccglpinnacle.com/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            Swal.close();
            Swal.fire('Success', 'Your video has been uploaded.', 'success');
            resetForm();
        } catch (error) {
            console.error('Upload error:', error);
            Swal.fire('Error', error.response?.data?.error || 'Failed to upload video.', 'error');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className={styles.formContainer}>
            
            <form onSubmit={handleSubmit} className={styles.formcontainer} >
            <h2 className={styles.formTitle}>Add New Video</h2>
                <label htmlFor="courseSelect">Select a Course:</label>
                <select
                    id="courseSelect"
                    value={selectedCourseId}
                    onChange={handleCourseChange}
                    className={styles.courseSelect}
                    required
                >
                     <option value="" disabled style={{ color: 'gray' }}>Select a Course</option>
                    {courses.map(course => (
                        <option key={course._id} value={course._id}>
                            {course.courseTitle}
                        </option>
                    ))}
                </select>

                <label htmlFor="videoInput">Upload video:</label>

                <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                    id="videoInput"
                    ref={fileInputRef}
                    required
                />

                <button type="submit" className={styles.uploadButton} disabled={isUploading}>
                    {isUploading ? 'Uploading...' : 'Upload Video'}
                </button>

            </form>
        </div>
    );
}

export default VideoUploadForm;

