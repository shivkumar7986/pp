import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { TbUsersPlus } from "react-icons/tb";
import { MdOutlineSegment } from "react-icons/md";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import General from "./TabData/General";
import "./global.css";
import Blog from "./TabData/Blog";
import Product from "./TabData/Product";
import SMTP from "./TabData/SMTP";
import Template from "./TabData/Template";
import Images from "./TabData/Image";
const Globalhome = () => {
  const [key, setKey] = useState("general");
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // Navigate back one step
  };
  return (
    <div className="container">
      <nav
        style={styles.inNav}
        className="layout-navbar navbar navbar-expand-xl navbar-detached align-items-center "
        id="layout-navbar"
      >
        {/* <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
          <a
            className="nav-item nav-link px-0 me-xl-4"
            href="javascript:void(0)"
          >
            <i className="bx bx-menu bx-sm" />
          </a>
        </div> */}
        <div
          className="navbar-nav-right d-flex align-items-center"
          id="navbar-collapse"
        >
          <div className="navbar-nav align-items-center mt-4">
            <div className="nav-item d-flex align-items-center">
              <ul className="navbar-nav flex-row align-items-center ms-auto">
                <li className="nav-item lh-1 me-3">
                  <div className="title">
                    <h4
                      className="align-items-center"
                      leftIcon={<MdOutlineSegment />}
                     >
                      Global Settings
                    </h4>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <ul className="navbar-nav flex-row align-items-center ms-auto">
            <li className="nav-item lh-1 me-3">
              {" "}
              <Link to="/admin/addNewPost">
                {" "}
                <Button leftIcon={<TbUsersPlus />} size="md" style={styles.btn}>
                  New Post
                </Button>
              </Link>
            </li>
            <li className="nav-item lh-1 me-3">
              <Button
                onClick={goBack}
                leftIcon={<IoMdArrowBack />}
                style={styles.btn}
              >
                Back
              </Button>
            </li>
            <li className="nav-item lh-1 me-3">
              <Button leftIcon={<MdOutlineCancel />} style={styles.btn}>
                Cancel
              </Button>
            </li>
          </ul>
        </div>
      </nav>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="general" title="General">
          <General />
        </Tab>

        <Tab eventKey="blog" title="Blog">
          <Blog/>
        </Tab>

        <Tab eventKey="product" title="Products">

          <Product/>
        </Tab>

        <Tab eventKey="smtp" title="SMTP">
          <SMTP/>
        </Tab>

        <Tab eventKey="template" title="404 Template">
          <Template/>
        </Tab>
        <Tab eventKey="image gallery" title="Image Gallery">

<Images/>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Globalhome;

const styles = {
  btn: {
    color: "#fff",
    borderRadius: "1px",
    backgroundColor: " #1E8FC6",
  },
  pageManager: {
    position: "fixed",
    top: "25%",
  },
};
