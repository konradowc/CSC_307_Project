//CreatePost.jsx
import React, { useState } from "react";
import { useNavigate, useRevalidator } from "react-router-dom";
import "./CreatePost.css";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [publishedPosts, setPublishedPosts] = useState([]);
  const navigate = useNavigate();

  const handlePublish = () => {
    const newPost = {
      title,
      content,
      userID: "6801c14b792ac5e5f8f0e0c7",
      city: "CityName"
    };

    fetch("http://localhost:8000/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost)
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((savedPost) => {
        navigate("/profile", { state: { newPost: savedPost } });
      })
      .catch((err) => {
        console.error("Publish failed:", err);
        alert("Could not save your post.");
      });
  };

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
