import React, { useRef, useEffect, useState } from "react";
import styles from "./SeekBar.module.css";

const SeekBar = ({ videoRef, currentTime, duration, onSeek }) => {
    const [buffered, setBuffered] = useState(0);
    const seekbarRef = useRef(null);

    const handleSeek = (e) => {
        const seekTime = (e.target.value / 100) * duration;
        onSeek(parseFloat(seekTime));
    };

    // Update the buffered state based on video buffering
    useEffect(() => {
        const updateBuffered = () => {
            if (videoRef.current && videoRef.current.buffered.length) {
                const bufferedEnd = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
                setBuffered((bufferedEnd / duration) * 100);
            }
        };

        const video = videoRef.current;
        video.addEventListener('progress', updateBuffered);
        video.addEventListener('loadedmetadata', updateBuffered);

        return () => {
            video.removeEventListener('progress', updateBuffered);
            video.removeEventListener('loadedmetadata', updateBuffered);
        };
    }, [videoRef, duration]);

    const calculateProgress = () => (duration > 0 ? (currentTime / duration) * 100 : 0);

    // Adding a click handler directly on the seek bar for smoother seek
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
                />
                <div style={{ width: `${calculateProgress()}%` }} className={styles.progress}></div>
            </div>
        </div>
    );
};

export default SeekBar;
