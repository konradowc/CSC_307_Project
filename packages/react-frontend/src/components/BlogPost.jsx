import React, { useState, useEffect, useRef } from "react";
import "./BlogPost.css";
import ellipsisVertical from "../assets/ellipsis-vertical.svg";
import circleSpacer from "../assets/circleSpacer.svg";
import trash from "../assets/trash.svg";
import trashRed from "../assets/trash-red.svg";
import closeIcon from "../assets/x.svg";

const BlogPost = ({
  authorName,
  authorAvatar,
  authorState,
  authorCity,
  title,
  content,
  image,
  date,
  onDelete,
  isOwner = false // New prop to control access to the menu
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const menuRef = useRef(null);

  const dateObj = date ? new Date(date) : new Date();

  const formattedDate = dateObj.toLocaleDateString("en-US", {
    month: "numeric", // e.g. "May"
    day: "numeric", // e.g. "7"
    year: "numeric" // e.g. "2025"
  });

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleDeleteClick = () => {
    setIsPopupOpen(true);
    setIsMenuOpen(false);
  };

  const handleConfirmDelete = () => {
    if (onDelete) onDelete();
    setIsPopupOpen(false);
  };

  const handleCancelDelete = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <li className="blogpost-item">
      {authorName && (
        <div className="blogpost-author">
          <img
            src={authorAvatar}
            alt={authorName}
            className="author-avatar"
          />
          <div>
            <h3 className="author-name">{authorName}</h3>
            <p className="author-location">
              {authorCity}, {authorState}
            </p>
          </div>
        </div>
      )}
      <div className="blogpost-header">
        <div className="blogpost-header-text">
          <h3 className="blogpost-title">{title}</h3>
          <img
            src={circleSpacer}
            alt="spacer between blog title and date"
            className="post-options-icon"
          />
          <p className="blogpost-date">{date}</p>
        </div>

        {isOwner && (
          <div className="menu-container" ref={menuRef}>
            <img
              src={ellipsisVertical}
              alt="Menu"
              className="post-options-icon"
              onClick={toggleMenu}
            />
            {isMenuOpen && (
              <div className="menu-overlay">
                <button
                  className="menu-button"
                  onClick={handleDeleteClick}
                >
                  <img
                    src={trash}
                    alt="trash icon"
                    className="menu-icon"
                  />
                  <span className="menu-button-text">
                    Delete Blog Post
                  </span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="blogpost-content">{content}</p>
      {image && (
        <div className="blogpost-image-wrapper">
          <img
            src={image}
            alt="Blog post visual"
            className="blogpost-image"
          />
        </div> // Adding image in blog post
      )}
      {/* Popup for delete confirmation */}
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <button
              className="popup-close"
              onClick={handleCancelDelete}
            >
              <img src={closeIcon} alt="Close" />
            </button>
            <img
              src={trashRed}
              alt="trash icon"
              className="popup-icon"
            />
            <h2>Are you sure?</h2>
            <p>
              Do you really want to delete this message? This
              process cannot be undone.
            </p>
            <div className="popup-actions">
              <button onClick={handleCancelDelete}>
                Cancel
              </button>
              <button onClick={handleConfirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default BlogPost;
