import React from "react";
import BlogPost from "../components/BlogPost";
import "./Profile.css"; 
import "../components/BlogPost.css"; 
import flowersImage from "../assets/flowers.png";

const Explore = () => {
    const dummyPosts = [
        {
          id: 1,
          authorName: "John Doe",
          authorAvatar: flowersImage,
          title: "Blog Post 1",
          content: "Testing",
          date: "10.10.2025",
          image: flowersImage,
        },
        {
          id: 2,
          authorName: "Jane Smith",
          authorAvatar: flowersImage,
          title: "Blog Post 2",
          content: "Another blog post content goes here...",
          date: "10.10.2025",
          image: null,
        },
      ];

      return (
        <div className="profile-container">
          <h1 className="heading" style={{ marginBottom: "1rem" }}>
            Welcome Back, Jane Doe.
          </h1>
          <p style={{ fontSize: "1rem", marginBottom: "2rem" }}>
            Catch up on posts from people nearby!
          </p>
    
          <h2 className="posts-heading">
            Blog Posts <span className="post-count">{dummyPosts.length}</span>
          </h2>
    
          <ul className="posts-list">
            {dummyPosts.map((post) => (
              <BlogPost
                key={post.id}
                authorName={post.authorName}
                authorAvatar={post.authorAvatar}
                title={post.title}
                content={post.content}
                date={post.date}
                image={post.image}
              />
            ))}
          </ul>
        </div>
      );
    };
    
    export default Explore;
