import React from "react";
import "../verifyEmail.css";
import TickIcon from "../../../assets/images/tickIcon.png";

function EmailVerifyCorrect() {
  return (
    <div className="verifyEmail">
      <div className="verifyEmail-container">
        <div className="verifyEmail-image">
          <img src={TickIcon} alt="" />
        </div>
        <div className="verifyEmailCorrect-body">
          <h2>CHÚC MỪNG</h2>
          <p>Tài khoản gmail của bạn đã xác thực thành công</p>
        </div>
      </div>
    </div>
  );
}

export default EmailVerifyCorrect;
