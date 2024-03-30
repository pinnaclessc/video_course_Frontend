import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChapterAccordion.css';
import { useParams } from 'react-router';

const ChapterAccordion = () => {
  const [chapters, setChapters] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const{courseId}=useParams();
  console.log(courseId)

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/chapters/course/65d5c59aca321455979ee32d`);
        // const response = await axios.get(`http://localhost:8000/api/chapters/course/${courseId}`);
        setChapters(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching chapters:', error);
      }
    };

    fetchChapters();
  }, []);

  const handleClick = index => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <div className="Chapter-accordion-wrapper">
      {chapters.map((chapter, index) => (
        <div key={chapter._id}>
          <button className="accordion-title" onClick={() => handleClick(index)}>
            {chapter.chapterTitle}
          </button>
          {activeIndex === index && (
            <div className="accordion-content" style={{ display: activeIndex === index ? 'block' : 'none' }}>
              <h2>{chapter.chapterTitle}</h2>
              {/* Render chapter details here */}
              {chapter.topics.map(topic => (
                <div key={topic._id}>
                  <p>{topic.videoTitle}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChapterAccordion;

