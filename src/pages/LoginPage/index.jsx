import React, { useState } from "react";
import "./loginPage.css";
import ImgDesktop from "../../assets/images/img-01.png";

function LoginPage({ onLogin }) {
  // State variables for managing username and password inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the provided username and password match the expected credentials
    if (username === "admin" && password === "admin123456") {
      // Call the onLogin callback to notify the parent component about successful login
      onLogin();
    } else {
      // Log an error message if login is unsuccessful
      console.log(
        "Đăng nhập không thành công. Vui lòng kiểm tra thông tin đăng nhập của bạn."
      );
    }
  };

  // Render the login form UI
  return (
    <div className="loginForm">
      <div className="loginForm-container">
        {/* Section for displaying an image */}
        <div className="loginForm-image">
          <img src={ImgDesktop} alt="IMG" />
        </div>

        {/* Section for the login form */}
        <div className="loginForm-form">
          <div className="loginForm-header">
            <h1>REPURPOSE</h1>
          </div>
          <form onSubmit={handleLogin}>
            {/* Input field for username */}
            <div className="input-group">
              <input
                type="text"
                name="username"
                placeholder="Tài khoản đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {/* Input field for password */}
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Button for submitting the login form */}
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
