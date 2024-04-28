import React, { useState, useEffect } from 'react';
import { variables } from '../../Variables';
import UserLikes from '../../components/reactions/UserLikes';
import UserComments from '../../components/reactions/UserComments';
import authService from '../../services/AuthService';
import { HeartIcon, ChatIcon } from '@heroicons/react/outline'; // Assuming you have icons imported

const ReactionsManagement = () => {
  const [likedVideoPosts, setLikedVideoPosts] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLikedVideoPosts = async () => {
    try {
      const user = authService.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const userId = user.userId;

      const response = await fetch(`${variables.API_URL}/VideoPostLike/likes?userId=${encodeURIComponent(userId)}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch liked video posts (${response.status} ${response.statusText})`);
      }
      const likedVideoPostsData = await response.json();
      setLikedVideoPosts(likedVideoPostsData);
    } catch (error) {
      console.error('Error fetching liked video posts:', error);
    }
  };

  const fetchUserComments = async () => {
    try {
      const user = authService.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const userEmail = user.email;

      const response = await fetch(`${variables.API_URL}/VideoPostComments/comments?userEmail=${encodeURIComponent(userEmail)}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user comments (${response.status} ${response.statusText})`);
      }

      const commentsData = await response.json();
      setUserComments(commentsData);
    } catch (error) {
      console.error('Error fetching user comments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLikedVideoPosts();
    fetchUserComments();
  }, []);

  const handleUnlike = async (videoPostId) => {
    try {
      const user = authService.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const id = user.userId;

      await authService.unlikeVideoPost(videoPostId, id);
      // After successfully unliking, refetch the liked video posts and user comments
      fetchLikedVideoPosts();
      fetchUserComments();
    } catch (error) {
      console.error('Error unliking video post:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-8">Your Interactions</h1>
        {loading ? (
          <div className="text-lg text-gray-500">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Liked Video Posts Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <HeartIcon className="h-6 w-6 mr-2 text-red-500" />
                Liked Video Posts
              </h2>
              {likedVideoPosts.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {likedVideoPosts.map((videoPost) => (
                    <div key={videoPost.videoPostId} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                      <UserLikes videoPost={videoPost} onUnlike={handleUnlike} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-lg text-gray-500">No liked video posts found.</p>
              )}
            </div>

            {/* User Comments Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <ChatIcon className="h-6 w-6 mr-2 text-blue-500" />
                User Comments
              </h2>
              {userComments.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {userComments.map((comment) => (
                    <div key={comment.commentId} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                      <UserComments comment={comment} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-lg text-gray-500">No comments found.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReactionsManagement;
