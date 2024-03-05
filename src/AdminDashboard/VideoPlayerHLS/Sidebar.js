// import React, { useState, useEffect } from 'react';
// import styles from "./Sidebar.module.css"

// const Sidebar = ({ onVideoSelect }) => {
//     const [chapters, setChapters] = useState([]);

//     useEffect(() => {
//         // Simulate fetching data, replace with your actual fetch call
//         const fetchChapters = async () => {
//             const response = await fetch('http://localhost:8000/api/chapters/course/65d5c59aca321455979ee32d');
//             const data = await response.json();
//             setChapters(data);
//         };

//         fetchChapters();
//     }, []);


//         return (
//             <div>
//                 {chapters.map(chapter => (
//                     <div key={chapter._id}>
//                         <h3>{chapter.chapterTitle}</h3>
//                         <ul>
//                             {chapter.topics.map(topic => (
//                                 <li key={topic._id} onClick={() => onVideoSelect(topic.selectedVideo)}>
//                                     {topic.videoTitle}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 ))}
//             </div>
//         );
//     };

// export default Sidebar;


import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Sidebar.module.css"; // Ensure you have the corresponding CSS file

const Sidebar = ({ onVideoSelect, apiUrl = 'http://localhost:8000' }) => {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    // Replace '/chapters' with your actual endpoint that returns the list of video chapters or videos
    const fetchChapters = async () => {
      try {
        const response = await axios.get(`${apiUrl}/chapters`);
        setChapters(response.data); // Assuming the response is an array of chapter objects
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };

    fetchChapters();
  }, [apiUrl]);

  return (
    <div className={styles.sidebar}>
      {chapters.map((chapter, index) => (
        <div key={index} className={styles.chapter}>
          <h3>{chapter.title}</h3> {/* Adjust according to your data structure */}
          <ul>
            {chapter.videos.map((video) => ( // Adjust 'videos' according to your data structure
              <li key={video.id} onClick={() => onVideoSelect(video.id)} className={styles.videoItem}>
                {video.title}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
