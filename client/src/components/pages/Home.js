import React, { useEffect, useState } from 'react';
import PostList from '../posts/PostList';
import postService from '../../services/postService';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.getPosts();
        setPosts(data);
      } catch (err) {
        setError(err.message || 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading posts...</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-5">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-center my-4">Latest Blog Posts</h1>
      <PostList posts={posts} />
    </div>
  );
};

export default Home;
