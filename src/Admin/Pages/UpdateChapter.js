// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import styles from './UpdateChapter.module.css';

// export default function UpdateChapter() {
//   const [chapterTitle, setChapterTitle] = useState("");
//   const [chapterDetails, setChapterDetails] = useState("");
//   const [updated, setUpdated] = useState(false);

//   const params = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     getChapterDetails();
//   }, []);

//   const getChapterDetails = async () => {
//     try {
//       let result = await fetch(`http://localhost:8000/chapter/${params.courseId}/${params.chapterId}`);
//       result = await result.json();

//       setChapterTitle(result.chapterTitle);
//       setChapterDetails(result.chapterDetails);
//     } catch (error) {
//       console.error("Error fetching chapter details", error);
//     }
//   };

//   const updateChapterHandler = async () => {
//     try {
//       let result = await fetch(`http://localhost:8000/chapter/${params.courseId}/${params.chapterId}`, {
//         method: "PUT",
//         body: JSON.stringify({ chapterTitle, chapterDetails }),
//         headers: { "Content-Type": "application/json" },
//       });

//       if (result.ok) {
//         clearFields();
//         setUpdated(true);

//         // You can navigate to the chapter list or any other page after successful update
//         // navigate(`/courses/${params.courseId}/chapters`);
//       } else {
//         console.error("Update failed");
//       }
//     } catch (error) {
//       console.error("Error updating chapter", error);
//     }
//   };

//   const clearFields = () => {
//     setChapterTitle("");
//     setChapterDetails("");
//   };

//   return (
//     <>
//       <div className={styles["UpdateChapter-fullPage"]}>
//         <div className={styles["UpdateChapter-Heading"]}><h4>Update Chapter</h4></div>
//         <div className={styles["UpdateChapter-label"]}>Chapter Title</div>
//         <input
//           type="text"
//           placeholder="Enter Chapter Title"
//           className={styles['UpdateChapter-inputbox']}
//           value={chapterTitle}
//           onChange={(e) => setChapterTitle(e.target.value)}
//         />
//         <div className={styles["UpdateChapter-label"]}>Chapter Details</div>
//         <input
//           type="text"
//           placeholder="Enter Chapter Details"
//           className={styles['UpdateChapter-inputbox']}
//           value={chapterDetails}
//           onChange={(e) => setChapterDetails(e.target.value)}
//         />
//         <button type="submit" className={styles['UpdateChapter-updateChapterBtn']} onClick={updateChapterHandler}>
//           Update Chapter
//         </button>
//         {updated && <div className={styles['UpdateChapter-successMsg']}>!! Updated Successfully !!</div>}
//       </div>
//     </>
//   );
// }


// test 02
// // src/components/UpdateChapterForm.js
// import React, { useState, useEffect } from 'react';
// import styles from './UpdateChapterForm.module.css'; // Import your CSS module

// const UpdateChapterForm = ({ courseId, chapterId, onUpdate }) => {
//   const [chapterTitle, setChapterTitle] = useState('');
//   const [chapterDetails, setChapterDetails] = useState('');

//   useEffect(() => {
//     // Fetch chapter details when component mounts
//     fetchChapterDetails();
//   }, [courseId, chapterId]);

//   const fetchChapterDetails = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/chapter/${courseId}/${chapterId}`);
//       if (!response.ok) {
//         throw new Error(`Error fetching chapter details: ${response.status}`);
//       }
//       const data = await response.json();
//       setChapterTitle(data.chapterTitle);
//       setChapterDetails(data.chapterDetails);
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   const updateChapterHandler = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/chapter/${courseId}/${chapterId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ chapterTitle, chapterDetails }),
//       });

//       if (!response.ok) {
//         throw new Error(`Error updating chapter: ${response.status}`);
//       }

//       // Notify the parent component that the update was successful
//       onUpdate();

//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   return (
//     <div className={styles.updateChapterForm}>
//       <h3>Update Chapter</h3>
//       <label htmlFor="chapterTitle">Chapter Title</label>
//       <input
//         type="text"
//         id="chapterTitle"
//         value={chapterTitle}
//         onChange={(e) => setChapterTitle(e.target.value)}
//       />
//       <label htmlFor="chapterDetails">Chapter Details</label>
//       <input
//         type="text"
//         id="chapterDetails"
//         value={chapterDetails}
//         onChange={(e) => setChapterDetails(e.target.value)}
//       />
//       <button onClick={updateChapterHandler}>Update Chapter</button>
//     </div>
//   );
// };

