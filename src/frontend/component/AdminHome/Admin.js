import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGooglePlusSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import "../AdminHome/Css.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaTwitterSquare } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import { mongopath } from "../Mongopath/Mongopath";
import AdminFooter from "./AdminFooter";
import "../../../frontend/Common.css";
const Admin = () => {
  const [menuData, setMenuData] = useState([]);

  const [pages, setPages] = useState([]);
  const [data, setData] = useState([]);

  //to fetch data from menu
  useEffect(() => {
    fetchMenudataHeader();
  }, []);

  const fetchMenudataHeader = async () => {
    try {
      const response = await axios.get(
        `${mongopath}get/menu/front-page/header/data`
      );
      // const data = await response.json();
      setMenuData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  //to fetch data from page
  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch(`${mongopath}get-form-data`);
      // const data = await response.json();
      setPages(response.data);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching pages:", error);
    }
  };
  const handleClick = async (menuData) => {
    if (menuData.urlLink) {

      window.open(menuData.urlLink, "_blank")
      // window.location.href = menuData.urlLink; // Redirect to the provided URL
    } else {
      try {
        const response = await axios.get(
          `${mongopath}get-forntend-data/${menuData.menulink}`
        );

        console.log(response.data)
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const handleSubmenuClick = async (menudata) => {
    console.log("Submenu clicked:", menudata); 
    if (menudata.subUrlLink) {
      window.open(menudata.subUrlLink, "_blank");
    }

      else{
      try {
        const response = await axios.get(
          `${mongopath}get-forntend-data/${menudata.submenulink}`
        );
        console.log("Response:", response.data); // Check if this logs any data
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }}
  }

  // console.log(data)
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse top-nabar admin-navbar"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="https://twitter.com/?lang=en">
                  <FaTwitterSquare className="twitter" />
                </Link>
              </li>
              <li className="nav-item">
                <Link to="https://www.facebook.com/">
                  <FaFacebookSquare className="facebook" />
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="https://www.youtube.com/">
                  <IoLogoYoutube className="youtube" />
                </Link>
              </li>
              <li className="nav-item">
                <Link to="https://in.linkedin.com/">
                  <FaLinkedin className="linkdin" />
                </Link>
              </li>
              <li className="nav-item">
                <Link to="https://www.google.com/">
                  <FaGooglePlusSquare
                    className=" google
          "
                  />
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search the site.."
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Go
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="row py-4">
        <div className="col-md-8 logocms ">
          {" "}
          <Link> CMSezee </Link>
        </div>
        <div className="col-md-4 d-flex  justify-content-around">
          <div>
            <IoCall className="call" />
          </div>
          <div>
            <p className="mt-4">Call us today 1800 100 1800</p>
          </div>

          <div>
            {" "}
            <IoMdMail className="mail" />
          </div>
          <div className="mt-4">
            <a href="mailto:enquer@website.com">Send email</a>
          </div>
        </div>
      </div>

      <nav className=" py-2">
        <ul className=" d-flex  list-unstyled">
          {menuData.map((menudata) => (
            <>
              {menudata.submenu.length > 0 ? (
                <li className="mx-3">
                  <Link
                    className="btn btn-secondary drop-btn dropdown-toggle admin-dropdown"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={() => handleClick(menudata)}
                    to={menudata.pageData.slug}
                  >
                    {menudata.menuName}
                  </Link>
                  <ul className="dropdown-menu adminPage">
                    {menudata.submenu.map((submenuItem) => (
                      <li key={submenuItem._id} className="drop-list">
                        <Link className="dropdown-item" to={submenuItem.slug}>
                          <Link
                            className=""
                            onClick={() => handleSubmenuClick(submenuItem)}
                          >
                            {submenuItem.submenuName}
                          </Link>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li class="mx-3">
                  <Link
                    to={menudata.pageData.slug}
                    className="pageName without-drop font-weight-bold"
                    onClick={() => handleClick(menudata)}
                  >
                    {menudata.menuName}
                  </Link>
                </li>
              )}
            </>
          ))}
        </ul>
      </nav>
      {data && (
        <div className="editorContent">
          <h2 className="headingContent">{data.name}</h2>
          {/* <div>{data.editorContent}</div> */}
          <div dangerouslySetInnerHTML={{ __html: data.editorContent }} />
        </div>
      )}
      <div className="footer-admin">
        {" "}
        <AdminFooter />{" "}
      </div>
    </div>
  );
};

export default Admin;
