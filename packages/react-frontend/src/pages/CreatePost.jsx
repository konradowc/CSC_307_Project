import React, { useState } from "react";
import './CreatePost.css';

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [publishedPosts, setPublishedPosts] = useState([]);

    const handlePublish = () => {
        const newPost = {
            title,
            content,
        };
        setPublishedPosts([...publishedPosts, newPost]);
        setTitle("");
        setContent("");
    };

    return (
        <div className="container">
          <h1 className="heading">Create Blog Post</h1>
    
          <div className="form-group">
            <label className="label">Post Title</label>
            <input
              type="text"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
            />
          </div>
    
          <div className="form-group">
            <label className="label">Content</label>
            <textarea
              placeholder="Enter post content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="10"
              className="textarea"
            />
          </div>
    
          <button
            onClick={handlePublish}
            className="button"
          >
            Publish Blog Post
          </button>
    
          {publishedPosts.map((post, index) => (
            <div className="published-post" key={index}>
                <h2 className="published-title">{post.title}</h2>
                <p className="published-content">{post.content}</p>
            </div>
            ))}
    </div>
    );
}


    