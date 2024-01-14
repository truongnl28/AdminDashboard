import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import SideBarItem from "./sidebar-item";

import "./styles.css";
import LogoutIcon from "../../assets/icons/logout.svg";

function SideBar({ menu, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(1);

  useEffect(() => {
    menu.forEach((element) => {
      if (location.pathname === element.path) {
        setActive(element.id);
      }
    });
  }, [location.pathname, menu]);

  const __navigate = (id) => {
    setActive(id);
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-header">
          <h1>REPURPOSE</h1>
        </div>

        <div className="sidebar-container">
          <div className="sidebar-items">
            {menu.map((item, index) => (
              <div key={index} onClick={() => __navigate(item.id)}>
                <SideBarItem active={item.id === active} item={item} />
              </div>
            ))}
          </div>

          <div
            className="sidebar-footer"
            onClick={() => {
              navigate("/login");
              onLogout();
            }}
          >
            <span className="sidebar-item-label">Đăng xuất</span>
            <img
              src={LogoutIcon}
              alt="icon-logout"
              className="sidebar-item-icon"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default SideBar;
