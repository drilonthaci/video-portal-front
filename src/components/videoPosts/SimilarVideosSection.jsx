import React from 'react';
import { Link } from 'react-router-dom';

const SimilarVideosSection = ({ similarVideos }) => {
  return (
    // Similar Videos Section */}
    <div className="col-span-12 md:col-span-4 bg-gray-100 p-4 shadow border-1 border-dry">
      <h2 className="text-lg font-semibold font-roboto mb-4">Similar Videos</h2>
      <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {similarVideos.map((video) => (
          <Link key={video.id} to={`/video/${video.id}`} className="flex items-center mb-4">
            <img src={video.imageUrl} alt={video.title} className="h-16 w-24 mr-2" />
            <div>
              <h3 className="text-sm font-semibold font-roboto">{video.title}</h3>
              <div className="text-xs text-gray-600">
                Published Date: {new Date(video.publishedDate).toLocaleDateString()}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarVideosSection;
