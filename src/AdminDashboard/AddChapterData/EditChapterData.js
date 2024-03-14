import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./AddChapterData.module.css"

const EditChapterForm = ({ chapterId }) => {
  const [chapterData, setChapterData] = useState({
    chapterTitle: '',
    topics: [],
  });

  useEffect(() => {
    // Fetch existing chapter data
    axios.get(`/api/chapters/${chapterId}`)
      .then((response) => {
        setChapterData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching chapter data:', error);
      });
  }, [chapterId]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedTopics = [...chapterData.topics];
    updatedTopics[index][name] = value;
    setChapterData({
      ...chapterData,
      topics: updatedTopics,
    });
  };

  const handleUpdateChapter = () => {
    axios.put(`/api/chapters/${chapterId}`, chapterData)
      .then((response) => {
        console.log('Chapter updated successfully:', response.data);
       
      })
      .catch((error) => {
        console.error('Error updating chapter:', error);
      
      });
  };

  return (
    <div className={styles['form-container']}>
    <form>
      <label>Chapter Title:</label>
      <input
        type="text"
        name="chapterTitle"
        value={chapterData.chapterTitle}
        onChange={(event) => setChapterData({ ...chapterData, chapterTitle: event.target.value })}
      />
      {chapterData.topics.map((topic, index) => (
        <div key={index}>
          <label>Video Title:</label>
          <input
            type="text"
            name="videoTitle"
            value={topic.videoTitle}
            onChange={(event) => handleInputChange(index, event)}
          />
          <label>PDF Title:</label>
          <input
            type="text"
            name="pdfTitle"
            value={topic.pdfTitle}
            onChange={(event) => handleInputChange(index, event)}
          />
        </div>
      ))}
      <button type="button" onClick={handleUpdateChapter}>Update Chapter</button>
    </form>
    </div>
  );
};

export default EditChapterForm;
