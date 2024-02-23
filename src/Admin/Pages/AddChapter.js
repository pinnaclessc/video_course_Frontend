// import React, { useState, useEffect } from "react";
// import styles from "./AddChapter.module.css";

// const AddChapterForm = () => {
//   const [videoTitle, setVideoTitle] = useState("");
//   const [videoUrl, setVideoUrl] = useState("");
//   const [pdfTitle, setPdfTitle] = useState("");
//   const [pdfUrl, setPdfUrl] = useState("");
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState("");
//   const [chapterTitle, setChapterTitle] = useState("");
//   const [availableVideos, setAvailableVideos] = useState([]);
//   const [availablePdfs, setAvailablePdfs] = useState([]);
//   const [currentTitle, setCurrentTitle] = useState("");
//   const [currentSelectedVideo, setCurrentSelectedVideo] = useState("");
//   const [currentPdfTitle, setCurrentPdfTitle] = useState("");
//   const [currentSelectedPdf, setCurrentSelectedPdf] = useState("");
//   const [forpdf, setForPdf] = useState("");
//   const [forvideo, setForVideo] = useState("");
//   const [currentCourseId, setCurrentCourseId] = useState("");

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await fetch("http://13.200.156.92:8000/api/courses");
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         setCourses(data);

//         // Extract course_id and set it in state
//         const firstCourseId = data.length > 0 ? data[0]._id : "";
//         setCurrentCourseId(firstCourseId);
//         setSelectedCourse(firstCourseId); // Set default selectedCourse
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//       }
//     };

//     fetchCourses();
//   }, []);

//   useEffect(() => {
//     const fetchVideosAndPdfs = async () => {
//       try {
//         const videosResponse = await fetch(
//           `http://13.200.156.92:8000/api/videos/${selectedCourse}`
//         );
//         if (!videosResponse.ok) {
//           throw new Error(`HTTP error! Status: ${videosResponse.status}`);
//         }
//         const videosData = await videosResponse.json();
//         setAvailableVideos(videosData);

//         const pdfsResponse = await fetch(
//           `http://13.200.156.92:8000/api/pdfs/${selectedCourse}`
//         );
//         if (!pdfsResponse.ok) {
//           throw new Error(`HTTP error! Status: ${pdfsResponse.status}`);
//         }
//         const pdfsData = await pdfsResponse.json();
//         setAvailablePdfs(pdfsData);
//       } catch (error) {
//         console.error("Error fetching videos and PDFs:", error);
//       }
//     };

//     if (selectedCourse) {
//       fetchVideosAndPdfs();
//     }
//   }, [selectedCourse]);

//   useEffect(() => {
//     const videoData = availableVideos.find(
//       (video) => video.s3Key === currentSelectedVideo
//     );
//     const pdfData = availablePdfs.find(
//       (pdf) => pdf.s3Key === currentSelectedPdf
//     );
//     setForVideo(videoData ? videoData.url : "");
//     setForPdf(pdfData ? pdfData.url : "");
//   }, [ 
//     currentSelectedVideo,
//     currentSelectedPdf,
//     availableVideos,
//     availablePdfs,
//   ]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "course") {
//       setSelectedCourse(value);
//       setCurrentCourseId(value);
//       setVideoTitle("");
//       setVideoUrl("");
//       setPdfTitle("");
//       setPdfUrl("");
//     } else if (name === "chapterTitle") {
//       setChapterTitle(value);
//     } else {
//       if (name === "videoTitle") setVideoTitle(value);
//       else if (name === "videoUrl") setVideoUrl(value);
//       else if (name === "pdfTitle") setPdfTitle(value);
//       else if (name === "pdfUrl") setPdfUrl(value);
//       else if (name === "currentTitle") setCurrentTitle(value);
//       else if (name === "currentPdfTitle") setCurrentPdfTitle(value);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const newTopic = {
//         videoTitle: currentTitle || "Default Video Title",
//         selectedVideo: currentSelectedVideo,
//         pdfTitle: pdfTitle || "Default PDF Title", // Use pdfTitle instead of currentPdfTitle
//         selectedPdf: currentSelectedPdf,
//         completed: [],
//       };

//       const selectedCourseObject = courses.find(
//         (course) => course._id === selectedCourse
//       );
//       const selectedCourseId = selectedCourseObject._id;

