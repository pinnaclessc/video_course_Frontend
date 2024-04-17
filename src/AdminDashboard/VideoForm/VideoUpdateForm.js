import React, { useState, useEffect } from 'react';
import styles from "./VideoManager.module.css";

const VideoUpdateForm = () => {
  const [chapterTitle, setChapterTitle] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [videos, setVideos] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [topics, setTopics] = useState([
    { videoTitle: '', selectedVideo: '', selectedPdf: '' }
  ]);

  // Combined useEffect for fetching data
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://videocoursebackend.ssccglpinnacle.com/courses');
        const data = await response.json();
        setCourses(data);
        console.log("COURSES", data)
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
  
    fetchCourses();
  }, []);
  
  // useEffect(() => {
  //   const fetchVideosAndPdfs = async () => {
  //     if (!selectedCourse) return;
  
  //     try {
  //       const videosResponse = await fetch(`https://videocoursebackend.ssccglpinnacle.com/api/videos/${selectedCourse}`);
  //       const videosData = await videosResponse.json();
  //       setVideos(videosData);
  
  //       const pdfsResponse = await fetch(`https://videocoursebackend.ssccglpinnacle.com/api/pdfs/course/${selectedCourse}`);
  //       const pdfsData = await pdfsResponse.json();
  //       setPdfs(pdfsData);
  //     } catch (error) {
  //       console.error('Error fetching videos/pdfs:', error);
  //     }
  //   };
  
  //   fetchVideosAndPdfs();
  // }, [selectedCourse]);

  useEffect(() => {
    const fetchVideosAndPdfs = async () => {
      if (!selectedCourse) return;
  
      try {
        const videosResponse = await fetch(`https://videocoursebackend.ssccglpinnacle.com/api/videos/${selectedCourse}`);
        const videosData = await videosResponse.json();
        setVideos(videosData);
        console.log("VIDEODATA",videosData)
  
        const pdfsResponse = await fetch(`https://videocoursebackend.ssccglpinnacle.com/api/pdfs/course/${selectedCourse}`);
        const pdfsData = await pdfsResponse.json();
        // Assuming each item in pdfsData includes the cloudFrontUrl
        setPdfs(pdfsData);
        console.log("PDFDATA",videosData)
      } catch (error) {
        console.error('Error fetching videos/pdfs:', error);
      }
    };
  
    fetchVideosAndPdfs();
  }, [selectedCourse]);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    const chapterData = {
      chapterTitle,
      course: selectedCourse,
      topics
    };

    fetch('https://videocoursebackend.ssccglpinnacle.com/api/chapters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chapterData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); 
    })
    .then(data => {
      alert('Chapter successfully uploaded!');
      console.log('Success:', data);
    })
    .catch((error) => {
      alert('Error posting chapter: ' + error.message);
      console.error('Error:', error);
    });
  };

  const handleTopicChange = (index, field, value) => {
    const newTopics = topics.map((topic, i) => {
      if (i === index) {
        return { ...topic, [field]: value };
      }
      return topic;
    });
    setTopics(newTopics);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.formTitle}>Create New Chapter</h2>

      <label htmlFor="course" className={styles.label}>Course:</label>
      <select
        id="course"
        value={selectedCourse}
        className={styles.selectField}
        onChange={(e) => setSelectedCourse(e.target.value)}
        required
      >
        <option value="" disabled style={{ color: 'gray' }}>Select a Course</option>
        {courses.map((course) => (
          <option key={course._id} value={course._id}>{course.courseTitle}</option>
        ))}
      </select>
      
      <label htmlFor="chapterTitle" className={styles.label}>Chapter Title:</label>
      <input
        type="text"
        id="chapterTitle"
        className={styles.inputField}
        value={chapterTitle}
        onChange={(e) => setChapterTitle(e.target.value)}
        required
      />

      {topics.map((topic, index) => (
        <div key={index}>
          <label className={styles.label}>Video Title:</label>
          <input
            type="text"
            value={topic.videoTitle}
            className={styles.inputField}
            onChange={(e) => handleTopicChange(index, 'videoTitle', e.target.value)}
            required
          />

          <label className={styles.label}>Selected Video:</label>
          <select
            value={topic.selectedVideo}
            className={styles.selectField}
            onChange={(e) => handleTopicChange(index, 'selectedVideo', e.target.value)}
            required
          >
            <option value="" disabled style={{ color: 'gray' }}>Select a Video</option>
            {videos.map(video=> (
          <option key={video._id} value={video._id}>{video.originalFilename}</option>
        ))}
          </select>

          <label className={styles.label}>Pdf Title:</label>
          <input
            type="text"
            value={topic.pdfTitle}
            className={styles.inputField}
            onChange={(e) => handleTopicChange(index, 'pdfTitle', e.target.value)}
            required
          />

          <label className={styles.label}>Selected PDF:</label>
          <select
            value={topic.selectedPdf}
            className={styles.selectField}
            onChange={(e) => handleTopicChange(index, 'selectedPdf', e.target.value)}
            required
          >
            <option value="" disabled style={{ color: 'gray' }}>Select a PDF</option>
            {pdfs.map(pdf => (
              <option key={pdf._id} value={pdf._id}>{pdf.originalname}</option>
            ))}
          </select>
        </div>
      ))}

      <button type="submit" className={styles.submitButton}>Submit Chapter</button>
    </form>
  );
};

