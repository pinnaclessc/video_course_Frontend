// // src/components/CourseForm.js
// import React, { useState } from 'react';
// import styles from './CourseContent.module.css';

// const CourseForm = () => {
//   const [courseContent, setCourseContent] = useState({
//     courseId: '6579268fa4c01c4fa41acb45',// Now Manually Typed   
//     days: [],
//   });

//   const handleAddDay = () => {
//     setCourseContent({
//       ...courseContent,
//       days: [...courseContent.days, { title: '', dayNumber: courseContent.days.length + 1, topics: [] }],
//     });
//   };

//   const handleAddTopic = (dayIndex) => {
//     const newDays = [...courseContent.days];
//     newDays[dayIndex].topics.push({ title: '', videoUrl: '' });
//     setCourseContent({
//       ...courseContent,
//       days: newDays,
//     });
//   };

//   const handleInputChange = (event, dayIndex, topicIndex) => {
//     const { name, value } = event.target;
//     const newDays = [...courseContent.days];
//     if (name === 'dayTitle') {
//       newDays[dayIndex].title = value;
//     } else if (name === 'topicTitle') {
//       newDays[dayIndex].topics[topicIndex].title = value;
//     } else if (name === 'videoUrl') {
//       newDays[dayIndex].topics[topicIndex].videoUrl = value;
//     }
//     setCourseContent({
//       ...courseContent,
//       days: newDays,
//     });
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/add-courseContent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(courseContent),
//       });

//       if (response.ok) {
//         console.log('Course content successfully submitted');
//         // You can reset the form or perform other actions upon successful submission
//       } else {
//         console.error('Failed to submit course content');
//       }
//     } catch (error) {
//       console.error('Error while submitting course content:', error);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       {courseContent.days.map((day, dayIndex) => (
//         <div key={dayIndex} className={styles.dayContainer}>
//           <input
//             type="text"
//             name="dayTitle"
//             placeholder={`Day ${day.dayNumber} Title`}
//             value={day.title}
//             onChange={(event) => handleInputChange(event, dayIndex)}
//             className={styles.inputGroup}
//           />
//           {day.topics.map((topic, topicIndex) => (
//             <div key={topicIndex} className={styles.inputGroup}>
//               <input
//                 type="text"
//                 name="topicTitle"
//                 placeholder={`Topic ${topicIndex + 1} Title`}
//                 value={topic.title}
//                 onChange={(event) => handleInputChange(event, dayIndex, topicIndex)}
//               />
//               <input
//                 type="text"
//                 name="videoUrl"
//                 placeholder={`Video URL`}
//                 value={topic.videoUrl}
//                 onChange={(event) => handleInputChange(event, dayIndex, topicIndex)}
//               />
//               <button onClick={() => handleAddTopic(dayIndex)} className={styles.addButton}>
//                 Add Topic
//               </button>
//             </div>
//           ))}
//           <button onClick={() => handleAddTopic(dayIndex)} className={styles.addButton}>
//             Add Topic
//           </button>
//         </div>
//       ))}
//       <button onClick={handleAddDay} className={styles.addButton}>
//         Add Day
//       </button>
//       <button onClick={handleSubmit} className={styles.submitButton}>
//         Submit
//       </button>
//     </div>
//   );
// };

// export default CourseForm;


// test 02

// src/components/CourseForm.js
// import React, { useState } from 'react';
// import styles from './CourseContent.module.css';

// const CourseForm = () => {
//   const [courseContent, setCourseContent] = useState({
//     courseId: '6579268fa4c01c4fa41acb45',//manually Typed
//     days: [],
//   });

//   const handleAddDay = () => {
//     setCourseContent({
//       ...courseContent,
//       days: [...courseContent.days, { title: '', dayNumber: courseContent.days.length + 1, topics: [] }],
//     });
//   };

//   // const handleAddTopic = (dayIndex) => {
//   //   const newDays = [...courseContent.days];
//   //   newDays[dayIndex].topics.push({ title: '', videoUrl: '', pdfUrl: '', isPdfDownloadable: false });
//   //   setCourseContent({
//   //     ...courseContent,
//   //     days: newDays,
//   //   });
//   // };

//   const handleAddTopic = (dayIndex) => {
//     const newDays = [...courseContent.days];

//     // Ensure the day object exists
//     if (!newDays[dayIndex]) {
//       newDays[dayIndex] = { title: '', dayNumber: dayIndex + 1, topics: [] };
//     }

//     newDays[dayIndex].topics.push({ title: '', videoUrl: '', pdfUrl: '', isPdfDownloadable: false });

//     setCourseContent({
//       ...courseContent,
//       days: newDays,
//     });
//   };

//   // const handleInputChange = (event, dayIndex, topicIndex) => {
//   //   const { name, value, type, checked } = event.target;
//   //   const newDays = [...courseContent.days];

//   //   if (type === 'checkbox') {
//   //     newDays[dayIndex].topics[topicIndex][name] = checked;
//   //   } else {
//   //     newDays[dayIndex].topics[topicIndex][name] = value;
//   //   }

