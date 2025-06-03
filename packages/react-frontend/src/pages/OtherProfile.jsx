import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogPost from "../components/BlogPost";
import "./Profile.css";

const OtherProfile = () => {
  const { userId } = useParams(); // assuming route is like /users/:userId
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  // For connecting to backend

  // useEffect(() => {
  //   // Simulate user fetching
  //   fetch(BACKEND_URL + `/api/users/${userId}`)
  //     .then((res) => res.json())
  //     .then(setUser)
  //     .catch(console.error);

  //   // Fetch posts by that user
  //   fetch(BACKEND_URL + `/api/posts?userId=${userId}`)
  //     .then((r) => r.json())
  //     .then(setPosts)
  //     .catch(console.error);
  // }, [userId]);

  // hardcoded for now

  useEffect(() => {
    const mockUser = {
      id: userId,
      name: "",
      location: ""
    };

    const mockPosts = [
      {
        id: 1,
        title: "Blog Post Title",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        date: "10.10.2025"
      },
      {
        id: 2,
        title: "Another Post",
        content:
          "Vestibulum auctor ornare leo, non suscipit magna...",
        date: "10.11.2025"
      }
    ];

    // Set immediately
    setUser(mockUser);
    setPosts(mockPosts);
  }, [userId]);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-info">
          <div className="avatar-placeholder" />
          <div>
            <h1 className="profile-username">{user.name}</h1>
            <p className="profile-location">{user.location}</p>
          </div>
        </div>
        {/* No create button */}
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
              isOwner={false} // don't show menu
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default OtherProfile;
