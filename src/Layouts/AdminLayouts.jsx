import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Common/sidebar/Sidebar";
import Header from "../Common/rigntpannel/Header";
import Footer from "../Common/rigntpannel/footer";
const AdminLayouts = () => {
  const navigate = useNavigate();
  let getUsername = localStorage.getItem("username");

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
      <div className="App flex">
        <Sidebar />
        <aside className="w-full h-screen bg-gray-100 position-relative right-pannel overflow-x-auto">
          <Header />
          <div className="Layout ms-5">
            <Outlet />
          </div>
          <Footer />
        </aside>
      </div>
    </>
  );
};

export default AdminLayouts;
