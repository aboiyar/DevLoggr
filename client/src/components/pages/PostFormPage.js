import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostForm from '../posts/PostForm';
import postService from '../../services/postService';
import { useAuth } from '../../context/authContext';

const PostFormPage = ({ isEdit = false }) => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    imageUrl: ''
  });
  const [error, setError] = useState('');
  const { token } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isEdit && id) {
      const fetchPost = async () => {
        try {
          const data = await postService.getPost(id);
          setPost({
            title: data.title,
            content: data.content,
            imageUrl: data.image_url || ''
          });
        } catch (err) {
          setError('Failed to load post');
        }
      };
      fetchPost();
    }
  }, [isEdit, id]);

  const handleSubmit = async (formData) => {
    try {
      if (isEdit) {
        await postService.updatePost(id, formData, token);
      } else {
        await postService.createPost(formData, token);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to save post');
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">{isEdit ? 'Edit Post' : 'Create New Post'}</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <PostForm 
        onSubmit={handleSubmit} 
        initialData={post} 
        isEdit={isEdit} 
      />
    </div>
  );
};

export default PostFormPage;