//   //   setCourseContent({
//   //     ...courseContent,
//   //     days: newDays,
//   //   });
//   // };

//   // const handleInputChange = (event, dayIndex, topicIndex) => {
//   //   const { name, value, type, checked } = event.target;
//   //   const newDays = [...courseContent.days];

//   //   if (!newDays[dayIndex]) {
//   //     newDays[dayIndex] = { title: '', dayNumber: dayIndex + 1, topics: [] };
//   //   }

//   //   if (type === 'checkbox') {
//   //     newDays[dayIndex].topics[topicIndex][name] = checked;
//   //   } else {
//   //     newDays[dayIndex][name] = value;
//   //   }

//   //   setCourseContent({
//   //     ...courseContent,
//   //     days: newDays,
//   //   });
//   // };

//   const handleInputChange = (event, dayIndex, topicIndex) => {



//     const { name, value, type, checked } = event.target;
//     const newDays = [...courseContent.days];

//     // Ensure the day object exists
//     if (!newDays[dayIndex]) {
//       newDays[dayIndex] = { title: '', dayNumber: dayIndex + 1, topics: [] };
//     }

//     // Handle different input types
//     if (name === 'dayTitle') {
//       newDays[dayIndex].title = value;
//     } else if (name === 'topicTitle' || name === 'videoUrl' || name === 'pdfUrl') {
//       newDays[dayIndex].topics[topicIndex][name] = value;
//     } else if (name === 'isPdfDownloadable') {
//       newDays[dayIndex].topics[topicIndex][name] = checked;
//     }

//     setCourseContent({
//       ...courseContent,
//       days: newDays,
//     });
//   };


//   const handleSubmit = async () => {
//     try {
//       const response = await fetch('YOUR_BACKEND_API_ENDPOINT', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(courseContent),
//       });

//       if (response.ok) {
//         console.log('Course content successfully submitted');
//         // You can reset the form or perform other actions upon successful submission
//       } else {
//         console.error('Failed to submit course content');
//       }
//     } catch (error) {
//       console.error('Error while submitting course content:', error);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       {courseContent.days.map((day, dayIndex) => (
//         <div key={dayIndex} className={styles.dayContainer}>
//           <input
//             type="text"
//             name="dayTitle"
//             placeholder={`Day ${day.dayNumber} Title`}
//             value={day.title}
//             onChange={(event) => handleInputChange(event, dayIndex)}
//             className={styles.inputGroup}
//           />
//           {day.topics.map((topic, topicIndex) => (
//             <div key={topicIndex} className={styles.inputGroup}>
//               <input
//                 type="text"
//                 name="topicTitle"
//                 placeholder={`Topic ${topicIndex + 1} Title`}
//                 value={topic.title}
//                 onChange={(event) => handleInputChange(event, dayIndex, topicIndex)}
//               />
//               <input
//                 type="text"
//                 name="videoUrl"
//                 placeholder={`Video URL`}
//                 value={topic.videoUrl}
//                 onChange={(event) => handleInputChange(event, dayIndex, topicIndex)}
//               />
//               <input
//                 type="text"
//                 name="pdfUrl"
//                 placeholder={`PDF URL`}
//                 value={topic.pdfUrl}
//                 onChange={(event) => handleInputChange(event, dayIndex, topicIndex)}
//               />
//               <label>
//                 Downloadable PDF
//                 <input
//                   type="checkbox"
//                   name="isPdfDownloadable"
//                   checked={topic.isPdfDownloadable}
//                   onChange={(event) => handleInputChange(event, dayIndex, topicIndex)}
//                 />
//               </label>
//               <button onClick={() => handleAddTopic(dayIndex)} className={styles.addButton}>
//                 Add Topic
//               </button>
//             </div>
//           ))}
//           <button onClick={() => handleAddTopic(dayIndex)} className={styles.addButton}>
//             Add Topic
//           </button>
//         </div>
//       ))}
//       <button onClick={handleAddDay} className={styles.addButton}>
//         Add Day
//       </button>
//       <button onClick={handleSubmit} className={styles.submitButton}>
//         Submit
//       </button>
//     </div>
//   );
// };

// export default CourseForm;

// test 03

// src/components/CourseForm.js
import React, { useState } from 'react';
import styles from './CourseContent.module.css';

