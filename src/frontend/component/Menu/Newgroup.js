import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import "./menu.css";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import "./menu.css";
import { mongopath } from "../Mongopath/Mongopath";
const Newgroup = () => {
  const [groupData, setGroupData] = useState({
    groupName: "",
    publish: "",
  });
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  function getRouteValue() {
    var path = window.location.pathname;
    // Perform string manipulation or parsing to extract the desired value
    // For example, you might split the path and get the last part
    var parts = path.split("/");
    var value = parts[parts.length - 1];
    return value;
  }
  var routeValue = getRouteValue();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);
    setGroupData((prevMenuData) => ({
      ...prevMenuData,
      [name]: value,
    }));
  };
  let params = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let id = params.name;

    // Validate required fields
    let validation = false;
    if (groupData.groupName == "") {
      validation = true;

      setName("name is required");
    } else {
      setName("");
    }

    if (validation == false) {
      try {
        if (id != undefined) {
          await axios.put(`${mongopath}edit-group-menu/${id}`, groupData);
          alert("Form submitted successfully!");
          console.log(groupData);
        } else {
          await axios.post(`${mongopath}submit-menu-group`, groupData);
          alert("Form submitted successfully!");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert(
          "Error submitting form. Please check the console for more details."
        );
      }
    }
  };

  //to get table data again in form to edit
  useEffect(() => {
    let id = params.name;
    // console.log(id);
    const fetchData = async (id) => {
      if (id != undefined) {
        try {
          const response = await axios.get(`${mongopath}edit-group-menu/` + id);
          console.log(response);
          setGroupData({
            groupName: response.data.groupName,
            publish: response.data.publish,
          });
        } catch (error) {
          console.error("Error in getting data   form data:", error);
        }
      }
    };
    fetchData(id);
  }, []);

  return (
    <div>
      <nav
        className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center inNav "
        id="layout-navbar"
      >
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
          <a
            className="nav-item nav-link px-0 me-xl-4"
            href="javascript:void(0)"
          >
            <i className="bx bx-menu bx-sm" />
          </a>
        </div>
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
                  {routeValue == "add-menu-group" ? (
                    <h4 className="align-items-center text-dark pageManager">
                      Add New Menu Group
                    </h4>
                  ) : (
                    <h4 className="align-items-center text-light pageManager">
                      Edit Menu Group
                    </h4>
                  )}
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

      <div className="container-fluid form">
        <form onSubmit={handleSubmit}>
          <div className="row form-background">
            <div className="col-md-6">
              <FormLabel>Menu Group Name:</FormLabel>
              <Input
                className={name ? "form-control error-border" : "form-control"}
                id="name"
                name="groupName"
                type="text"
                onChange={handleChange}
                value={groupData.groupName}
              />
            </div>
            <div className="col-md-6">
              <FormLabel>Published:</FormLabel>{" "}
              <Select name="publish" onChange={handleChange}>
                <option checked={groupData.publish === "no"} value="no">
                  No
                </option>
                <option value="yes" checked={groupData.publish === "yes"}>
                  Yes
                </option>
              </Select>
            </div>
            <div className="">
              {routeValue == "add-menu-group" ? (
                <Button type="submit" colorScheme="blue" size="md">
                  Add
                </Button>
              ) : (
                <Button onClick={handleSubmit} colorScheme="blue" size="md">
                  Update
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Newgroup;
