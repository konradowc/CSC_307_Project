import React, { useState, useEffect, useRef } from "react";
import "./BlogPost.css";
import ellipsisVertical from "../assets/ellipsis-vertical.svg";
import circleSpacer from "../assets/circleSpacer.svg";
import trash from "../assets/trash.svg";
import trashRed from "../assets/trash-red.svg";
import closeIcon from "../assets/x.svg";

const BlogPost = ({
  title,
  content,
  date = "10.12.25",
  onDelete
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Create a ref for the menu to check if a click was outside it
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleDeleteClick = () => {
    setIsPopupOpen(true);
    setIsMenuOpen(false); // Close the menu after selecting "Delete Blog Post"
  };

  const handleConfirmDelete = () => {
    onDelete(); // Call onDelete passed from the parent component
    setIsPopupOpen(false); // Close the popup after deletion
  };

  const handleCancelDelete = () => {
    setIsPopupOpen(false); // Close the popup if canceled
  };

  // Add an event listener to close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click was outside of the menu
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false); // Close the menu if clicked outside
      }
    };

    // Attach the event listener when the menu is open
    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    // Cleanup the event listener when the component is unmounted or the menu is closed
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <li className="blogpost-item">
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
        <div className="menu-container" ref={menuRef}>
          <img
            src={ellipsisVertical}
            alt="Menu"
            className="post-options-icon"
            onClick={toggleMenu} // Toggle menu on click
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
      </div>
      <p className="blogpost-content">{content}</p>

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
              process can not be undone.
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