export default VideoUpdateForm;


// import React, { useState, useEffect } from 'react';
// import styles from './VideoManager.module.css';

// const VideoUpdateForm = ({ topicId }) => {
//   const [videoTitle, setVideoTitle] = useState('');
//   const [selectedVideo, setSelectedVideo] = useState('');
//   const [pdfTitle, setPdfTitle] = useState('');
//   const [selectedPdf, setSelectedPdf] = useState('');
//   const [availableVideos, setAvailableVideos] = useState([]);
//   const [availablePdfs, setAvailablePdfs] = useState([]);

//   useEffect(() => {
//     const fetchTopicDetails = async () => {
//       try {
//         const response = await fetch(`https://videocoursebackend.ssccglpinnacle.com/api/topics/${topicId}`);
//         const data = await response.json();
//         setVideoTitle(data.videoTitle);
//         setSelectedVideo(data.selectedVideo);
//         setPdfTitle(data.pdfTitle);
//         setSelectedPdf(data.selectedPdf);
//       } catch (error) {
//         console.error('Error fetching topic details:', error);
//       }
//     };
//     fetchTopicDetails();
//   }, [topicId]);

//   useEffect(() => {
//     const fetchResources = async () => {
//       try {
//         const videosResponse = await fetch('https://videocoursebackend.ssccglpinnacle.com/api/videos');
//         let videosData = await videosResponse.json();
//         videosData = Array.isArray(videosData) ? videosData : [];
//         setAvailableVideos(videosData);

//         const pdfsResponse = await fetch('https://videocoursebackend.ssccglpinnacle.com/api/pdfs');
//         let pdfsData = await pdfsResponse.json();
//         pdfsData = Array.isArray(pdfsData) ? pdfsData : [];
//         setAvailablePdfs(pdfsData);
//       } catch (error) {
//         console.error('Error fetching resources:', error);
//         setAvailableVideos([]);
//         setAvailablePdfs([]);
//       }
//     };
//     fetchResources();
//   }, []);

//   const handleUpdateTopic = async () => {
//     const updatedTopic = {
//       videoTitle,
//       selectedVideo,
//       pdfTitle,
//       selectedPdf,
//     };

//     try {
//       const response = await fetch(`https://videocoursebackend.ssccglpinnacle.com/api/topics/${topicId}/update`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedTopic),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update topic');
//       }
//       console.log('Topic updated successfully');
//       window.alert('Topic updated successfully!');
//     } catch (error) {
//       console.error('Error updating topic:', error);
//       window.alert('Error updating topic. Please try again.');
//     }
//   };

//   return (
//     <div className={styles['topic-form']}>
//       <h2 className={styles.formTitle}>Update Topic</h2>

//       {/* Video title input */}
//       <label className={styles.label}>Video Title:</label>
//       <input
//         type="text"
//         value={videoTitle}
//         className={styles.inputField}
//         onChange={(e) => setVideoTitle(e.target.value)}
//         required
//       />

//       {/* Video selection */}
//       <label className={styles.label}>Selected Video:</label>
//       <select
//         value={selectedVideo}
//         className={styles.selectField}
//         onChange={(e) => setSelectedVideo(e.target.value)}
//         required>
//         <option value="" disabled>Select a Video</option>
//         {availableVideos.map(video => (
//           <option key={video._id} value={video._id}>{video.originalFilename}</option>
//         ))}
//       </select>

