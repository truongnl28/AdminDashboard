import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import "./detailsPage.css";
import BackIcon from "../../assets/icons/left-arrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { deleteMember, getDetailMember } from "../../actions/member";

function DetailsInformationUser() {
  const dispatch = useDispatch();
  const detailMember = useSelector(
    (state) => state.detailMemberReducer.detailMember
  );

  // Access location and navigate from React Router
  const [user, setUser] = useState(undefined);
  const { userId } = useParams();
  const userIdChange = userId.split(":");
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getDetailMember(userId.split(":")[1]));
  }, [dispatch, userId]);
  useEffect(() => {
    if (userIdChange[1] === detailMember?.id) {
      setUser(detailMember);
    }
  }, [detailMember, userIdChange]);

  // Navigate back to the user management page
  const handleExit = () => {
    if (userIdChange[0] === "user") {
      navigate("/userManagement");
    } else {
      navigate("/transactionListItem");
    }
  };

  // Handle the logic for deleting the user account (to be implemented)
  const handleDelete = (id) => {
    // Confirm deletion with the user
    const isConfirmed = window.confirm(
      `Bạn có chắc muốn ${
        user?.isDeleted === true ? "khôi phục" : "xóa"
      } không?`
    );

    if (isConfirmed) {
      const data = {
        isDelete: user?.isDeleted === true ? false : true,
        userId: id,
      };
      dispatch(deleteMember(data));
    }
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
                user?.image ??
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
              <input
                type="text"
                value={user?.name ?? "Không có tên"}
                readOnly
              />
            </div>
            <div className="">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                value={user?.email ?? "Không có email"}
                readOnly
              />
            </div>
            <div className="">
              <label htmlFor="phone">Số điện thoại</label>
              <input type="text" value={user?.phoneNumber ?? "N/A"} readOnly />
            </div>
            <div className="">
              <label htmlFor="phoneVerify">Số điện thoại đã xác nhận</label>
              <input
                type="text"
                value={
                  user?.phoneNumberConfirmed === true && user?.phoneNumber
                    ? user?.phoneNumber
                    : "N/A"
                }
                readOnly
              />
            </div>
            <div className="">
              <label htmlFor="dateCreateAccount">Ngày tạo tài khoản</label>
              <input
                type="text"
                value={moment(user?.createAt).format("DD/MM/YYYY")}
                readOnly
              />
            </div>
            <div className="">
              <label htmlFor="status">Trạng thái</label>
              <input
                type="text"
                value={user?.isDeleted === true ? "Not active" : "Active"}
                readOnly
              />
            </div>
            <div className="">
              <label htmlFor="points">Điểm của người dùng</label>
              <input type="text" value={user?.point?.points ?? 0} readOnly />
            </div>
            <div className="">
              <label htmlFor="">Danh sách đánh giá</label>
              <button>Chi tiết</button>
            </div>
          </div>
        </div>

        {/* Button for deleting the user account */}
        <div className="btn">
          <button
            className={`${
              user?.isDeleted === true ? "restore-btn" : "delete-btn"
            }`}
            onClick={() => handleDelete(user?.id)}
          >
            {user?.isDeleted === true
              ? "Khôi phục tài khoản người dùng"
              : "Xóa tài khoản người dùng"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailsInformationUser;
