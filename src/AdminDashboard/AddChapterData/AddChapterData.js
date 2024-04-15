import React, { useState, useEffect } from 'react';
import styles from "./AddChapterData.module.css";

const ChapterForm = () => {
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

export default ChapterForm;
