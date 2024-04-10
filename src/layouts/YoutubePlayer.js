import React from 'react';

  const YouTubePlayer = ({ videoId }) => {
    
    const videoSrc = `https://www.youtube.com/embed/${videoId}`;
  
    return (
      <iframe
        width="560"
        height="315"
        src={videoSrc}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
      ></iframe>
    );
  };
  
  export default YouTubePlayer;
  

  