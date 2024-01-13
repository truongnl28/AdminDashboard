import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import "../DetailsInformation/detailsPage.css";
import BackIcon from "../../assets/icons/left-arrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { getDetailItem } from "../../actions/item";

function DetailProduct() {
    const dispatch = useDispatch();
    const detailItem = useSelector(
      (state) => state.detailItemReducer.detailItem
    );

    // Access location and navigate from React Router
    const [user, setUser] = useState(undefined);
    console.log(user)
    const { itemId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
      dispatch(getDetailItem(itemId));
    }, [dispatch, itemId]);
    useEffect(() => {
      if (itemId === detailItem?.itemdetail?.id) {
        setUser(detailItem?.itemdetail);
      }
    }, [detailItem, itemId]);

    // Navigate back to the user management page
    const handleExit = () => {
        navigate("/listOfItems");
      
    };

    const handleDetailRegister = (id) => {
      navigate(`/detailedInformationReceived/${id}`);
    
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
          <h2>Chi tiết món đồ</h2>
        </div>

        {/* Body containing user's profile image and information */}
        <div className="profile-body">
          <div className="profile-image">
            <img
              src={
                user?.images[0]?.imageUrl ??
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU"
              }
              className="profile-avatar"
              alt=""
            />
          </div>

          {/* Information section with labels and read-only input fields */}
          <div className="profile-info">
            <div className="">
              <label htmlFor="username">Tên chủ sở hữu</label>
              <input
                type="text"
                value={user?.giver?.name ?? "Không có tên"}
                readOnly
              />
            </div>
            <div className="">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                value={user?.giver?.email ?? "Không có email"}
                readOnly
              />
            </div>
            <div className="">
              <label htmlFor="phone">Số điện thoại</label>
              <input type="text" value={user?.giver?.phoneNumber ?? "N/A"} readOnly />
            </div>
            <div className="">
              {/* <label htmlFor="phoneVerify">Số điện thoại đã xác nhận</label> */}
              {/* <input
                type="text"
                value={
                  user?.phoneNumberConfirmed === true && user?.phoneNumber
                    ? user?.phoneNumber
                    : "N/A"
                }
                readOnly
              /> */}
            </div>
            <div className="">
              <label htmlFor="dateCreateAccount">Ngày tạo tài khoản</label>
              <input
                type="text"
                value={moment(user?.giver?.createAt).format("DD/MM/YYYY")}
                readOnly
              />
            </div>
            <div className="">
              <label htmlFor="status">Trạng thái của chủ sở hữu</label>
              <input
                style={{color:`${user?.giver?.isDeleted === true ?"red":"blue"}`}}
                type="text"
                value={user?.giver?.isDeleted === true ? "Not active" : "Active"}
                readOnly
              />
            </div>
            <div className="">
              <label htmlFor="">Tên món đồ</label>
              <input type="text" value={user?.name ??0} readOnly />
            </div>
            <div className="">
              <label htmlFor="">Danh mục</label>
              <input type="text" value={user?.category?.name ??0} readOnly />
            </div>
            <div className="">
              <label htmlFor="points">Mô tả</label>
              <input type="text" value={user?.description??0} readOnly />
            </div>
            <div className="">
              <label htmlFor="">Số lượng</label>
              <input type="text" value={user?.quantity?? 0} readOnly />
            </div>
            <div className="">
              <label htmlFor="points">Điểm</label>
              <input type="text" value={user?.point ?? 0} readOnly />
            </div>
            <div className="">
              <label htmlFor="">Thời gian đến nhận</label>
              <input type="text" value={moment(user?.pickupTime).format("DD/MM/YYYY")} readOnly />
            </div>
            <div className="">
              <label htmlFor="">Ngày hết hạn</label>
              <input type="text" value={moment(user?.duration).format("DD/MM/YYYY")} readOnly />
            </div>
            <div className="">
              <label htmlFor="">Địa chỉ</label>
              <input type="text" value={user?.location?.address ?? 0} readOnly />
            </div>
            <div className="button-container">
              <label htmlFor="">Danh sách người đăng ký nhận</label>
              <button className="profile-btn-details"
              onClick={()=>handleDetailRegister(user?.id)}
              >Chi tiết</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
