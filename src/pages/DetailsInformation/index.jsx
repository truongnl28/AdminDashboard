import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./detailsPage.css";
import BackIcon from "../../assets/icons/left-arrow.svg";

function DetailsInformationUser() {
  // Access location and navigate from React Router
  const location = useLocation();
  const { user } = location.state || {};
  const navigate = useNavigate();

  // Redirect to the user management page if user data is not available
  if (!user) {
    navigate("/userManagement");
    return null;
  }

  // Navigate back to the user management page
  const handleExit = () => {
    navigate("/userManagement");
  };

  // Handle the logic for deleting the user account (to be implemented)
  const handleDelete = () => {
    // Implement the logic for deleting the user account
  };

  // Render the detailed user information
  return (
    <div className="profile">
      <div className="profile-container">
        {/* Header with a back button and title */}
        <div className="profile-header">
          <img
            src={BackIcon}
            className="back-btn"
            alt=""
            onClick={handleExit}
          />
          <h2>Chi tiết người dùng</h2>
        </div>

        {/* Body containing user's profile image and information */}
        <div className="profile-body">
          <div className="profile-image">
            <img src={user.avatar} className="profile-avatar" alt="" />
          </div>

          {/* Information section with labels and read-only input fields */}
          <div className="profile-info">
            <div className="">
              <label htmlFor="username">Tên người dùng</label>
              <input type="text" value={user.username} readOnly />
            </div>
            {/* Additional user information fields */}
            {/* ... */}
          </div>
        </div>

        {/* Button for deleting the user account */}
        <div className="btn">
          <button className="delete-btn" type="delete" onClick={handleDelete}>
            Xóa tài khoản người dùng
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailsInformationUser;
