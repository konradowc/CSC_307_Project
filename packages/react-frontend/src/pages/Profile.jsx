import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation as useRouterLocation
} from "react-router-dom";
import BlogPost from "../components/BlogPost";
import "./Profile.css";
import penLine from "../assets/pen-line.svg";

function formatDateTime(isoString, options = {}) {
  const date = new Date(isoString);
  if (isNaN(date)) return "";

  const defaults = {
    month: "short", // e.g. “May”
    day: "numeric", // e.g. “8”
    year: "numeric", // e.g. “2025”
    hour: "numeric", // e.g. “12”
    minute: "2-digit", // e.g. “11”
    hour12: true // AM/PM
  };

  return date.toLocaleString("en-US", {
    ...defaults,
    ...options
  });
}

const Profile = () => {
  const routerLocation = useRouterLocation();
  const { newPost } = routerLocation.state || {};
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("Jane Doe");
  const [state, setState] = useState("CA");
  const [city, setCity] = useState("City Name");

  const token = localStorage.getItem("authToken");

  // make it so that profile is updated with the users actual information
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
        setUsername(user.name);
        setState(user.state);
        setCity(user.city);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/api/posts?city=CityName")
      .then((r) => {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      })
      .then((fetchedPosts) => {
        const sorted = fetchedPosts
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt) - new Date(a.createdAt)
          );
        setPosts(sorted);
      })
      .catch(console.error);
  }, []);

  /*.then((r) => r.json())
      .then(setPosts)
      .catch(console.error);
  }, []);*/

  /*useEffect(() => {
    console.log("newPost received:", newPost);
    if (newPost?.title && newPost?.content) {
      setPosts((prevPosts) => [
        ...prevPosts,
        { id: prevPosts.length + 1, ...newPost }
      ]);
    }
  }, [newPost]);*/

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-info">
          <div className="avatar-placeholder" />
          <div>
            <h1 className="profile-username">{username}</h1>
            <p className="profile-location">
              {city}, {state}
            </p>
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
              date={formatDateTime(post.createdAt)}
              isOwner={true} // because it's your profile
              onDelete={() => handleDelete(post.id)} // example
              image={post.image} // Added image
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
