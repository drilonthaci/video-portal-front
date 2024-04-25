import React, { useState, useEffect } from 'react';
import authService from '../Auth/Login/AuthService';
import { variables } from '../../Variables';

function CommentsList() {
  const [userComments, setUserComments] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user comments:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserComments();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">User Comments</h1>
      {userComments.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {userComments.map((comment) => (
            <li key={comment.commentId} className="py-2">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">{comment.commentText}</span>
                <span className="text-sm">{comment.videoPostName}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-lg text-gray-500">No comments found.</div>
      )}
    </div>
  );
}

export default CommentsList;