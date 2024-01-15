import React, { useState, useEffect } from 'react';
import "./UpdateChapterForm.css"

const UpdateChapterForm = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    // Fetch courses from the backend
    fetch('http://localhost:8000/api/courses')
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  const handleCourseChange = async (event) => {
    const courseId = event.target.value;

    setSelectedCourseId(courseId);
    // Reset chapters, selectedChapter, and selectedTopic when a new course is selected
    setChapters([]);
    setSelectedChapter(null);
    setSelectedTopic(null);

    try {
      // Fetch chapters for the selected course from the backend
      const response = await fetch(`http://localhost:8000/cc/${courseId}`);
      const data = await response.json();

      if (response.ok) {
        // Update the state with the fetched chapters
        setChapters(data);
      } else {
        console.error('Error fetching chapters:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching chapters:', error);
    }
  };

  const handleChapterChange = (event) => {
    const chapterId = event.target.value;

    // Find the selected chapter
    const selectedChapterData = chapters.find((chapter) => chapter._id === chapterId);
    setSelectedChapter(selectedChapterData);

    // Reset selectedTopic when a new chapter is selected
    setSelectedTopic(null);
  };

  const handleTopicChange = (event) => {
    const topicId = event.target.value;

    // Find the selected topic
    const selectedTopicData = selectedChapter ? selectedChapter.days.flatMap(day => day.topics).find((topic) => topic._id === topicId) : null;
    setSelectedTopic(selectedTopicData);
  };

  return (
    <div className="container">
      <h2>Update Chapter</h2>

      <label>Select a Course:</label>
      <select value={selectedCourseId} onChange={handleCourseChange}>
        <option value="" disabled>Select a course</option>
        {courses.map((course) => (
          <option key={course._id} value={course._id}>
            {course.courseTitle}
          </option>
        ))}
      </select>

      {/* Conditionally render chapter selector only if a course is selected */}
      {selectedCourseId && (
        <>
          {/* Display fetched chapters */}
          <label>Select a Chapter:</label>
          <select value={selectedChapter ? selectedChapter._id : ''} onChange={handleChapterChange}>
            <option value="" disabled>Select a chapter</option>
            {chapters.map((chapter) => (
              <option key={chapter._id} value={chapter._id}>
                {chapter.chapterTitle}
              </option>
            ))}
          </select>

          {/* Conditionally render topics selector only if a chapter is selected */}
          {selectedChapter && selectedChapter.days && selectedChapter.days.length > 0 && (
            <>
              <label>Select a Topic:</label>
              <select value={selectedTopic ? selectedTopic._id : ''} onChange={handleTopicChange}>
                <option value="" disabled>Select a topic</option>
                {selectedChapter.days.flatMap(day => day.topics).map((topic) => (
                  <option key={topic._id} value={topic._id}>
                    {topic.title}
                  </option>
                ))}
              </select>

              {/* Display form with topic details */}
              {selectedTopic && (
                <form>
                  <label>Title:</label>
                  <input type="text" value={selectedTopic.title} readOnly />

                  <label>Selected Video:</label>
                  <input type="text" value={selectedTopic.selectedVideo} readOnly />

                  <label>PDF Title:</label>
                  <input type="text" value={selectedTopic.pdfTitle} readOnly />

                  <label>Selected PDF:</label>
                  <input type="text" value={selectedTopic.selectedPdf} readOnly />
                </form>
              )}
            </>
          )}
        </>
      )}

      {/* Rest of your component goes here */}
    </div>
  );
};

export default UpdateChapterForm;
