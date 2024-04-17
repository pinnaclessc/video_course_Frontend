import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from './VideoManager.module.css';

const VideoManager = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState('');
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    axios.get('https://videocoursebackend.ssccglpinnacle.com/courses')
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      axios.get(`https://videocoursebackend.ssccglpinnacle.com/api/videos/${selectedCourse}`)
        .then(response => setVideos(response.data))
        .catch(error => console.error('Error fetching videos:', error));
    }
  }, [selectedCourse]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedVideo && !file) {
      Swal.fire('Oops...', 'Please select a video to update or upload a new file!', 'error');
      return;
    }

    const formData = new FormData();
    if (file) {
      formData.append('video', file);
    }

    setIsUploading(true);

    try {
      const response = await axios({
        method: file ? 'post' : 'put', // Use POST if uploading a new file, PUT if updating
        url: file ? `https://videocoursebackend.ssccglpinnacle.com/videos` : `https://videocoursebackend.ssccglpinnacle.com/videos/${selectedVideo}`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      Swal.fire('Success!', 'Your video has been updated.', 'success');
      setIsUploading(false);
      fileInputRef.current.value = ''; // Reset file input
      setSelectedVideo(''); // Reset selected video if needed
    } catch (error) {
      console.error('Error updating video:', error);
      Swal.fire('Upload failed', 'There was a problem with the video operation.', 'error');
      setIsUploading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Select a Course:
          <select
            className={styles.select}
            value={selectedCourse}
            onChange={e => setSelectedCourse(e.target.value)}
            required
          >
            <option value="">Select a Course</option>
            {courses.map(course => (
              <option key={course._id} value={course._id}>{course.courseTitle}</option>
            ))}
          </select>
        </label>
        
        {videos.length > 0 && (
          <label className={styles.label}>
            Select a Video to Update (optional):
            <select
              className={styles.select}
              value={selectedVideo}
              onChange={e => setSelectedVideo(e.target.value)}
            >
              <option value="">None</option>
              {videos.map(video => (
                <option key={video._id} value={video._id}>{video.title}</option>
              ))}
            </select>
          </label>
        )}

        <label className={styles.label}>
          Upload New Video (optional):
          <input
            type="file"
            accept="video/*"
            className={styles.input}
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </label>
        
        <button type="submit" className={styles.button} disabled={isUploading}>
          {isUploading ? 'Processing...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default VideoManager;



// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import styles from './VideoManager.module.css';

// const VideoManager = () => {
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState('');
//   const [videos, setVideos] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState('');
//   const [file, setFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     axios.get('https://videocoursebackend.ssccglpinnacle.com/courses')
//       .then(response => setCourses(response.data))
//       .catch(error => console.error('Error fetching courses:', error));
//   }, []);

//   useEffect(() => {
//     if (selectedCourse) {
//       axios.get(`https://videocoursebackend.ssccglpinnacle.com/api/videos/${selectedCourse}`)
//         .then(response => setVideos(response.data))
//         .catch(error => console.error('Error fetching videos:', error));
//     }
//   }, [selectedCourse]);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!file || !selectedVideo) {
//       Swal.fire('Oops...', 'Please select a video and a file to upload!', 'error');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('video', file);

//     setIsUploading(true);

//     try {
//       await axios.put(`http://localhost:8000/videos`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       Swal.fire('Success!', 'Your video has been updated.', 'success');
//       setIsUploading(false);
//       fileInputRef.current.value = ''; // Reset file input
//     } catch (error) {
//       console.error('Error updating video:', error);
//       Swal.fire('Upload failed', 'There was a problem updating your video.', 'error');
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <label className={styles.label}>
//           Select a Course:
//           <select
//             className={styles.select}
//             value={selectedCourse}
//             onChange={e => setSelectedCourse(e.target.value)}
//             required
//           >
//             <option value="">Select a Course</option>
//             {courses.map(course => (
//               <option key={course._id} value={course._id}>{course.courseTitle}</option>
//             ))}
//           </select>
//         </label>
        
//         {videos.length > 0 && (
//           <label className={styles.label}>
//             Select a Video to Update:
//             <select
//               className={styles.select}
//               value={selectedVideo}
//               onChange={e => setSelectedVideo(e.target.value)}
//               required
//             >
//               <option value="">Select a Video</option>
//               {videos.map(video => (
//                 <option key={video._id} value={video._id}>{video.title}</option>
//               ))}
//             </select>
//           </label>
//         )}

//         <label className={styles.label}>
//           Upload New Video:
//           <input
//             type="file"
//             accept="video/*"
//             className={styles.input}
//             onChange={handleFileChange}
//             ref={fileInputRef}
//             required
//           />
//         </label>
        
//         <button type="submit" className={styles.button} disabled={isUploading}>
//           {isUploading ? 'Updating...' : 'Update Video'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default VideoManager;
