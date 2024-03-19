import React from 'react'

export default function Accordion() {
  return (
    <div>
      
    </div>
  )
}

// import React, { useState, useEffect } from 'react';
// import { RiCloseLine, RiArrowDropDownLine, RiArrowDropUpLine, RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from 'react-icons/ri';
// import { FaFileVideo } from 'react-icons/fa';
// import { MdCheckBox, MdCheckBoxOutlineBlank, MdOndemandVideo } from "react-icons/md";
// import styles from './Accordian.module.css';
// import { useParams } from "react-router-dom";

// const Accordion = ({  onClose }) => {
//   const [selectedResourceSubmenuId, setSelectedResourceSubmenuId] = useState(null);
//   const [chapters, setChapters] = useState([]);
//   const [videoDurations, setVideoDurations] = useState({});
//   const [activeMenuIds, setActiveMenuIds] = useState([]);
//   const [videoNumberOffset, setVideoNumberOffset] = useState({});
//   const [selectedVideoId,setSelectedVideoId]= useState()
//   const { course_id } = useParams();

//   useEffect(() => {
//     const fetchChapters = async () => {
//       try {
//         const response = await fetch(`http://localhost:8000/api/chapters/course/${course_id }`);
//         const data = await response.json();
//         setChapters(data);
//         // Fetch durations for all videos in the chapters
//         const videoIds = data.flatMap(chapter => chapter.topics.map(topic => topic.selectedVideo));
//       } catch (error) {
//         console.error("Failed to fetch chapters or video details:", error);
//       }
//     };
//     fetchChapters();
//   }, []);

//   const toggleChapter = (chapterId) =>{
//     setActiveMenuIds(currentIds =>
//       currentIds.includes(chapterId)
//         ? currentIds.filter(id => id !== chapterId)
//         : [...currentIds, chapterId]
//     );
//   };

 

//   return (
//     <div className={styles.sidebar}>
//       <div className={styles.sidebarHeading}>
//         <h3>Course Content</h3>
//         <RiCloseLine size={24} onClick={onClose} className={styles.closeIcon} />
//       </div>
//       <div className={styles.content}>
//         {chapters.map((chapter) => (
//           <div key={chapter._id} className={styles.accordion}>
//             <div
//               className={styles.accordion_title_container}
//               onClick={() => toggleChapter(chapter._id)}
//             >
//               <div className={styles.accordion_title}>
//                 {chapter.chapterTitle}
             
//               </div>
//               {activeMenuIds.includes(chapter._id) ? (
//                 <RiArrowDropUpLine className={styles.arrow_icon} size={26} />
//               ) : (
//                 <RiArrowDropDownLine className={styles.arrow_icon} size={26} />
//               )}
//             </div>
//             {activeMenuIds.includes(chapter._id) && (
//               <ul className={styles.submenu_list}>
//                 {chapter.topics.map((topic, index) => (
//                   <li key={topic._id} className={styles.submenu_item}>
//                     <div className={styles.options_container}>
//                     {topic.completed ? (
//                         <MdCheckBox className={styles.checkbox_icon} size={20} />
//                       ) : (
//                         <MdCheckBoxOutlineBlank className={styles.checkbox_icon} size={20} />
//                       )}<span className={styles.topic_number}>{index + 1}.</span>
//                       <div
//                         className={`${styles.submenu_button} ${selectedVideoId === topic.selectedVideo ? styles.active : ''}`}
//                         onClick={() => setSelectedVideoId(topic.selectedVideo)}
//                       >
//                         {topic.videoTitle}
//                       </div>
                      
                    
                     
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default Accordion;
// import React, { useEffect, useState } from 'react';
// import AccordionItem from './AccordionItem';
// import './accordion.css';
// import { useParams } from 'react-router-dom';

// const Accordion = () => {
//   const courseId  = useParams();
//   const [accordionData, setAccordionData] = useState([]);

//   useEffect(() => {
//     // Fetch data from the API
//     const fetchData = async () => {
//       try {
//         const response = await fetch(  `http://localhost:3001/cc/${courseId}`);
//         // const response = await fetch('http://localhost:3001/cc/65963431bc2d0286d198ee77');
//         const data = await response.json();
//         setAccordionData(data);
//       } catch (error){
//         console.error('Error fetching accordion data:', error);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array ensures the effect runs only once

//   return (
//     <div className="accordion-FullPage">
//       {accordionData.map((item, index) => (
//         <AccordionItem key={index} data={item}/>
//       ))}
//     </div>
//   );
// };

// export default Accordion;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import AccordionItem from './AccordionItem';
// import './accordion.css';

// const Accordion = () => {
//   // const { courseId } = useParams();
//   const courseId =useParams();
//   const [accordionData, setAccordionData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://localhost:3001/cc/${courseId}`);
//         const data = await response.json();
        
//         // Ensure that data is an array before setting it
//         if (Array.isArray(data)) {
//           setAccordionData(data);
//         } else {
//           console.error('Invalid data format received from the API:', data);
//         }
//       } catch (error) {
//         console.error('Error fetching accordion data:', error);
//       }
//     };

//     fetchData();
//   }, [courseId]);

//   return (
//     <div className="accordion-FullPage">
//       {accordionData.map((item, index) => (
//         <AccordionItem key={index} data={item} />
//       ))}
//     </div>
//   );
// };

// export default Accordion;


// Accordion.js
// import React, { useEffect, useState } from 'react';
// import AccordionItem from './AccordionItem';
// import './accordion.css';

// const Accordion = ({ courseId }) => {
//   const [accordionData, setAccordionData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://localhost:3001/cc/${courseId}`);
//         const data = await response.json();
//         setAccordionData(data);
//       } catch (error) {
//         console.error('Error fetching accordion data:', error);
//       }
//     };

//     fetchData();
//   }, [courseId]);

//   return (
//     <div className="accordion-FullPage">
//       {accordionData.map((item, index) => (
//         <AccordionItem key={index} data={item} />
//       ))}
//     </div>
//   );
// };

// export default Accordion;


// Accordion.js
// import React, { useEffect, useState } from 'react';
// import AccordionItem from './AccordionItem';
// import './accordion.css';

// const Accordion = ({ courseId }) => {
//   const [accordionData, setAccordionData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://localhost:3001/cc/${courseId}`);
//         const data = await response.json();

//         if (Array.isArray(data)) {
//           setAccordionData(data);
//         } else {
//           console.error('Data is not an array:', data);
//         }
//       } catch (error) {
//         console.error('Error fetching accordion data:', error);
//       }
//     };

//     fetchData();
//   }, [courseId]);

//   // Log accordionData to help diagnose the issue
//   useEffect(() => {
//     console.log('Accordion Data:', accordionData);
//   }, [accordionData]);

//   return (
//     <div className="accordion-FullPage">
//       {accordionData.map((item, index) => (
//         <AccordionItem key={index} data={item} />
//       ))}
//     </div>
//   );
// };

// export default Accordion;
