import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostList from '../posts/PostList';
import postService from '../../services/postService';
import { useAuth } from '../../context/authContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const data = await postService.getUserPosts();
        setPosts(data);
      } catch (err) {
        setError(err.message || 'Failed to load your posts');
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await postService.deletePost(postId);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading your posts...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Your Dashboard</h1>
        <Link to="/posts/new" className="btn btn-primary">
          Create New Post
        </Link>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <PostList 
        posts={posts} 
        onDelete={handleDelete} 
        isOwner={true} 
      />
    </div>
  );
};

export default Dashboard;
