import React from "react";
import { useState } from "react";

import { FormBuilder } from "@formio/react";
import "formiojs";
import { Button } from "@chakra-ui/react";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "formiojs/dist/formio.full.css";

import "./allpage.css";
import { useEffect } from "react";

const Addnewform = () => {
  const [formData2, setFormData2] = useState({
    userId: "",
    formbuilder: "",
    data: "",
  });
  const [FormComp, setFormComp] = useState(null);
  
  const mongopath = "https://peaceful-yonath.66-179-255-123.plesk.page/api/";
  // const mongopath = "http://localhost:5000/api/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${mongopath}get-formbuilder-data`);
        setFormData2({
          formbuilder: response.data.formbuilder,
          data: response.data.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  var changesFormVal = [];
  const handleChange = (e) => {
    changesFormVal = e.components;
    console.log(changesFormVal);
    // setFormComp(e.components);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(FormComp);
    try {
      axios.post(`${mongopath}form-module-submission`, formData2);
      alert("Form submitted successfully!");
      setFormData2({
        formbuilder: "",
        data: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };
  // Function to get the value from the route
  function getRouteValue() {
    var path = window.location.pathname;
    var parts = path.split("/");
    var value = parts[parts.length - 1];
    return value;
  }
  var routeValue = getRouteValue();
  return (
    <>
    <nav
          className="layout-navbar navbar navbar-expand-xl navbar-detached align-items-center inNav mt-3"
          id="layout-navbar"
        >
          {/* {/* <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
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
            {/* Search */}
            <div className="navbar-nav align-items-center">
              <div className="nav-item d-flex align-items-center">
                <ul className="navbar-nav flex-row align-items-center ms-auto">
                  {/* Place this tag where you want the button to render. */}
                  <li className="nav-item lh-1 me-3">
                    <div className="title">
                    {routeValue == "addnewform" ? (
                      <h4 className="align-items-center pageManager">
                        Formbuilder
                      </h4>
                    ) : (
                      <h4 className="align-items-center pageManager">
                        Formbuilder
                      </h4>
                    )}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* /Search */}
            <ul className="navbar-nav flex-row align-items-center ms-auto">
              {/* Place this tag where you want the button to render. */}

              <li className="nav-item lh-1 me-3">
                <Button
                  onClick={goBack}
                  leftIcon={<IoMdArrowBack />}
                  className="btn"
                >
                  Back
                </Button>
              </li>
              <li className="nav-item lh-1 me-3">
                <Button leftIcon={<MdOutlineCancel />} className="btn">
                  Cancel
                </Button>
              </li>
            </ul>
          </div>
        </nav>
      <div className="container">
        
        <FormBuilder
          // onSubmit={handleSubmit}
          onChange={handleChange}
          form={{
            display: "form",
            components: [
              {
                label: "Email",
                tableView: true,
                key: "email",
                type: "email",
                input: true,
              },
              {
                label: "Password",
                tableView: false,
                key: "password",
                type: "password",
                input: true,
                protected: true,
              },
            ],
          }}
        />
        <h1> {formData2?.data}</h1>
        <div className="col-md-12 ps-0 mt-4 float-left">
          <button
            className="formbuilder-btn float-left for-btnn"
            colorScheme="blue"
            onClick={handleSubmit}
            type="submit"
          >
            {" "}
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Addnewform;
