import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; // Import Link from react-router-dom
import { variables } from '../../Variables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

function VideoPostDetails() {
  const { videoPostId } = useParams();
  const [videoPost, setVideoPost] = useState(null);
  const [similarVideos, setSimilarVideos] = useState([]);

  useEffect(() => {
    const fetchVideoPost = async () => {
      try {
        const response = await fetch(`${variables.API_URL}/VideoPosts/${videoPostId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch video post (${response.status} ${response.statusText})`);
        }
        const videoPostData = await response.json();
        setVideoPost(videoPostData);

        // Fetch similar videos based on the category of the current video
        const similarVideosResponse = await fetch(`${variables.API_URL}/VideoPosts?category=${videoPostData.category}`);
        if (!similarVideosResponse.ok) {
          throw new Error(`Failed to fetch similar videos (${similarVideosResponse.status} ${similarVideosResponse.statusText})`);
        }
        const similarVideosData = await similarVideosResponse.json();
        setSimilarVideos(similarVideosData);
      } catch (error) {
        console.error('Error fetching video post or similar videos:', error);
      }
    };

    fetchVideoPost();
  }, [videoPostId]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {videoPost && (
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-8">
              <div className="relative" style={{ paddingBottom: '56.25%' }}>
                {videoPost.videoUrl && (
                  <iframe
                    title={videoPost.title}
                    width="100%"
                    height="100%"
                    src={videoPost.videoUrl}
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  ></iframe>
                )}
              </div>
              <div className="mt-8">
                <h2 className="text-xl font-semibold font-roboto">{videoPost.title}</h2>
                <div className="flex items-center mt-2 border-b pb-2 font-roboto">
                  <div className="flex items-center mr-4 text-gray-600">
                    <FontAwesomeIcon icon={faEye} className="mr-1" /> {videoPost.views}
                  </div>
                  <div className="flex items-center mr-4 text-gray-600">
                    <FontAwesomeIcon icon={faThumbsUp} className="mr-1" /> {videoPost.likes}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FontAwesomeIcon icon={faThumbsDown} className="mr-1" /> {videoPost.dislikes}
                  </div>
                </div>
                <div className="mt-2 text-gray-600 font-roboto">
                  Published Date: {new Date(videoPost.publishedDate).toLocaleDateString()}
                </div>
                <div className="flex items-center mt-4">
                  <img src="../images/logo.png" alt="LifeVideo Logo" className="h-8 mr-2" />
                </div>
              </div>
              <div className="mt-8">
                <h2 className="text-xl font-semibold font-roboto">Description</h2>
                <p className="text-roboto text-lg text-gray-600">{videoPost.shortDescription}</p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 bg-gray-100 p-4 shadow border-1 border-dry">
              <h2 className="text-lg font-semibold font-roboto mb-4">Similar</h2>
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                {similarVideos.map((video) => (
                  <Link key={video.id} to={`/video/${video.id}`} className="flex items-center mb-4"> 
                    <img src={video.imageUrl} alt={video.title} className="h-16 w-24 mr-2" />
                    <div>
                      <h3 className="text-sm font-semibold font-roboto">{video.title}</h3>
                      <div className="text-xs text-gray-600">
                        {new Date(video.publishedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoPostDetails;