//       const newChapter = {
//         chapterTitle: chapterTitle || selectedCourseObject.courseTitle,
//         course: selectedCourseId,
//         topics: [newTopic],
//       };

//       // console.log("Sending data to server:", newChapter);
//       const response = await fetch(
//         "http://13.200.156.92:8000/vc/api/chapters",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(newChapter),
//         }
//       );

//       console.log("Server response:", response);

//       if (!response.ok) {
//         throw new Error("Failed to add chapter");
//       }

//       const result = await response.json();
//       console.log("Chapter added successfully:", result);

//       // Reset form fields
//       setVideoTitle("");
//       setVideoUrl("");
//       setPdfTitle("");
//       setPdfUrl("");
//       setSelectedCourse("");
//       setChapterTitle("");
//       setCurrentTitle("");
//       setCurrentSelectedVideo("");
//       setCurrentPdfTitle("");
//       setCurrentSelectedPdf("");
//     } catch (error) {
//       console.error("Error adding chapter:", error.message);
//     }
//   };

//   return (
    
//     <form onSubmit={handleSubmit} className={styles["AddChapter-wrapper"]}>
//       <label>
//         Select Course:
//         <select
//           name="course"
//           value={selectedCourse}
//           onChange={handleChange}
//           required
//         >
//           <option value="" disabled>
//             Choose a course
//           </option>
//           {courses.map((course) => (
//             <option key={course._id} value={course._id}>
//               {course.courseTitle}
//             </option>
//           ))}
//         </select>
//       </label>
//       <br />
//       <label>
//         Chapter Title:
//         <input
//           type="text"
//           name="chapterTitle"
//           value={chapterTitle}
//           onChange={handleChange}
//         />
//       </label>
//       <br />
//       {selectedCourse && (
//         <>
//           <div>
//             <input
//               type="text"
//               placeholder="Enter Topic Title"
//               value={currentTitle}
//               onChange={(e) => setCurrentTitle(e.target.value)}
//             />
//             <select
//               value={currentSelectedVideo || ""}
//               onChange={(e) => setCurrentSelectedVideo(e.target.value)}
//             >
//               <option value="" disabled>
//                 Select Video
//               </option>
//               {availableVideos.map((video) => (
//                 <option key={video.cloudFrontUrl} value={video.cloudFrontUrl}>
//                   {video.originalname}
//                 </option>
//               ))}
//             </select>

//             <input
//               type="text"
//               placeholder="Enter PDF Title"
//               value={pdfTitle}
//               onChange={(e) => setPdfTitle(e.target.value)}
//             />
//             <select
//               value={currentSelectedPdf || ""}
//               onChange={(e) => setCurrentSelectedPdf(e.target.value)}
//             >
//               <option value="" disabled>
//                 Select PDF
//               </option>
//               {availablePdfs.map((pdf) => (
//                 <option key={pdf.s3Key} value={pdf.cloudFrontUrl}>
//                   {pdf.originalname}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button type="submit">Add Chapter</button>
//         </>
//       )}
//     </form>
//   );
// };

// export default AddChapterForm;



// test02

import React, { useState, useEffect } from "react";
import styles from "./AddChapter.module.css";