const CourseForm = () => {
  const [courseContent, setCourseContent] = useState({
    courseId: '6588ffb2f204b20bf77c1d7c',
    days: [],
  });

  const handleAddDay = () => {
    setCourseContent({
      ...courseContent,
      days: [...courseContent.days, { title: '', dayNumber: courseContent.days.length + 1, topics: [] }],
    });
  };

  const handleAddTopic = (dayIndex) => {
    const newDays = [...courseContent.days];

    // Ensure the day object exists
    if (!newDays[dayIndex]) {
      newDays[dayIndex] = { title: '', dayNumber: dayIndex + 1, topics: [] };
    }

    newDays[dayIndex].topics.push({ title: '', videoUrl: '', pdfUrl: '', isPdfDownloadable: false });

    setCourseContent({
      ...courseContent,
      days: newDays,
    });
  };

  // const handleInputChange = (event, dayIndex, topicIndex) => {
  //   const { name, value, type, checked } = event.target;
  //   const newDays = [...courseContent.days];

  //   // Ensure the day object exists
  //   if (!newDays[dayIndex]) {
  //     newDays[dayIndex] = { title: '', dayNumber: dayIndex + 1, topics: [] };
  //   }

  //   // Handle different input types
  //   if (name === 'dayTitle') {
  //     newDays[dayIndex].title = value;
  //   } else if (name === 'topicTitle' || name === 'videoUrl' || name === 'pdfUrl') {
  //     // Ensure the topic object exists
  //     if (!newDays[dayIndex].topics[topicIndex]) {
  //       newDays[dayIndex].topics[topicIndex] = { title: '', videoUrl: '', pdfUrl: '', isPdfDownloadable: false };
  //     }
  //     newDays[dayIndex].topics[topicIndex][name] = value;
  //   } else if (name === 'isPdfDownloadable') {
  //     newDays[dayIndex].topics[topicIndex][name] = checked;
  //   }

  //   setCourseContent({
  //     ...courseContent,
  //     days: newDays,
  //   });
  // };

  const handleInputChange = (event, dayIndex, topicIndex) => {
    const { name, value, type, checked } = event.target;
    const newDays = [...courseContent.days];

    // Ensure the day object exists
    if (!newDays[dayIndex]) {
      newDays[dayIndex] = { title: '', dayNumber: dayIndex + 1, topics: [] };
    }

    // Ensure the topic object exists
    if (!newDays[dayIndex].topics[topicIndex]) {
      newDays[dayIndex].topics[topicIndex] = { title: '', videoUrl: '', pdfUrl: '', isPdfDownloadable: false };
    }

    // Handle different input types
    if (name === 'dayTitle') {
      newDays[dayIndex].title = value;
    } else if (name === 'topicTitle') {
      newDays[dayIndex].topics[topicIndex].title = value;
    } else if (name === 'videoUrl') {
      newDays[dayIndex].topics[topicIndex].videoUrl = value;
    } else if (name === 'pdfUrl') {
      newDays[dayIndex].topics[topicIndex].pdfUrl = value;
    } else if (name === 'isPdfDownloadable') {
      newDays[dayIndex].topics[topicIndex].isPdfDownloadable = checked;
    }

    setCourseContent({
      ...courseContent,
      days: newDays,
    });
  };


  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/add-courseContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseContent),
      });

      if (response.ok) {
        console.log('Course content successfully submitted');
        // You can reset the form or perform other actions upon successful submission
      } else {
        console.error('Failed to submit course content');
      }
    } catch (error) {
      console.error('Error while submitting course content:', error);
    }
  };

  return (
    <div className={styles.container}>
      {courseContent.days.map((day, dayIndex) => (
        <div key={dayIndex} className={styles.dayContainer}>
          <input
            type="text"
            name="dayTitle"
            placeholder={`Day ${day.dayNumber} Title`}
            value={day.title}
            onChange={(event) => handleInputChange(event, dayIndex)}
            className={styles.inputGroup}
          />
          {day.topics.map((topic, topicIndex) => (
            <div key={topicIndex} className={styles.inputGroup}>
              {/* <input
                type="text"
                name="topicTitle"
                placeholder={`Topic ${topicIndex + 1} Title`}
                value={topic.title}
                onChange={(event) => handleInputChange(event, dayIndex, topicIndex)}
              /> */}

              <input
                type="text"
                name="topicTitle"
                placeholder={`Topic ${topicIndex + 1} Title`}
                value={topic.title}
                onChange={(event) => handleInputChange(event, dayIndex, topicIndex)}
              />
              <input
                type="text"
                name="videoUrl"
                placeholder={`Video URL`}
                value={topic.videoUrl}
                onChange={(event) => handleInputChange(event, dayIndex, topicIndex)}
              />
              <input
                type="text"
                name="pdfUrl"
                placeholder={`PDF URL`}
                value={topic.pdfUrl}
                onChange={(event) => handleInputChange(event, dayIndex, topicIndex)}
              />
              <label>
                Downloadable PDF
                <input
                  type="checkbox"
                  name="isPdfDownloadable"
                  checked={topic.isPdfDownloadable}
                  onChange={(event) => handleInputChange(event, dayIndex, topicIndex)}
                />
              </label>
              <button onClick={() => handleAddTopic(dayIndex)} className={styles.addButton}>
                Add Topic
              </button>
            </div>
          ))}
          <button onClick={() => handleAddTopic(dayIndex)} className={styles.addButton}>
            Add Topic
          </button>
        </div>
      ))}
      <button onClick={handleAddDay} className={styles.addButton}>
        Add Day
      </button>
      <button onClick={handleSubmit} className={styles.submitButton}>
        Submit
      </button>
    </div>
  );
};

export default CourseForm;


