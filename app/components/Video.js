'use client';

import React from 'react';

const Video = () => {
  return (
    <div className="video-container">
      <video
        width="100%"
        height="auto"
        controls
        autoPlay
        loop
        muted
        className="responsive-video"
      >
        <source src="/video.mp4" type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
    </div>
  );
};

export default Video; 