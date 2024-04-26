import React from 'react';

const VideoPlayer = ({ videoUrl, title }) => {
  return (
    <div className="relative" style={{ paddingBottom: '56.25%' }}>
      {videoUrl && (
        <iframe
          title={title}
          width="100%"
          height="100%"
          src={videoUrl}
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      )}
    </div>
  );
};

export default VideoPlayer;
