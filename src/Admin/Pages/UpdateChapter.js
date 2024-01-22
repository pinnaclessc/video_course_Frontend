import React, { useState, useEffect } from 'react';

const UpdateVideoForm = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState('');
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://13.200.156.92:8000/api/courses');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCourses(data);

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
    const fetchChapters = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/get_chapters/${selectedCourse}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setChapters(data);

        if (data.length > 0) {
          setSelectedChapter(data[0]._id);
        }
      } catch (error) {
        console.error('Error fetching chapters:', error);
      }
    };

    if (selectedCourse) {
      fetchChapters();
    }
  }, [selectedCourse]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/getTopics/${selectedChapter}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTopics(data);

        if (data.length > 0) {
          setSelectedTopic(data[0]._id);
        }
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    if (selectedChapter) {
      fetchTopics();
    }
  }, [selectedChapter]);

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleUpdate = async () => {
    if (!selectedCourse || !selectedChapter || !selectedTopic || !videoFile) {
      alert('Please select all fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('video', videoFile);

      const uploadResponse = await fetch('http://localhost:8000/api/upload-video', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload video');
      }

      const uploadData = await uploadResponse.json();
      const newVideoLink = uploadData.videoLink;

    
      const updateResponse = await fetch('http://localhost:8000/updateTopic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: selectedCourse,
          chapterId: selectedChapter,
          topicId: selectedTopic,
          videoLink: newVideoLink,
        }),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update topic');
      }

      alert('Topic updated successfully!');
    } catch (error) {
      console.error('Error updating topic:', error.message);
      alert('Error updating topic');
    }
  };

  return (
    <div>
      <label>
        Select Course:
        <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.courseTitle}
            </option>
          ))}
        </select>
      </label>

      <label>
        Select Chapter:
        <select value={selectedChapter} onChange={(e) => setSelectedChapter(e.target.value)}>
          {chapters.map((chapter) => (
            <option key={chapter._id} value={chapter._id}>
              {chapter.chapterTitle}
            </option>
          ))}
        </select>
      </label>

      <label>
        Select Topic:
        <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>
          {topics.map((topic) => (
            <option key={topic._id} value={topic._id}>
              {topic.topicTitle}
            </option>
          ))}
        </select>
      </label>

      <label>
        Upload Video:
        <input type="file" accept="video/*" onChange={handleVideoChange} />
      </label>
      <button onClick={handleUpdate}>Update Topic</button>
    </div>
  );
};

export default UpdateVideoForm;