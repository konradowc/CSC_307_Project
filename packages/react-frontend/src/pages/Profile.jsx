import React, { useEffect, useState } from "react";
import "./Profile.css"; // Import the CSS file

const Profile = () => {
  const [posts, setPosts] = useState([]);

  const username = "Jane Doe";
  const location = "City Name, CA";

  useEffect(() => {
    const fetchPosts = async () => {
      const fakePosts = [
        {
          id: 1,
          title: "My First Blog Post",
          content: "This is my first post!"
        },
        {
          id: 2,
          title: "Another Day",
          content: "Today was a good day."
        }
      ];
      setPosts(fakePosts);
    };

    fetchPosts();
  }, []);

  return (
    <div className="profile-container">
      <h1 className="profile-username">{username}</h1>
      <p className="profile-location">{location}</p>

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
