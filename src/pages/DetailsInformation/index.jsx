import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
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
            <img
              src={
                user.image ??
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU"
              }
              className="profile-avatar"
              alt=""
            />
          </div>

          {/* Information section with labels and read-only input fields */}
          <div className="profile-info">
            <div className="">
              <label htmlFor="username">Tên người dùng</label>
              <input type="text" value={user.name} readOnly />
            </div>
            <div className="">
              <label htmlFor="email">Email</label>
              <input type="text" value={user.email} readOnly />
            </div>
            <div className="">
              <label htmlFor="phone">Số điện thoại</label>
              <input type="text" value={user.phoneNumber ?? "N/A"} readOnly />
            </div>
            <div className="">
              <label htmlFor="phoneVerify">Số điện thoại đã xác nhận</label>
              <input
                type="text"
                value={
                  user.phoneNumberConfirmed === true && user.phoneNumber
                    ? user.phoneNumber
                    : "N/A"
                }
                readOnly
              />
            </div>
            <div className="">
              <label htmlFor="dateCreateAccount">Ngày tạo tài khoản</label>
              <input
                type="text"
                value={moment(user.createAt).format("DD/MM/YYYY")}
                readOnly
              />
            </div>
            <div className="">
              <label htmlFor="status">Trạng thái</label>
              <input
                type="text"
                value={user.isDeleted === true ? "Offline" : "Active"}
                readOnly
              />
            </div>
            <div className="">
              <label htmlFor="points">Điểm của người dùng</label>
              <input type="text" value={user.point?.points ?? 0} readOnly />
            </div>
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
