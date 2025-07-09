import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import postService from '../../services/postService';

const PostForm = ({ onSubmit, initialData = {}, isEdit = false }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    content: initialData.content || '',
    imageUrl: initialData.image_url || '',
  });
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState(initialData.image_url || '');
  const [isUploading, setIsUploading] = useState(false);

  const { title, content, imageUrl } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onContentChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const res = await postService.uploadImage(formData);
      setFormData(prev => ({ ...prev, imageUrl: res.imageUrl }));
      setPreviewImage(res.imageUrl);
    } catch (err) {
      setError(err.message || 'Image upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">
                {isEdit ? 'Edit Post' : 'Create New Post'}
              </h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={title}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">Content</label>
                  <MDEditor
                    value={content}
                    onChange={onContentChange}
                    height={400}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Header Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                  {isUploading && <div className="mt-2">Uploading image...</div>}
                  {previewImage && (
                    <div className="mt-3">
                      <img 
                        src={previewImage} 
                        alt="Preview" 
                        className="img-fluid rounded"
                        style={{ maxHeight: '200px' }}
                      />
                    </div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary">
                  {isEdit ? 'Update Post' : 'Create Post'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
