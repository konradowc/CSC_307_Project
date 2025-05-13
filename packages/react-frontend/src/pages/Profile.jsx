//Profile.jsx
import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation as useRouterLocation
} from "react-router-dom";
import "./Profile.css"; // Import the CSS file

const Profile = () => {
  const routerLocation = useRouterLocation();
  const { newPost } = routerLocation.state || {};
  const [posts, setPosts] = useState([]);

  const username = "Jane Doe";
  const location = "City Name, CA";

  useEffect(() => {
    fetch("http://localhost:8000/api/posts?city=CityName")
      .then((r) => r.json())
      .then(setPosts)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (newPost?.title && newPost?.content) {
      setPosts((prevPosts) => [
        ...prevPosts,
        { id: prevPosts.length + 1, ...newPost }
      ]);
    }
  }, [newPost]);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-info">
          <h1 className="profile-username">{username}</h1>
          <p className="profile-location">{location}</p>
        </div>

        <Link to="/createPost" className="create-button">
          Create Blog Post
        </Link>
      </div>

      <h2 className="posts-heading">Blog Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul className="posts-list">
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              <div className="post-header">
                <h3 className="post-title">{post.title}</h3>
                <p>:</p>
                <p>10.12.25</p>
              </div>
              <p className="post-content">{post.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
