import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { variables } from '../../Variables';

function VideoPostDetails() {
  const { videoPostId } = useParams();
  const [videoPost, setVideoPost] = useState(null);

  useEffect(() => {
    const fetchVideoPost = async () => {
      try {
        const response = await fetch(`${variables.API_URL}/VideoPosts/${videoPostId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch video post (${response.status} ${response.statusText})`);
        }
        const videoPostData = await response.json();
        setVideoPost(videoPostData);
      } catch (error) {
        console.error('Error fetching video post:', error);
      }
    };

    fetchVideoPost();
  }, [videoPostId]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {videoPost && (
        <div className="container mx-auto py-8">
          <h1 className="text-4xl font-semibold text-gray-800 mb-4">{videoPost.title}</h1>
          <p className="text-lg text-gray-600 mb-4">{videoPost.shortDescription}</p>
          <div className="mb-4">
            <iframe
              title={videoPost.title}
              width="100%"
              height="480"
              src={videoPost.videoUrl}
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-lg text-gray-800">{videoPost.content}</p>
          <div className="mt-8">
            <p className="text-sm text-gray-600">Published by: {videoPost.publisher}</p>
            <p className="text-sm text-gray-600">Published Date: {new Date(videoPost.publishedDate).toLocaleDateString()}</p>
          </div>

          {videoPost.categories && videoPost.categories.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Categories</h2>
              <ul className="list-disc list-inside">
                {videoPost.categories.map(category => (
                  <li key={category.id} className="text-lg text-gray-600">{category.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default VideoPostDetails;
