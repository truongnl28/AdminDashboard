import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./detailsPage.css";
import BackIcon from "../../assets/icons/left-arrow.svg";

function DetailsInformationUser() {
  const location = useLocation();
  const { user } = location.state || {};
  const navigate = useNavigate();

  if (!user) {
    navigate("/userManagement");
    return null;
  }

  const handleExit = () => {
    navigate("/userManagement");
  };

  const handleDelete = () => {};

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-header">
          <img
            src={BackIcon}
            className="back-btn"
            alt=""
            onClick={handleExit}
          />
          <h2>Chi tiết người dùng</h2>
        </div>

        <div className="profile-body">
          <div className="profile-image">
            <img src={user.avatar} className="profile-avatar" alt="" />
          </div>
          <div className="profile-info">
            <div className="">
              <label htmlFor="username">Tên người dùng</label>
              <input type="text" value={user.username} readOnly />
            </div>
            <div className="">
              <label htmlFor="email">Email</label>
              <input type="text" value={user.email} readOnly />
            </div>
            <div className="">
              <label htmlFor="phoneNumbers">Số điện thoại</label>
              <input type="text" value={user.phone} readOnly />
            </div>
            <div className="">
              <label htmlFor="verifyPhoneNumbers">
                Số điện thoại đã xác minh
              </label>
              <input type="text" value={user.verifiedPhone} readOnly />
            </div>
            <div className="">
              <label htmlFor="accountCreationDate">Ngày tạo tài khoản</label>
              <input type="text" value={user.creationDate} readOnly />
            </div>
            <div className="">
              <label htmlFor="status">Trạng thái</label>
              <input type="text" value={user.status} readOnly />
            </div>
            <div className="">
              <label htmlFor="point">Điểm của người dùng</label>
              <input type="text" value={user.points} readOnly />
            </div>
          </div>
        </div>

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
