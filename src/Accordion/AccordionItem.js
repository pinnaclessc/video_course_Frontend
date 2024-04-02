import React, { useState, useEffect } from 'react';
import { MdOndemandVideo } from 'react-icons/md';
import { useParams } from 'react-router-dom';

const AccordionItem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({ days: [] }); // Initialize data state
  const { course_id } = useParams(); // Destructure course_id from useParams

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://videocoursebackend.ssccglpinnacle.com/api/chapters/course/${course_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setData(data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [course_id]); // Dependency array ensures this runs only when course_id changes

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={toggleAccordion}>
        {data.chapterTitle}
      </div>
      {isOpen && (
        <div className="accordion-content">
          {data.days.map((day, index) => (
            <div key={index}>
              <strong>Day {day.dayNumber}:</strong>
              {day.topics.map((topic, topicIndex) => (
                <div key={topicIndex}>
                  <MdOndemandVideo />
                  <div>{topic.title}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;

