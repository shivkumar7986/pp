import React, { useState, useEffect } from "react";
import axios from "axios";

import "../../output.css";
import Image from "../sidebar/img/logo.png";
import "../sidebar/sidebar.css";
import { Link, useLocation } from "react-router-dom";
import linkJson from "../AdminLinks.json";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { mongopath } from "../../frontend/component/Mongopath/Mongopath";
const Sidebar = () => {
  const location = useLocation();

  const [menuData, setMenuData] = useState([]);
  const [activeInactive, setActiveInactive] = useState(false);
  useEffect(() => {
    fetchFormdata();
  }, []);
  const fetchFormdata = async () => {
    try {
      const response = await axios.get(`${mongopath}get-menuForm-data`);
      setMenuData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("error in fetching data ", error);
    }
  };

  const handleCollapseClick = (e) => {
    if (activeInactive) {
      setActiveInactive(false);
      localStorage.setItem("Collapse", "hide");
    } else {
      setActiveInactive(true);
      localStorage.setItem("Collapse", "open");
    }
    console.log(e);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    // Function to handle logout

    // Clear user credentials from local storage
    localStorage.removeItem("username");
    localStorage.removeItem("userID");

    // Redirect to the login page
    navigate("/login");
  };

  const checkStorage = localStorage.getItem("Collapse");
  console.log(checkStorage);
  return (
    <aside
      id="collapse"
      className={`w-72 bg-cyan-600 text-white h-screen transition-all left-side  ${
        checkStorage == "hide" ? "collapse_menu" : ""
      } `}
    >
      <div className="sidebar h-full">
        <ul className="flex flex-col h-full">
          <li>
            <a
              href="/#"
              className="flex items-center justify-start w-full ps-5 gap-x-3 text-white float-left py-3"
            >
              <img src={Image} alt="" className="object-cover object-left" />
            </a>
          </li>
          {linkJson &&
            linkJson.map((row, index) => (
              <li key={index} className={row.liClass}>
                <Link
                  to={row.link}
                  className={` ${
                    row.AClass
                  } flex items-center justify-start w-full ps-5 gap-x-3 float-left py-3 hover:bg-white hover:text-cyan-600 ${
                    row.class
                  }  ${
                    location.pathname === row.link
                      ? "active bg-white text-cyan-600"
                      : " "
                  } `}
                >
                  <i
                    className={`group ${row.icon} h-7 w-7 bg-cyan-500 text-white rounded-full flex items-center justify-center  first-line:`}
                    title={row.title}
                  ></i>
                  <span>{row.name}</span>
                </Link>
                <Tooltip
                  anchorSelect={`.${row.AClass} `}
                  place="right"
                  className="z-10"
                >
                  {row.name}
                </Tooltip>
              </li>
            ))}

          <li className="mt-auto">
            <a
              href="javascript:void(0);"
              onClick={handleLogout}
              className="flex items-center justify-start w-full ps-5 gap-x-3 float-left py-3 hover:bg-white hover:text-cyan-600 f-logout"
            >
              {" "}
              <i
                className="group fa fa-sign-out h-7 w-7 bg-cyan-500 text-white rounded-full flex items-center justify-center  first-line:"
                title="Log Out"
              ></i>{" "}
              <span>Log Out</span>
            </a>
          </li>
          <li className="mb-5">
            <button
              onClick={(e) => handleCollapseClick(e)}
              className="flex items-center justify-start w-full ps-5 gap-x-3 float-left py-3 hover:bg-white hover:text-cyan-600 for-new-style rounded-0 f-collapase"
            >
              {" "}
              <i className="group fa fa-outdent h-7 w-7 bg-cyan-500 text-white rounded-full flex items-center justify-center  first-line:"></i>
              <i className="group fa fa-indent h-7 w-7 bg-cyan-500 text-white rounded-full flex items-center justify-center  first-line: hidden"></i>
              <span>Collapse</span>
            </button>
          </li>

          <Tooltip anchorSelect=".f-logout" place="right" className="z-10">
            Log Out
          </Tooltip>
          <Tooltip anchorSelect=".f-collapase" place="right" className="z-10">
            Collapse
          </Tooltip>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