// export default UpdateChapterForm;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./UpdateChapter.module.css";

const UpdateChapter = () => {
  // const [courseId, setCourseId] = useState(""); // Remove course selection if not needed
  const { courseId } = useParams(); // Get courseId from URL params
  const [courseChapters, setCourseChapters] = useState([]);
  const [currentChapter, setCurrentChapter] = useState({
    dayNumber: 1,
    chapterNumber: 1,
    chapterTitle: "",
    topics: [],
  });
  const [availableVideos, setAvailableVideos] = useState([]);
  const [availablePdfs, setAvailablePdfs] = useState([]);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentSelectedVideo, setCurrentSelectedVideo] = useState("");
  const [currentPdfTitle, setCurrentPdfTitle] = useState("");
  const [currentSelectedPdf, setCurrentSelectedPdf] = useState("");
  const [forpdf, setforpdf] = useState("");
  const [forvideo, setforvideo] = useState("");

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/chapters/${courseId}`);
        if (response.ok) {
          const chapters = await response.json();
          setCourseChapters(chapters);
        } else {
          console.error("Failed to fetch chapters");
        }
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };

    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/get-videos");
        if (response.ok) {
          const videos = await response.json();
          setAvailableVideos(videos);
        } else {
          console.error("Failed to fetch videos");
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    const fetchPdfs = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/get-pdfs");
        if (response.ok) {
          const pdfs = await response.json();
          setAvailablePdfs(pdfs);
        } else {
          console.error("Failed to fetch PDFs");
        }
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
    };

    fetchChapters();
    fetchVideos();
    fetchPdfs();
  }, [courseId]);

  useEffect(() => {
    const videoData = availableVideos.find(
      (video) => video.s3Key === currentSelectedVideo
    );
    const pdfData = availablePdfs.find(
      (pdf) => pdf.s3Key === currentSelectedPdf
    );

    setforvideo(videoData ? videoData.url : "");
    setforpdf(pdfData ? pdfData.url : "");
  }, [currentSelectedVideo, currentSelectedPdf, availableVideos, availablePdfs]);

  const clearCurrentChapter = () => {
    setCurrentChapter((prevChapter) => ({
      ...prevChapter,
      chapterNumber: prevChapter.chapterNumber + 1,
      topics: [],
    }));
  };

  const addChapter = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/api/chapters/${courseId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...currentChapter,
          topics: currentChapter.topics.map((topic) => ({
            title: topic.title,
            selectedVideo: topic.selectedVideo,
            pdfTitle: topic.pdfTitle,
            selectedPdf: topic.selectedPdf,
          })),
        }),
      });

      if (response.ok) {
        const chapter = await response.json();
        setCourseChapters((prevChapters) => [...prevChapters, chapter]);
        clearCurrentChapter();
      } else {
        console.error("Failed to add chapter");
      }
    } catch (error) {
      console.error("Error adding chapter:", error);
    }
  };

  const addTopic = () => {
    const newTopic = {
      title: currentTitle,
      selectedVideo: forvideo,
      pdfTitle: currentPdfTitle,
      selectedPdf: forpdf,
      serialNumber: currentChapter.topics.length + 1,
    };

    setCurrentChapter((prevChapter) => ({
      ...prevChapter,
      topics: [...prevChapter.topics, newTopic],
    }));

    setCurrentPdfTitle("");
    setCurrentTitle("");
    setCurrentSelectedVideo("");
    setCurrentSelectedPdf("");
  };

  return (
    <div className={styles["UpdateChapter-fullPage"]}>
      <div className={styles["UpdateChapter-Heading"]}>
        <h4>Update Chapter</h4>
      </div>
      <form onSubmit={addChapter}>
        {/* Remove course selection part if not needed */}
        {/* ... (rest of the code) */}
        <div>
          <button type="submit">Update Chapter</button>
          <button type="button" onClick={clearCurrentChapter}>
            Clear
          </button>
        </div>
      </form>

      <div>
        <h4>Updated Chapters</h4>
        <ul>
          {courseChapters.map((chapter) => (
            <li key={chapter.id}>
              {`Day ${chapter.dayNumber}, Chapter : ${chapter.chapterTitle}`}
              <ul>
                {chapter.topics.map((topic) => (
                  <li key={topic.serialNumber}>
                    {`Topic ${topic.serialNumber}: ${topic.title}, Video: ${topic.selectedVideo}, PDF: ${topic.selectedPdf}`}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UpdateChapter;

