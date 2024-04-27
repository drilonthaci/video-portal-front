import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { variables } from '../../Variables';
import CommentsSection from '../../components/videoPosts/CommentsSection';
import SimilarVideosSection from '../../components/videoPosts/SimilarVideosSection';
import VideoPlayer from '../../components/videoPosts/VideoPlayer';
import Footer from '../../components/layout/footer/Footer';

import authService from '../../services/AuthService';



function VideoPostDetails() {
  const { videoPostId } = useParams();
  const [videoPost, setVideoPost] = useState(null);
  const [likedVideos, setLikedVideos] = useState({});
  const [similarVideos, setSimilarVideos] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchVideoPost = async () => {
      try {
        const response = await fetch(`${variables.API_URL}/VideoPosts/${videoPostId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch video post (${response.status} ${response.statusText})`);
        }
        const videoPostData = await response.json();
        setVideoPost(videoPostData);

        const similarVideosResponse = await fetch(`${variables.API_URL}/VideoPosts?category=${videoPostData.category}`);
        if (similarVideosResponse.ok) {
          const similarVideosData = await similarVideosResponse.json();
          setSimilarVideos(similarVideosData);
        }
      } catch (error) {
        console.error('Error fetching video post or similar videos:', error);
      }
    };

    fetchVideoPost();
  }, [videoPostId]);
  
  const handleLike = async (id) => {
    try {
      const likerId = authService.getUser().userId;
      const isLiked = likedVideos[id];

      if (isLiked) {
        await authService.unlikeVideoPost(id, likerId);
        setLikedVideos({ ...likedVideos, [id]: false });
      } else {
        await authService.likeVideoPost(id, likerId);
        setLikedVideos({ ...likedVideos, [id]: true });
      }
    } catch (error) {
      console.error('Error liking/unliking video post:', error);
    }
  };

  const handleAddComment = async () => {
    try {
      const userEmail = authService.getUser().email;
      await authService.addComment(videoPostId, userEmail, commentText);

      // Fetch the updated video post data after adding the comment
      const response = await fetch(`${variables.API_URL}/VideoPosts/${videoPostId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch updated video post (${response.status} ${response.statusText})`);
      }
      const updatedVideoPostData = await response.json();

      // Update the video post state to reflect the new comment
      setVideoPost(updatedVideoPostData);

      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {videoPost && (
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-8">
              {/* Video Player Section */}
              <VideoPlayer videoUrl={videoPost.videoUrl} title={videoPost.title} />
              {/* Video Details Section */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold font-roboto">{videoPost.title}</h2>
                <div className="flex items-center mt-2 border-b pb-2 font-roboto">
                  <div className="flex items-center mr-4 text-gray-600">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className={`mr-1 cursor-pointer ${likedVideos[videoPostId] ? 'text-blue-500' : 'text-gray-400'}`}
                      onClick={() => handleLike(videoPostId)}
                    />{' '}
                    {videoPost.likes}
                  </div>
                </div>
                <div className="mt-2 text-gray-600 font-roboto">
                  Published Date: {new Date(videoPost.publishedDate).toLocaleDateString()}
                </div>
                {/* Manage Reactions Link */}
                <div className="mt-4">
                  <Link to="/reactions" className="text-blue-500 hover:underline">Manage Your Reactions</Link>
                </div>
                {/* <div className="mt-4">
                  <Link to="/comments" className="text-blue-500 hover:underline">Manage Your Comments</Link>
                </div> */}
                {/* Display Comments Section */}
                <CommentsSection videoPost={videoPost} />

                {/* Comment Input Section */}
                <div className="mt-4">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write your comment here..."
                    className="w-full p-2 border rounded"
                  />
                  <button onClick={handleAddComment} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add Comment
                  </button>
                </div>
              </div>
            </div>
            {/* Similar Videos Section */}
            <SimilarVideosSection similarVideos={similarVideos} />
          </div>
          
        </div>
        
      )}
       <div className="bg-main py-10 sm:py-5">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto mt-10 grid max-w-lg grid-cols-5 sm:max-w-xl sm:grid-cols-5 sm:gap-x-6 lg:mx-0 lg:max-w-none lg:grid-cols-5 gap-x-4 gap-y-6">
      <div className="col-span-1 flex justify-center items-center">
        <img src="/images/aNet.webp" alt="aNet Image" className="h-5" />
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <img src="/images/gjirafa.webp" alt="/images/gjirafa.webp" className="h-5" />
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <img src="/images/gjirafa50.webp" alt="/images/gjirafa50.webp" className="h-5" />
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <img src="/images/gjirafapikbiz.webp" alt="/images/gjirafapikbiz.webp" className="h-5" />
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <img src="/images/lab.webp" alt="lab.webp" className="h-5" />
      </div>
    </div>
  </div>
</div>
      <Footer />
    </div>
  );
}

export default VideoPostDetails;


