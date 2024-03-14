import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [selectedVideoId, setSelectedVideoId] = useState(() => Cookies.get('selectedVideoId'));
  const [videoQuality, setVideoQuality] = useState(() => Cookies.get('videoQuality') || '720p');
  const [videoDetails, setVideoDetails] = useState({ resolutions: [] });
  const [volume, setVolume] = useState(() => parseFloat(Cookies.get('volume')) || 0.5);
  const [playRate, setPlayRate] = useState(() => parseFloat(Cookies.get('playRate')) || 1);

 
  useEffect(() => {
    Cookies.set('videoQuality', videoQuality);
    Cookies.set('selectedVideoId', selectedVideoId);
    Cookies.set('volume', volume);
    Cookies.set('playRate', playRate);
  }, [videoQuality, selectedVideoId, volume, playRate]);

  const contextValue = {
    selectedVideoId,
    setSelectedVideoId,
    videoQuality,
    setVideoQuality,
    videoDetails,
    setVideoDetails,
    volume,
    setVolume,
    playRate,
    setPlayRate,
  };

  return <VideoContext.Provider value={contextValue}>{children}</VideoContext.Provider>;
};

export const useVideo = () => useContext(VideoContext);