const AddChapterForm = () => {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [pdfTitle, setPdfTitle] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");
  const [availableVideos, setAvailableVideos] = useState([]);
  const [availablePdfs, setAvailablePdfs] = useState([]);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentSelectedVideo, setCurrentSelectedVideo] = useState("");
  const [currentPdfTitle, setCurrentPdfTitle] = useState("");
  const [currentSelectedPdf, setCurrentSelectedPdf] = useState("");
  const [forpdf, setForPdf] = useState("");
  const [forvideo, setForVideo] = useState("");
  const [currentCourseId, setCurrentCourseId] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://13.200.156.92:8000/api/courses");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCourses(data);

        const firstCourseId = data.length > 0 ? data[0]._id : "";
        setCurrentCourseId(firstCourseId);
        setSelectedCourse(firstCourseId);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);
  console.log(availableVideos)

  useEffect(() => {
    const fetchVideosAndPdfs = async () => {
      try {
        const videosResponse = await fetch(
          `http://13.200.156.92:8000/api/videos/${selectedCourse}`
        );
        if (!videosResponse.ok) {
          throw new Error(`HTTP error! Status: ${videosResponse.status}`);
        }
        const videosData = await videosResponse.json();
        setAvailableVideos(videosData);

        const pdfsResponse = await fetch(
          `http://13.200.156.92:8000/api/pdfs/${selectedCourse}`
        );
        if (!pdfsResponse.ok) {
          throw new Error(`HTTP error! Status: ${pdfsResponse.status}`);
        }
        const pdfsData = await pdfsResponse.json();
        setAvailablePdfs(pdfsData);
      } catch (error) {
        console.error("Error fetching videos and PDFs:", error);
      }
    };

    if (selectedCourse) {
      fetchVideosAndPdfs();
    }
  }, [selectedCourse]);

  useEffect(() => {
    const videoData = availableVideos.find(
      (video) => video.s3Key === currentSelectedVideo
    );
    const pdfData = availablePdfs.find(
      (pdf) => pdf.s3Key === currentSelectedPdf
    );
    setForVideo(videoData ? videoData.url : "");
    setForPdf(pdfData ? pdfData.url : "");
  }, [ 
    currentSelectedVideo,
    currentSelectedPdf,
    availableVideos,
    availablePdfs,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "course") {
      setSelectedCourse(value);
      setCurrentCourseId(value);
      setVideoTitle("");
      setVideoUrl("");
      setPdfTitle("");
      setPdfUrl("");
    } else if (name === "chapterTitle") {
      setChapterTitle(value);
    } else {
      if (name === "videoTitle") setVideoTitle(value);
      else if (name === "videoUrl") setVideoUrl(value);
      else if (name === "pdfTitle") setPdfTitle(value);
      else if (name === "pdfUrl") setPdfUrl(value);
      else if (name === "currentTitle") setCurrentTitle(value);
      else if (name === "currentPdfTitle") setCurrentPdfTitle(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newTopic = {
        videoTitle: currentTitle || "Default Video Title",
        selectedVideo: currentSelectedVideo,
        pdfTitle: pdfTitle || "Default PDF Title",
        selectedPdf: currentSelectedPdf,
        completed: [],
      };

      const selectedCourseObject = courses.find(
        (course) => course._id === selectedCourse
      );
      const selectedCourseId = selectedCourseObject._id;

      const newChapter = {
        chapterTitle: chapterTitle || selectedCourseObject.courseTitle,
        course: selectedCourseId,
        topics: [newTopic],
      };

      const response = await fetch(
        "http://13.200.156.92:8000/vc/api/chapters",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newChapter),
        }
      );

      console.log("Server response:",response);

      if (!response.ok) {
        throw new Error("Failed to add chapter");
      }

      const result = await response.json();
      console.log("Chapter added successfully:", result);

      setVideoTitle("");
      setVideoUrl("");
      setPdfTitle("");
      setPdfUrl("");
      setSelectedCourse("");
      setChapterTitle("");
      setCurrentTitle("");
      setCurrentSelectedVideo("");
      setCurrentPdfTitle("");
      setCurrentSelectedPdf("");
    } catch (error) {
      console.error("Error adding chapter:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles["AddChapter-wrapper"]}>
      <label>
        Select Course:
        <select
          name="course"
          value={selectedCourse}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Choose a course
          </option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.courseTitle}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Chapter Title:
        <input
          type="text"
          name="chapterTitle"
          value={chapterTitle}
          onChange={handleChange}
        />
      </label>
      <br />
      {selectedCourse && (
        <>
          <div>
            <input
              type="text"
              placeholder="Enter Topic Title"
              value={currentTitle}
              onChange={(e) => setCurrentTitle(e.target.value)}
            />
            <select
              value={currentSelectedVideo || ""}
              onChange={(e) => setCurrentSelectedVideo(e.target.value)}
            >
              <option value="" disabled>
                Select Video
              </option>
              {availableVideos.map((video) => (
                <option key={video.cloudFrontUrl} value={video.cloudFrontUrl}>
                  {video.originalname}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Enter PDF Title"
              value={pdfTitle}
              onChange={(e) => setPdfTitle(e.target.value)}
            />
            <select
              value={currentSelectedPdf || ""}
              onChange={(e) => setCurrentSelectedPdf(e.target.value)}
            >
              <option value="" disabled>
                Select PDF
              </option>
              {availablePdfs.map((pdf) => (
                <option key={pdf.s3Key} value={pdf.cloudFrontUrl}>
                  {pdf.originalname}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Add Chapter</button>
        </>
      )}
    </form>
  );
};

export default AddChapterForm;

