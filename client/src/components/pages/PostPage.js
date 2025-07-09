import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostView from '../posts/PostView';
import postService from '../../services/postService';
import { useAuth } from '../../context/authContext';

const PostPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postService.getPost(id);
        setPost(data);
      } catch (err) {
        setError(err.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async (postId) => {
    try {
      await postService.deletePost(postId);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading post...</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-5">{error}</div>;
  }

  if (!post) {
    return <div className="alert alert-info mt-5">Post not found</div>;
  }

  const isOwner = user && user.id === post.user_id;

  return (
    <PostView 
      post={post} 
      onDelete={handleDelete} 
      isOwner={isOwner} 
    />
  );
};

export default PostPage;
