import React, { useState, useEffect } from 'react';
import styles from './AddTopicData.module.css';

const AddTopicForm = () => {

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [selectedVideo, setSelectedVideo] = useState('');
  const [pdfTitle, setPdfTitle] = useState('');
  const [selectedPdf, setSelectedPdf] = useState('');
  const [availableVideos, setAvailableVideos] = useState([]);
  const [availablePdfs, setAvailablePdfs] = useState([]);

  // Fetch Courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://videocoursebackend.ssccglpinnacle.com/api/courses');
        const data = await response.json();
        setCourses(data);
        setSelectedCourse(data[0]?._id);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  // Fetch Chapters based on the selected course
  useEffect(() => {
    const fetchChapters = async () => {
      if (!selectedCourse) return;
      try {
        const response = await fetch(`https://videocoursebackend.ssccglpinnacle.com/api/chapters/course/${selectedCourse}`);
        const data = await response.json();
        setChapters(data);
        setSelectedChapter(data[0]?._id);
      } catch (error) {
        console.error('Error fetching chapters:', error);
      }
    };
    fetchChapters();
  }, [selectedCourse]);

  // Fetch Videos and PDFs based on the selected course
  useEffect(() => {
    const fetchResources = async () => {
      if (!selectedCourse) return;
      try {
        const videosResponse = await fetch(`https://videocoursebackend.ssccglpinnacle.com/api/videos/course/${selectedCourse}`);
        let videosData = await videosResponse.json();
        videosData = Array.isArray(videosData) ? videosData : [];
        setAvailableVideos(videosData);

        const pdfsResponse = await fetch(`https://videocoursebackend.ssccglpinnacle.com/api/pdfs/course/${selectedCourse}`);
        let pdfsData = await pdfsResponse.json();
        pdfsData = Array.isArray(pdfsData) ? pdfsData : [];
        setAvailablePdfs(pdfsData);
      } catch (error) {
        console.error('Error fetching resources:', error);
        setAvailableVideos([]);
        setAvailablePdfs([]);
      }
    };
    fetchResources();
  }, [selectedCourse]);

  // Handle Add Topic form submission
  const handleAddTopic = async () => {
    if (!selectedChapter || !videoTitle || !selectedVideo || !pdfTitle || !selectedPdf) {
      console.error('Incomplete data. Please fill in all required fields.');
      return;
    }

    const newTopic = {
      videoTitle,
      selectedVideo,
      pdfTitle,
      selectedPdf,
    };

    try {
      const response = await fetch(`https://videocoursebackend.ssccglpinnacle.com/api/chapters/${selectedChapter}/add-topic`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTopic),
      });

      if (!response.ok) {
        throw new Error('Failed to add topic');
      }
      console.log('Topic added successfully');
      window.alert('Topic added successfully!');

      setVideoTitle('');
      setSelectedVideo('');
      setPdfTitle('');
      setSelectedPdf('');

    } catch (error) {
      console.error('Error adding topic:', error);
      window.alert('Error adding topic. Please try again.');
    }
  };

  return (
    <div className={styles['topic-form']}>
      <h2 className={styles.formTitle}>Add New Topic</h2>

      {/* Course selection */}
      <label className={styles.label}>Select Course:</label>
      <select
        name="course"
        value={selectedCourse}
        className={styles.selectField}
        onChange={(e) => setSelectedCourse(e.target.value)}>
        <option value="" disabled style={{ color: 'gray' }}>Select the course</option>
        {courses.map((course) => (
          <option key={course._id} value={course._id}>{course.title}</option>
        ))}
      </select>

      {/* Chapter selection */}
      <label className={styles.label}>Select Chapter:</label>
      <select
        name="chapter"
        value={selectedChapter}
        className={styles.selectField}
        onChange={(e) => setSelectedChapter(e.target.value)}>
        <option value="" disabled style={{ color: 'gray' }}>Select the chapter</option>
        {chapters.map((chapter) => (
          <option key={chapter._id} value={chapter._id}>{chapter.chapterTitle}</option>
        ))}
      </select>

      {/* Video title input */}
      <label className={styles.label}>Video Title:</label>
      <input
        type="text"
        value={videoTitle}
        className={styles.inputField}
        onChange={(e) => setVideoTitle(e.target.value)}
        required
      />

      {/* Video selection */}
      <label className={styles.label}>Selected Video:</label>
      <select
        value={selectedVideo}
        className={styles.selectField}
        onChange={(e) => setSelectedVideo(e.target.value)}
        required>
        <option value="" disabled style={{ color: 'gray' }}>Select a Video</option>
        {availableVideos.map(video => (
          <option key={video._id} value={video._id}>{video.originalFilename}</option>
        ))}
      </select>

      {/* PDF title input */}
      <label className={styles.label}>PDF Title:</label>
      <input
        type="text"
        value={pdfTitle}
        className={styles.inputField}
        onChange={(e) => setPdfTitle(e.target.value)}
      />

      {/* PDF selection */}
      <label className={styles.label}>Select PDF:</label>
      <select
        value={selectedPdf}
        className={styles.selectField}
        onChange={(e) => setSelectedPdf(e.target.value)}>
        <option value="" disabled style={{ color: 'gray' }}>Select a PDF</option>
        {availablePdfs.map(pdf => (
          <option key={pdf._id} value={pdf._id}>{pdf.originalname}</option>
        ))}
      </select>

      <button type="button" onClick={handleAddTopic} className={styles.submitButton}>Add Topic</button>
    </div>
  );
};

export default AddTopicForm;
