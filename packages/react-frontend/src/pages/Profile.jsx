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
  const [userID, setUserID] = useState(
    "6801c14b792ac5e5f8f0e0c0"
  );
  const [profileimage, setProfileImage] = useState(null);

  // make it so that profile is updated with the users actual information
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
        const user = data.user;
        setUsername(user.name);
        setState(user.state);
        setCity(user.city);
        setUserID(user._id);
        setProfileImage(user.profile_picture || null);

        // Then fetch posts for that user
        return fetch(
          `http://localhost:8000/api/posts?userID=${user._id}`
        );
      })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
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

  async function handleDelete(postID) {
    // need to make this so that it actually deletes the post from the users account
    try {
      const response = await fetch(
        `http://localhost:8000/api/posts/${postID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to delete post."
        );
      }

      const data = await response.json();
      console.log("post deleted successfully:", data);

      setPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== postID)
      );
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  }

  // need to add profile picture in
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-info">
          {profileimage ? (
            <img
              src={profileimage}
              alt="Profile"
              className="profile-avatar"
            />
          ) : (
            <div className="avatar-placeholder" />
          )}
          <div>
            <h1 className="profile-username">{username}</h1>
            <p className="profile-location">
              {city}, {state}
            </p>
          </div>
        </div>

        <Link
          to="/createPost"
          className="create-button"
          title="Create Blog Post"
        >
          <img
            src={penLine}
            alt="Create"
            className="pen-icon"
          />
          <span>Create Blog Post</span>
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
              key={post._id}
              title={post.title}
              content={post.content}
              date={formatDateTime(post.createdAt)}
              isOwner={true} // because it's your profile
              onDelete={() => handleDelete(post._id)} // example
              image={post.image} // Added image
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
