import React from "react";
import "./SideBar.css";

function SideBar() {
  return (
    <>
    <div className="dashboard">
      <div className="sidebar">
        <div className="logo-container">
          <i className="ti ti-layout-dashboard logo-icon" />
          <div className="logo-text">Dashboard</div>
        </div>

        <div className="nav-items">
          <div className="nav-item active">
            <i className="ti ti-home nav-icon" />
            <div className="nav-text">Home</div>
          </div>

          <div className="nav-item">
            <i className="ti ti-user nav-icon" />
            <div className="nav-text">Profile</div>
          </div>

          <div className="nav-item">
            <i className="ti ti-messages nav-icon" />
            <div className="nav-text">Messages</div>
          </div>

          <div className="nav-item">
            <i className="ti ti-history nav-icon" />
            <div className="nav-text">History</div>
          </div>

          <div className="nav-item">
            <i className="ti ti-clipboard nav-icon" />
            <div className="nav-text">Tasks</div>
          </div>

          <div className="nav-item">
            <i className="ti ti-users nav-icon" />
            <div className="nav-text">Communities</div>
          </div>
        </div>

        <div className="bottom-nav">
          <div className="nav-item">
            <i className="ti ti-settings nav-icon" />
            <div className="nav-text">Setting</div>
          </div>

          <div className="nav-item">
            <i className="ti ti-help nav-icon" />
            <div className="nav-text">Support</div>
          </div>

          <div className="nav-item">
            <i className="ti ti-shield-lock nav-icon" />
            <div className="nav-text">Privacy</div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default SideBar;
