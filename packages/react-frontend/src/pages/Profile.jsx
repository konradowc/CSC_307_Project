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
    fetch("http://localhost:8000/api/posts?city=CityName")
    .then((r) => r.json())
    .then((fetchedPosts) => {
      if (newPost?.title && newPost?.content) {
        setPosts([...fetchedPosts, newPost]); // add image post
      } else {
        setPosts(fetchedPosts);
      }
    })
    .catch(console.error);
}, [newPost]);
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