//       {/* PDF title input */}
//       <label className={styles.label}>PDF Title:</label>
//       <input
//         type="text"
//         value={pdfTitle}
//         className={styles.inputField}
//         onChange={(e) => setPdfTitle(e.target.value)}
//       />

//       {/* PDF selection */}
//       <label className={styles.label}>Select PDF:</label>
//       <select
//         value={selectedPdf}
//         className={styles.selectField}
//         onChange={(e) => setSelectedPdf(e.target.value)}>
//         <option value="" disabled>Select a PDF</option>
//         {availablePdfs.map(pdf => (
//           <option key={pdf._id} value={pdf._id}>{pdf.originalname}</option>
//         ))}
//       </select>

//       <button type="button" onClick={handleUpdateTopic} className={styles.submitButton}>Update Topic</button>
//     </div>
//   );
// };

// export default VideoUpdateForm;




// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import styles from './VideoManager.module.css';

// function VideoUpdateForm() {
//     const [courses, setCourses] = useState([]);
//     const [selectedCourseId, setSelectedCourseId] = useState('');
//     const [videos, setVideos] = useState([]);
//     const [selectedVideoId, setSelectedVideoId] = useState('');
//     const [file, setFile] = useState(null);
//     const [isUploading, setIsUploading] = useState(false);
//     const fileInputRef = useRef(null);

//     useEffect(() => {
//         axios.get('https://videocoursebackend.ssccglpinnacle.com/courses')
//             .then(response => {
//                 setCourses(response.data);
//             })
//             .catch(error => console.error('Error fetching courses:', error));
//     }, []);

//     useEffect(() => {
//         if (selectedCourseId) {
//             axios.get(`https://videocoursebackend.ssccglpinnacle.com/api/videos/${selectedCourseId}`)
//                 .then(response => {
//                     setVideos(response.data);
//                 })
//                 .catch(error => console.error('Error fetching videos:', error));
//         }
//     }, [selectedCourseId]);

//     const handleCourseChange = (event) => {
//         setSelectedCourseId(event.target.value);
//         setSelectedVideoId(''); // Reset video selection when course changes
//     };

//     const handleVideoChange = (event) => {
//         setSelectedVideoId(event.target.value);
//         if (fileInputRef.current) {
//             fileInputRef.current.value = '';
//         }
//         setFile(null);  // Reset file if video is selected
//     };

//     const handleFileChange = (event) => {
//         setFile(event.target.files[0]);
//         setSelectedVideoId(''); // Reset video selection if file is chosen
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         if (!selectedVideoId && !file) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: 'Please select a video or upload a file to update!',
//             });
//             return;
//         }

//         const formData = new FormData();
//         if (file) {
//             formData.append('video', file);
//         }

//         setIsUploading(true);

//         try {
//             const method = file ? 'post' : 'put';
//             const url = file ? `https://videocoursebackend.ssccglpinnacle.com/videos` : `https://videocoursebackend.ssccglpinnacle.com/videos/${selectedVideoId}`;

//             await axios({
//                 method: method,
//                 url: url,
//                 data: formData,
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             Swal.fire('Success!', 'Your video has been successfully updated.', 'success');
//             setIsUploading(false);
//             fileInputRef.current.value = ''; // Reset file input
//             setSelectedVideoId(''); // Reset selected video
//         } catch (error) {
//             console.error('Error updating video:', error);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Update failed',
//                 text: 'There was a problem with the video update.',
//             });
//             setIsUploading(false);
//         }
//     };

//     return (
//         <div className={styles.formcontainer}>
//             <form onSubmit={handleSubmit} className={styles.form}>
//                 <label htmlFor="courseSelect">Select a Course:</label>
//                 <select
//                     value={selectedCourseId}
//                     onChange={handleCourseChange}
//                     className={styles.select}
//                     required
//                 >
//                     <option value="">Select a Course</option>
//                     {courses.map((course) => (
//                         <option key={course._id} value={course._id}>{course.courseTitle}</option>
//                     ))}
//                 </select>

