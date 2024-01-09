import React, { useEffect, useState } from "react";
import BackIcon from "../../assets/icons/left-arrow.svg";
import "./pointExchange.css";

function DetailPointExchange() {
  const handleExit = () => {};

  return (
    <div className="detailPoint">
      <div className="detailPoint-container">
        <div className="detailPoint-header">
          <img
            src={BackIcon}
            className="back-btn"
            alt=""
            onClick={handleExit}
          />
          <h2>Chi tiết trao đổi điểm</h2>
        </div>

        <div className="detailPoint-body">
          <div className="detailPoint-row">
            {/* Column 1 */}
            <div className="detailPoint-column">
              <div className="detailPoint-image">
                <img src="" className="detailPoint-avatar" alt="" />
              </div>
              <div className="">
                <label htmlFor="">Tên món đồ</label>
                {/* <input type="text" value={user?.point?.points ?? 0} readOnly /> */}
              </div>
              <div className="">
                <label htmlFor="">Danh mục</label>
                {/* <input type="text" value={user?.point?.points ?? 0} readOnly /> */}
              </div>
              <div className="">
                <label htmlFor="">Điểm của món đồ</label>
                {/* <input type="text" value={user?.point?.points ?? 0} readOnly /> */}
              </div>
            </div>

            {/* Column 2 */}
            <div className="detailPoint-column">
              <div className="">
                <label htmlFor="">Tên người cho</label>
                {/* <input type="text" value={user?.point?.points ?? 0} readOnly /> */}
              </div>
              <div className="">
                <label htmlFor="">Số điểm thay đổi</label>
                {/* <input type="text" value={user?.point?.points ?? 0} readOnly /> */}
              </div>
              <div className="">
                <label htmlFor="">Số điểm còn lại</label>
                {/* <input type="text" value={user?.point?.points ?? 0} readOnly /> */}
              </div>
            </div>

            {/* Column 3 */}
            <div className="detailPoint-column">
              <div className="">
                <label htmlFor="">Tên người nhận</label>
                {/* <input type="text" value={user?.point?.points ?? 0} readOnly /> */}
              </div>
              <div className="">
                <label htmlFor="">Số điểm thay đổi</label>
                {/* <input type="text" value={user?.point?.points ?? 0} readOnly /> */}
              </div>
              <div className="">
                <label htmlFor="">Số điểm còn lại</label>
                {/* <input type="text" value={user?.point?.points ?? 0} readOnly /> */}
              </div>
            </div>
          </div>
        </div>

        <div className="btn">
          <button className="refundPoints">Hoàn trả điểm</button>
        </div>
      </div>
    </div>
  );
}

export default DetailPointExchange;
