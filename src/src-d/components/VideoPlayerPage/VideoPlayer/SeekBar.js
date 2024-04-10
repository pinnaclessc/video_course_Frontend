// import React, { useRef, useEffect, useState } from "react";
// import styles from "./SeekBar.module.css";

// const SeekBar = ({ videoRef, currentTime, duration, onSeek }) => {
//     const [buffered, setBuffered] = useState(0);
//     const seekbarRef = useRef(null);

//     const handleSeek = (e) => {
//         const seekTime = (e.target.value / 100) * duration;
//         onSeek(parseFloat(seekTime));
//     };

//     useEffect(() => {
//         const updateBuffered = () => {
//             if (videoRef.current && videoRef.current.buffered.length) {
//                 const bufferedEnd = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
//                 setBuffered((bufferedEnd / duration) * 100);
//             }
//         };

//         const video = videoRef.current;
//         video.addEventListener('progress', updateBuffered);
//         video.addEventListener('loadedmetadata', updateBuffered);

//         return () => {
//             video.removeEventListener('progress', updateBuffered);
//             video.removeEventListener('loadedmetadata', updateBuffered);
//         };
//     }, [videoRef, duration]);

//     const calculateProgress = () => (duration > 0 ? (currentTime / duration) * 100 : 0);

//     // for smoother seek
//     const handleSeekBarClick = (e) => {
//         const seekBarRect = seekbarRef.current.getBoundingClientRect();
//         const clickPositionInBar = e.clientX - seekBarRect.left;
//         const clickPositionInBarPercent = (clickPositionInBar / seekBarRect.width) * 100;
//         const newTime = (duration * clickPositionInBarPercent) / 100;
//         onSeek(newTime);
//     };

//     return (
//         <div className={styles.seekBarContainer} onClick={handleSeekBarClick}>
//             <div className={styles.seekbar} ref={seekbarRef}>
//                 <div className={styles.bufferedBar} style={{ width: `${buffered}%` }}></div>
//                 <input
//                     type="range"
//                     min="0"
//                     max="100"
//                     step="0.1"
//                     value={calculateProgress()}
//                     onChange={handleSeek}
//                     className={styles.rangeInput}
//                 />
//                 <div style={{ width: `${calculateProgress()}%` }} className={styles.progress}></div>
//             </div>
//         </div>
//     );
// };

// export default SeekBar;
import React, { useRef, useEffect, useState } from "react";
import styles from "./SeekBar.module.css";

const SeekBar = ({ videoRef, currentTime, duration, onSeek }) => {
    const [buffered, setBuffered] = useState(0);
    const seekbarRef = useRef(null);

    // Function to update the buffered range
    const updateBuffered = () => {
        if (videoRef.current && videoRef.current.buffered.length > 0) {
            // Find the buffered range that contains the current time
            // This is necessary because the video might have multiple buffered ranges
            const time = videoRef.current.currentTime;
            for (let i = 0; i < videoRef.current.buffered.length; i++) {
                if (time >= videoRef.current.buffered.start(i) && time <= videoRef.current.buffered.end(i)) {
                    const bufferedEnd = videoRef.current.buffered.end(i);
                    setBuffered((bufferedEnd / duration) * 100);
                    break; // Exit the loop once the correct buffered range is found
                }
            }
        }
    };

    useEffect(() => {
        const video = videoRef.current;
        // Listen to events that indicate a change in the buffered data
        video.addEventListener('progress', updateBuffered);
        video.addEventListener('loadedmetadata', updateBuffered);
        video.addEventListener('seeked', updateBuffered);

        // Clean up event listeners
        return () => {
            video.removeEventListener('progress', updateBuffered);
            video.removeEventListener('loadedmetadata', updateBuffered);
            video.removeEventListener('seeked', updateBuffered);
        };
    }, [videoRef, duration]);

    // Calculates the progress of the video playback
    const calculateProgress = () => (duration > 0 ? (currentTime / duration) * 100 : 0);

    // Handles user interaction with the seek bar to seek the video
    const handleSeek = (e) => {
        const seekTime = (e.target.value / 100) * duration;
        onSeek(parseFloat(seekTime));
    };

    // Enhances the click-to-seek functionality for a smoother user experience
    const handleSeekBarClick = (e) => {
        const seekBarRect = seekbarRef.current.getBoundingClientRect();
        const clickPositionInBar = e.clientX - seekBarRect.left;
        const clickPositionInBarPercent = (clickPositionInBar / seekBarRect.width) * 100;
        const newTime = (duration * clickPositionInBarPercent) / 100;
        onSeek(newTime);
    };

    return (
        <div className={styles.seekBarContainer} onClick={handleSeekBarClick}>
            <div className={styles.seekbar} ref={seekbarRef}>
                <div className={styles.bufferedBar} style={{ width: `${buffered}%` }}></div>
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    value={calculateProgress()}
                    onChange={handleSeek}
                    className={styles.rangeInput}
                    aria-label="Video seek bar"
                    aria-valuenow={calculateProgress()}
                    aria-valuemin="0"
                    aria-valuemax="100"
                />
                <div style={{ width: `${calculateProgress()}%` }} className={styles.progress}></div>
            </div>
        </div>
    );
};

export default SeekBar;