//                 {videos.length > 0 && (
//                     <div>
//                         <label htmlFor="videoSelect">Select a Video (optional):</label>
//                         <select
//                             value={selectedVideoId}
//                             onChange={handleVideoChange}
//                             className={styles.select}
//                         >
//                             <option value="">Select a Video</option>
//                             {videos.map((video) => (
//                                 <option key={video._id} value={video._id}>{video.originalFilename}</option>
//                             ))}
//                         </select>
//                     </div>
//                 )}

//                 <label htmlFor="videoInput">Upload New Video (optional):</label>
//                 <input
//                     type="file"
//                     accept="video/*"
//                     onChange={handleFileChange}
//                     className={styles.input}
//                     ref={fileInputRef}
//                 />

//                 <button type="submit" className={styles.button} disabled={isUploading}>
//                     {isUploading ? 'Updating...' : 'Update Video'}
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default VideoUpdateForm;


// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import styles from './VideoManager.module.css';

// function VideoUpdateForm() {
//     const [courses, setCourses] = useState([]);
//     const [selectedCourseId, setSelectedCourseId] = useState('');
//     const [videos, setVideos] = useState([]);
//     const [selectedVideoId, setSelectedVideoId] = useState('');
//     const [file, setFile] = useState(null);
//     const [isUploading, setIsUploading] = useState(false);
//     const fileInputRef = useRef(null);

//     useEffect(() => {
//         axios.get('https://videocoursebackend.ssccglpinnacle.com/courses')
//             .then(response => {
//                 setCourses(response.data);
//             })
//             .catch(error => console.error('Error fetching courses:', error));
//     }, []);

//     useEffect(() => {
//         if (selectedCourseId) {
//             axios.get(`https://videocoursebackend.ssccglpinnacle.com/api/videos/${selectedCourseId}`)
//                 .then(response => {
//                     setVideos(response.data);
//                 })
//                 .catch(error => console.error('Error fetching videos:', error));
//         }
//     }, [selectedCourseId]);

//     const handleCourseChange = (event) => {
//         setSelectedCourseId(event.target.value);
//         setSelectedVideoId(''); // Reset video selection when course changes
//     };

//     const handleVideoChange = (event) => {
//         setSelectedVideoId(event.target.value);
//     };

//     const handleFileChange = (event) => {
//         setFile(event.target.files[0]);
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         if (!selectedVideoId || !file) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: 'Please select a video and a file to upload!',
//             });
//             return;
//         }

//         const formData = new FormData();
//         formData.append('video', file);

//         setIsUploading(true);

//         try {
//             await axios.put(`https://videocoursebackend.ssccglpinnacle.com/videos/${selectedVideoId}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             Swal.fire('Updated!', 'Your video has been updated successfully.', 'success');
//             setIsUploading(false);
//             fileInputRef.current.value = ''; // Reset file input
//         } catch (error) {
//             console.error('Error updating video:', error);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Update failed',
//                 text: 'There was a problem updating your video.',
//             });
//             setIsUploading(false);
//         }
//     };

//     return (
//         <div className={styles.formcontainer}>
//             <form onSubmit={handleSubmit} className={styles.form}>
//                 <label htmlFor="courseSelect">Select a Course:</label>
//                 <select
//                     value={selectedCourseId}
//                     onChange={handleCourseChange}
//                     className={styles.select}
//                     required
//                 >
//                     <option value="">Select a Course</option>
//                     {courses.map((course) => (
//                         <option key={course._id} value={course._id}>{course.courseTitle}</option>
//                     ))}
//                 </select>
    
//                 {videos.length > 0 && (
//                     <>
//                         <label htmlFor="videoSelect">Select a Video:</label>
//                         <select
//                             value={selectedVideoId}
//                             onChange={handleVideoChange}
//                             className={styles.select}
//                             required
//                         >
//                             <option value="">Select a Video</option>
//                             {videos.map((video) => (
//                                 <option key={video._id} value={video._id}>{video.originalFilename}</option>
//                             ))}
//                         </select>
//                     </>
//                 )}
    
//                 <label htmlFor="videoInput">Upload Video:</label>
//                 <input
//                     type="file"
//                     accept="video/*"
//                     onChange={handleFileChange}
//                     className={styles.input}
//                     ref={fileInputRef}
//                     required
//                 />
    
//                 <button type="submit" className={styles.button} disabled={isUploading}>
//                     {isUploading ? 'Updating...' : 'Update Video'}
//                 </button>
//             </form>
//         </div>
//     );
    
// }

// export default VideoUpdateForm;
