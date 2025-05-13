import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation as useRouterLocation
} from "react-router-dom";
import BlogPost from "../components/BlogPost";
import "./Profile.css";
import penLine from "../assets/pen-line.svg";

const Profile = () => {
  const routerLocation = useRouterLocation();
  const { newPost } = routerLocation.state || {};
  const [posts, setPosts] = useState([]);

  const username = "Jane Doe";
  const location = "City Name, CA";

  useEffect(() => {
    const hardcodedPost = {
      id: "test-0",
      title: "Hardcoded Test Post",
      content: "This is a sample blog post to test styling.",
      date: "05.10.25"
    };

    const fetchedPosts = [
      hardcodedPost,
      {
        id: "test-1",
        title: "Sample Post",
        content: "This is another post.",
        date: "05.10.26"
      }
    ];

    setPosts(fetchedPosts);
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
          <div className="avatar-placeholder" />
          <div>
            <h1 className="profile-username">{username}</h1>
            <p className="profile-location">{location}</p>
          </div>
        </div>

        <Link to="/createPost" className="create-button">
          <img
            src={penLine}
            alt="Create"
            className="pen-icon"
          />
          Create Blog Post
        </Link>
      </div>

      <h2 className="posts-heading">
        Blog Posts{" "}
        <span className="post-count">{posts.length}</span>
      </h2>

      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul className="posts-list">
          {posts.map((post) => (
            <BlogPost
              key={post.id}
              title={post.title}
              content={post.content}
              date={post.date}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
