import React, { useState } from "react";
import "./loginPage.css";
import ImgDesktop from "../../assets/images/img-01.png";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123456") {
      onLogin();
    } else {
      console.log(
        "Đăng nhập không thành công. Vui lòng kiểm tra thông tin đăng nhập của bạn."
      );
    }
  };

  return (
    <div className="loginForm">
      <div className="loginForm-container">
        <div className="loginForm-image">
          <img src={ImgDesktop} alt="IMG" />
        </div>

        <div className="loginForm-form">
          <div className="loginForm-header">
            <h1>REPURPOSE</h1>
          </div>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="text"
                name="username"
                placeholder="Tài khoản đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="loginForm-button">
              <button className="loginBtn" type="submit">
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
