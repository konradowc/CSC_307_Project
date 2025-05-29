import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation as useRouterLocation
} from "react-router-dom";
import BlogPost from "../components/BlogPost";
import "./Profile.css";
import "../components/BlogPost.css";
import flowersImage from "../assets/flowers.png";

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

const Explore = () => {
  const routerLocation = useRouterLocation();
  const { newPost } = routerLocation.state || {};
  const [posts, setPosts] = useState([]);
  const [city, setCity] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    // Fetch user info, then fetch posts for that user
    fetch("http://localhost:8000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched user data:", data); // Add this
        const user = data.user;
        setCity(user.city);
        setUsername(user.name);
      }); // this will need to extract user data
  }, []);

  // make this set up to use user data

  //const city = "CityName"; //Update in Sprint 3 to use user data

  useEffect(() => {
    fetch(`http://localhost:8000/api/posts?city=${city}`)
      .then((r) => r.json())
      .then((fetchedPosts) => {
        const all = newPost
          ? [...fetchedPosts, newPost]
          : fetchedPosts;
        all.sort(
          (a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(all);
      })
      .catch(console.error);
  }, [newPost, city]);

  return (
    <div className="profile-container">
      <h1 className="heading" style={{ marginBottom: "1rem" }}>
        Welcome Back, {username}.
      </h1>
      <p style={{ fontSize: "1rem", marginBottom: "2rem" }}>
        Catch up on posts from people nearby!
      </p>

      <h2 className="posts-heading">
        Blog Posts{" "}
        <span className="post-count">{posts.length}</span>
      </h2>

      <ul className="posts-list">
        {posts.map((post) => (
          <BlogPost
            key={post._id}
            // the authorname and authoravatar doesn't work right now
            authorName={post.authorName}
            authorAvatar={post.authorAvatar}
            // need to fix the two things above
            title={post.title}
            content={post.content}
            date={formatDateTime(post.createdAt)}
            image={post.image}
          />
        ))}
      </ul>
    </div>
  );
};

export default Explore;
