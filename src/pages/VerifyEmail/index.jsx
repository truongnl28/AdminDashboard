import React, { useEffect, useRef, useState } from "react";
import "./verifyEmail.css";
import TickIcon from "../../assets/images/tickIcon.png";

function EmailVerify() {
  return (
    <div className="verifyEmail">
      <div className="verifyEmail-container">
        <div className="verifyEmail-image">
          <img src={TickIcon} alt="" />
        </div>
        <div className="verifyEmail-body">
          <h2>CHÚC MỪNG</h2>
          <p>Tài khoản của bạn đã xác thực gmail thành công</p>
        </div>
      </div>
    </div>
  );
}

export default EmailVerify;
