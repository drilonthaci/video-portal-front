import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { variables } from '../../Variables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import authService from '../Auth/Login/AuthService';

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
      const userEmail = authService.getUser().email;
      const isLiked = likedVideos[id];

      if (isLiked) {
        await authService.unlikeVideoPost(id, userEmail);
        setLikedVideos({ ...likedVideos, [id]: false });
      } else {
        await authService.likeVideoPost(id, userEmail);
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
                  <Link to="/likes" className="text-blue-500 hover:underline">Manage Your Reactions</Link>
                </div>
                {/* Display Comments Section */}
                <div className="mt-4">
                  <h3 className="text-lg font-semibold font-roboto mb-2">Comments</h3>
                  {videoPost && videoPost.comments && (
                    videoPost.comments.map((comment) => (
                      <div key={comment.id} className="border-b pb-2">
                        <p className="text-sm text-gray-800">
                          <strong>{comment.userEmail.split('@')[0]}:</strong> {comment.commentText}
                        </p>
                        <p className="text-xs text-gray-600">
                          Posted on {new Date(comment.commentedAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>

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
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoPostDetails;