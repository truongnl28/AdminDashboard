import React from "react";
import "../verifyEmail.css";
import TickIcon from "../../../assets/images/incorrectIcon.png";

function EmailVerifyIncorrect() {
  return (
    <div className="verifyEmail">
      <div className="verifyEmail-container">
        <div className="verifyEmail-image">
          <img src={TickIcon} alt="" />
        </div>
        <div className="verifyEmailIncorrect-body">
          <h2>THẤT BẠI</h2>
          <p>Tài khoản gmail của bạn xác thực không thành công</p>
        </div>
      </div>
    </div>
  );
}

export default EmailVerifyIncorrect;
