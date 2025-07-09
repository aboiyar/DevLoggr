import React, { useState, useEffect } from 'react';
import PostList from '../posts/PostList';
import postService from '../../services/postService';
import { useAuth } from '../../context/authContext';

const Profile = () => {
  const { user } = useAuth();
  const [viewedPosts, setViewedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchViewedPosts = async () => {
      try {
        const data = await postService.getViewedPosts();
        setViewedPosts(data);
      } catch (err) {
        setError(err.message || 'Failed to load viewed posts');
      } finally {
        setLoading(false);
      }
    };

    fetchViewedPosts();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading your profile...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Profile</h2>
              <p><strong>Username:</strong> {user?.username}</p>
              <p><strong>Email:</strong> {user?.email}</p>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <h3>Posts You've Viewed</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <PostList posts={viewedPosts} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
