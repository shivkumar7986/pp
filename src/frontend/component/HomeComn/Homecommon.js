import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "../HomeComn/home.css";
const Homecommon = () => {
  const navigate = useNavigate();
  let getUsername = localStorage.getItem("username");

  console.log(getUsername);

  const isLogin = () => {
    let getUsername = localStorage.getItem("username");
    if (getUsername == "") {
      navigate("/login");
    }
  };
  useEffect(() => {
    isLogin();
  }, []);

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar />
          <div className="layout-page">
            <Navbar />
            <div className="content-wrapper">
              <Outlet />

              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homecommon;
