import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const PostView = ({ post, onDelete, isOwner }) => {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            {post.image_url && (
              <img 
                src={post.image_url} 
                className="card-img-top" 
                alt={post.title}
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            )}
            <div className="card-body">
              <h1 className="card-title">{post.title}</h1>
              <div className="card-text">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {post.content}
                </ReactMarkdown>
              </div>
              {isOwner && (
                <div className="mt-4">
                  <Link 
                    to={`/posts/${post.id}/edit`} 
                    className="btn btn-secondary me-2"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => onDelete(post.id)} 
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <div className="card-footer text-muted">
              Posted by {post.username} on {new Date(post.created_at).toLocaleDateString()}
            </div>
          </div>
          <Link to="/" className="btn btn-outline-primary mt-3">
            Back to Posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostView;
