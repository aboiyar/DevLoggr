import axios from 'axios';

const API_URL = '/api/posts';

// Create new post
const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, postData, config);
  return response.data;
};

// Get all posts
const getPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get user posts
const getUserPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/user`, config);
  return response.data;
};

// Get viewed posts
const getViewedPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/viewed`, config);
  return response.data;
};

// Get single post
const getPost = async (postId) => {
  const response = await axios.get(`${API_URL}/${postId}`);
  return response.data;
};

// Update post
const updatePost = async (postId, postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/${postId}`, postData, config);
  return response.data;
};

// Delete post
const deletePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${postId}`, config);
  return response.data;
};

// Upload image
const uploadImage = async (imageData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axios.post(`${API_URL}/upload`, imageData, config);
  return response.data;
};

const postService = {
  createPost,
  getPosts,
  getUserPosts,
  getViewedPosts,
  getPost,
  updatePost,
  deletePost,
  uploadImage,
};

export default postService;
