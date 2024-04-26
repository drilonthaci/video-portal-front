import React, { useState, useEffect } from 'react';
import { variables } from '../../Variables';
import UserLikes from '../../components/reactions/UserLikes';
import UserComments from '../../components/reactions/UserComments';
import authService from '../../services/AuthService';

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

      const userEmail = user.email;

      const response = await fetch(`${variables.API_URL}/VideoPostLike/likes?userEmail=${encodeURIComponent(userEmail)}`);
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

      const userEmail = user.email;

      await authService.unlikeVideoPost(videoPostId, userEmail);
      // After successfully unliking, refetch the liked video posts and user comments
      fetchLikedVideoPosts();
      fetchUserComments();
    } catch (error) {
      console.error('Error unliking video post:', error);
    }
  };


  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Liked Video Posts Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Liked Video Posts</h1>
        {loading ? (
          <div className="text-lg text-gray-500">Loading...</div>
        ) : likedVideoPosts.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {likedVideoPosts.map((videoPost) => (
              <UserLikes key={videoPost.videoPostId} videoPost={videoPost} onUnlike={handleUnlike} />
            ))}
          </ul>
        ) : (
          <div className="text-lg text-gray-500">No liked video posts found.</div>
        )}
      </div>

      {/* User Comments Section */}
      <div>
        <h1 className="text-3xl font-bold mb-4">User Comments</h1>
        {loading ? (
          <div className="text-lg text-gray-500">Loading...</div>
        ) : userComments.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {userComments.map((comment) => (
              <UserComments key={comment.commentId} comment={comment} />
            ))}
          </ul>
        ) : (
          <div className="text-lg text-gray-500">No comments found.</div>
        )}
      </div>
    </div>
  );
};

export default ReactionsManagement;
