import React from 'react';
import PostItem from './PostItem';

const PostList = ({ posts, onDelete, isOwner = false }) => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          {posts.length === 0 ? (
            <div className="alert alert-info">No posts found</div>
          ) : (
            posts.map(post => (
              <PostItem 
                key={post.id} 
                post={post} 
                onDelete={onDelete}
                isOwner={isOwner}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PostList;
