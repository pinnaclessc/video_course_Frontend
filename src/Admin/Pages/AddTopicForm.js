import React, { useState, useEffect } from 'react';
import styles from './AddTopicForm.module.css';

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
  const [availablePdfs, setAvailablePdfs] = useState([]); // Initialize as an empty array

  useEffect(() => {
    // Fetch the list of courses
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/courses');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCourses(data);

        // Select the first course by default
        if (data.length > 0) {
          setSelectedCourse(data[0]._id);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    // Fetch chapters based on the selected course
    const fetchChapters = async () => {
      if (!selectedCourse) return;

      try {
        const response = await fetch(`http://localhost:8000/vc/api/chapters/${selectedCourse}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setChapters(data);

        // Select the first chapter by default
        if (data.length > 0) {
          setSelectedChapter(data[0]._id);
        }
      } catch (error) {
        console.error('Error fetching chapters:', error);
      }
    };

    fetchChapters();
  }, [selectedCourse]);

  useEffect(() => {
    // Fetch videos and PDFs based on the selected course
    const fetchVideosAndPdfs = async () => {
      if (!selectedCourse) return;

      try {
        const videosResponse = await fetch(`http://localhost:8000/api/videos/${selectedCourse}`);
        if (!videosResponse.ok) {
          throw new Error(`HTTP error! Status: ${videosResponse.status}`);
        }
        const videosData = await videosResponse.json();
        setAvailableVideos(videosData);

        const pdfsResponse = await fetch(`http://localhost:8000/api/pdfs/${selectedCourse}`);
  

        if (!pdfsResponse.ok) {
          throw new Error(`HTTP error! Status: ${pdfsResponse.status}`);
        }
        const pdfsData = await pdfsResponse.json();
        setAvailablePdfs(pdfsData);
      } catch (error) {
        console.error('Error fetching videos and PDFs:', error);
      }
    };

    fetchVideosAndPdfs();
  }, [selectedCourse]);

  const handleAddTopic = async () => {
    // Validate inputs
    if (!selectedCourse || !selectedChapter || !videoTitle || !selectedVideo) {
      console.error('Incomplete data. Please fill in all required fields.');
      return;
    }

    try {
      const newTopic = {
        videoTitle,
        selectedVideo,
        pdfTitle,
        selectedPdf,
        completed: [],
      };

      const response = await fetch(`http://localhost:8000/api/chapters/${selectedChapter}/add-topic`, {
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

      // Clear form fields after successful addition
      setVideoTitle('');
      setSelectedVideo('');
      setPdfTitle('');
      setSelectedPdf('');
    } catch (error) {
      console.error('Error adding topic:', error.message);
    }
  };

  return (
    <div className={styles["AddTopic-wraper"]}>
      <label>
        Select Course:
        <select name="course" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.courseTitle}
            </option>
          ))}
        </select>
      </label>

      <label>
        Select Chapter:
        <select name="chapter" value={selectedChapter} onChange={(e) => setSelectedChapter(e.target.value)}>
          {chapters.map((chapter) => (
            <option key={chapter._id} value={chapter._id}>
              {chapter.chapterTitle}
            </option>
          ))}
        </select>
      </label>

      <label>
        Topic Title:
        <input type="text" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} />
      </label>

      <label>
        Select Video:
        <select value={selectedVideo} onChange={(e) => setSelectedVideo(e.target.value)}>
          <option value="" disabled>
            Select Video
          </option>
          {availableVideos.map((video) => (
            <option key={video.cloudFrontUrl} value={video.cloudFrontUrl}>
              {video.originalname}
            </option>
          ))}
        </select>
      </label>

      <label>
        PDF Title:
        <input type="text" value={pdfTitle} onChange={(e) => setPdfTitle(e.target.value)} />
      </label>

      <label>
        Select PDF:
        <select value={selectedPdf} onChange={(e) => setSelectedPdf(e.target.value)}>
          <option value="" disabled>
            Select PDF
          </option>
          {availablePdfs.map((pdf) => (
            <option key={pdf.s3Key} value={pdf.cloudFrontUrl}>
              {/* {pdf.s3Key} */}
              {pdf.originalname}
            </option>
          ))}
        </select>
      </label>

      <button onClick={handleAddTopic}>Add Topic</button>
    </div>
  );
};

export default AddTopicForm;
