import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // For backend image URL
  const [imagePublicId, setImagePublicId] = useState(null); // For Cloudinary delete
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const [userID, setUserID] = useState(
    "6801c14b792ac5e5f8f0e0c7"
  );
  const [city, setCity] = useState("City Name");

  useEffect(() => {
    fetch("http://localhost:8000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        const user = data.user;
        setUserID(user._id);
        setCity(user.city);
      })
      .catch(console.error);
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    // Send to backend
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (!res.ok)
        throw new Error(
          `Upload failed with status ${res.status}`
        );
      const data = await res.json();

      setImageUrl(data.imageUrl);
      setImagePublicId(data.publicId);
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed.");
    }
  };

  const handlePublish = () => {
    const newPost = {
      title,
      content,
      userID: userID,
      city: city,
      image: imageUrl,
      imagePublicId: imagePublicId
    };

    fetch("http://localhost:8000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newPost)
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((savedPost) => {
        navigate("/profile", {
          state: {
            newPost: {
              ...savedPost,
              image: imageUrl // Actual Cloudinary image
            }
          }
        });
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
          onChange={handleImageChange}
        />
        <label
          htmlFor="image-upload"
          className="add-image-inside"
        >
          Add Image
        </label>
      </div>

      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="preview-image"
          style={{
            marginTop: "1rem",
            width: "200px",
            borderRadius: "8px"
          }}
        />
      )}

      <div className="button-row">
        <button className="button" onClick={handlePublish}>
          Publish Blog Post
        </button>
      </div>
    </div>
  );
}
