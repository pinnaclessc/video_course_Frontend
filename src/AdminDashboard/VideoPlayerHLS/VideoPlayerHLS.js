import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Hls from 'hls.js';
import Sidebar from './Sidebar';
import Settings from './Settings';
import styles from './VideoPlayerHLS.module.css';

const VideoPlayer = () => {
    const videoRef = useRef(null);
    const [selectedVideoId, setSelectedVideoId] = useState(null);
    const [videoDetails, setVideoDetails] = useState({});
    const [currentQuality, setCurrentQuality] = useState('720p');
    const apiUrl = 'http://localhost:8000'; // Adjust this as needed

    // Fetch video details when selectedVideoId changes
    useEffect(() => {
        if (selectedVideoId) {
            const fetchVideoDetails = async () => {
                try {
                    const response = await axios.get(`${apiUrl}/videos/${selectedVideoId}`);
                    setVideoDetails(response.data);
                    setCurrentQuality(response.data.defaultQuality || '720p');
                } catch (error) {
                    console.error("Error fetching video details:", error);
                }
            };

            fetchVideoDetails();
        }
    }, [selectedVideoId]);

    // Update video player source when videoDetails change
    useEffect(() => {
        const playVideo = () => {
            const qualityUrl = videoDetails.resolutions?.find(res => res.name === currentQuality)?.url;
            if (!qualityUrl) return;

            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(qualityUrl);
                hls.attachMedia(videoRef.current);
                hls.on(Hls.Events.MANIFEST_PARSED, () => videoRef.current.play());
            } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
                videoRef.current.src = qualityUrl;
                videoRef.current.play();
            }
        };

        playVideo();
    }, [videoDetails, currentQuality]);

    const handleVideoSelect = videoId => {
        setSelectedVideoId(videoId);
    };

    return (
        <div className={styles.container}>
            <Sidebar onVideoSelect={handleVideoSelect} />
            <video ref={videoRef} controls className={styles.videoPlayer}></video>
            {videoDetails.resolutions && (
                <Settings
                    currentQuality={currentQuality}
                    onChangeQuality={setCurrentQuality}
                    resolutions={videoDetails.resolutions}
                />
            )}
        </div>
    );
};

export default VideoPlayer;
