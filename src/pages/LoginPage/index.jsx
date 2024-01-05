import React, { useEffect, useRef, useState } from "react";
import "./loginPage.css";
import ImgDesktop from "../../assets/images/img-01.png";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
function LoginPage() {
  // State variables for managing username and password inputs
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const userRef = useRef(null);
  const errRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (userRef && userRef.current) {
      userRef.current.focus();
    }
  }, []);

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "Authens",
        JSON.stringify({ email, password, deviceToken: "string" }),
        {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data?.login));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.data?.login?.accessToken;
      const refreshToken = response?.data?.data?.login?.refreshToken;
      const decodedToken = jwtDecode(accessToken);
      const roles = decodedToken.role;
      console.log("hello", roles);
      const authData = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        roles: roles,
        // Các thông tin khác cần thiết
      };
      localStorage.setItem("auth", JSON.stringify(authData));
      // setAuth({roles, accessToken });
      setUsername("");
      setPassword("");
      if (roles === "Admin") {
        const from = "/";
        navigate(from, { replace: true });
      } else {
        navigate("/unauthorized");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Đăng nhập thất bại");
      } else if (err.response?.status === 404) {
        setErrMsg("Sai tài khoản hoặc mật khẩu");
      } else if (err.response?.status === 401) {
        setErrMsg("Bạn không có quyền đăng nhập vào");
      } else {
        setErrMsg("Lỗi sever, xin mời kiểm tra");
      }
      if (errRef && errRef.current) {
        errRef.current.focus();
      }
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
                value={email}
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
            <div className="text-error">
              <p ref={errRef} aria-live="assertive">
                {errMsg}
              </p>
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
