// VideoPlayerPage.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import VideoPlayerHLS from './VideoPlayerHLS';
import styles from './VideoPlayerHLS.module.css'; 

const VideoPlayerPage = ({ apiUrl }) => {
    const [selectedVideoId, setSelectedVideoId] = useState(null);
    const [videoData, setVideoData] = useState([]);

    // Assuming you fetch your video data at this level to pass down to the sidebar
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch(`${apiUrl}/videos`); // Make sure to adjust this URL to where your videos are fetched from
                const data = await response.json();
                setVideoData(data);
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };

        fetchVideos();
    }, [apiUrl]);

    const handleVideoSelect = (videoId) => {
        setSelectedVideoId(videoId);
    };

    return (
        <div className={styles.videoPlayerPage}>
            <Sidebar onVideoSelect={handleVideoSelect} chapters={videoData} />
            <VideoPlayerHLS selectedVideoId={selectedVideoId} apiUrl={apiUrl} />
        </div>
    );
};

export default VideoPlayerPage;
