import React, { useState, useEffect } from 'react';
import { variables } from '../../Variables';
import authService from '../Auth/Login/AuthService';


function LikesPage() {
    const [likedVideoPosts, setLikedVideoPosts] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
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
          setLoading(false);
        } catch (error) {
          console.error('Error fetching liked video posts:', error);
          setLoading(false);
        }
      };
  
      fetchLikedVideoPosts();
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
        <h1 className="text-3xl font-bold mb-4">Liked Video Posts</h1>
        {likedVideoPosts.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {likedVideoPosts.map((videoPost) => (
              <li key={videoPost.videoPostId} className="py-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">{videoPost.videoPostName}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-lg text-gray-500">No liked video posts found.</div>
        )}
      </div>
    );
  }
  
  export default LikesPage;