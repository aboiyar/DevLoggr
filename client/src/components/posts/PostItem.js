import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const PostItem = ({ post, onDelete, isOwner }) => {
  return (
    <div className="card mb-4">
      {post.image_url && (
        <img 
          src={post.image_url} 
          className="card-img-top" 
          alt={post.title}
          style={{ maxHeight: '300px', objectFit: 'cover' }}
        />
      )}
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <div className="card-text">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {post.content.length > 200 
              ? `${post.content.substring(0, 200)}...` 
              : post.content}
          </ReactMarkdown>
        </div>
        <Link to={`/posts/${post.id}`} className="btn btn-primary mt-2">
          Read More
        </Link>
        {isOwner && (
          <div className="mt-3">
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
  );
};

export default PostItem;
