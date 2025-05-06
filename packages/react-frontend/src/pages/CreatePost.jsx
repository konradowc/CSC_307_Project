import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [publishedPosts, setPublishedPosts] = useState([]);
  const navigate = useNavigate();

  const handlePublish = () => {
    const newPost = { title, content };
    navigate("/profile", { state: { newPost } });
  };

  /*const handlePublish = () => {
        const newPost = {
            title,
            content,
        };
        setPublishedPosts([...publishedPosts, newPost]);
        setTitle("");
        setContent("");
    };*/

  return (
    <div className="container">
      <h1 className="heading">Create Blog Post</h1>

      <div className="form-group textarea-container">
        <label className="label">Post Title</label>
        <input
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />
      </div>

      <div className="form-group textarea-container">
        <textarea
          placeholder="Enter post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="10"
          className="textarea"
        />
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
        />
        <label
          htmlFor="image-upload"
          className="add-image-inside"
        >
          Add Image
        </label>
      </div>

      <div className="button-row">
        <button className="button" onClick={handlePublish}>
          Publish Blog Post
        </button>
      </div>
    </div>
  );
}
