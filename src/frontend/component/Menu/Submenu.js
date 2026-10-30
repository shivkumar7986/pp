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
import { mongopath } from "../Mongopath/Mongopath";
const Submenu = () => {
  let params = useParams();

  const [submenuData, setSubmenuData] = useState({
    p_id: params.name,
    submenuname: "",
    parentMenuName: "", // Set default value here
    menulink: "",
    publish: "",
    subUrlLink: "",
  });

  const [link, setLink] = useState([]);
  const [parentMenu, setParentMenu] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };
  function getRouteValue() {
    var path = window.location.pathname;
    var parts = path.split("/");
    var value = parts[parts.length - 2];
    return value;
  }
  var routeValue = getRouteValue();

  //for page data into menu link
  useEffect(() => {
    fetchLink();
  }, []);
  const fetchLink = async () => {
    try {
      const response = await fetch(`${mongopath}get-main-menu-data`);
      const data = await response.json();
      setLink(data);
    } catch (error) {
      console.error("Error fetching pages:", error);
    }
  };

  useEffect(() => {
    let id = params.name;
    const fetchData = async (id) => {
      if (id !== null) {
        try {
          const response = await fetch(
            `${mongopath}get-parent-submenu-data/` + id
          );
          const data = await response.json();
          setParentMenu(data);
          // Set default value for parentMenuName if it's not already set
          if (!submenuData.parentMenuName && data.name) {
            setSubmenuData((prevData) => ({
              ...prevData,
              parentMenuName: data.name,
            }));
          }
        } catch (error) {
          console.error("Error in form data:", error);
        }
      }
    };
    fetchData(id);
  }, [params.name]);

  useEffect(() => {
    let id = params.name;
    const fetchData = async (id) => {
      if (id !== undefined) {
        try {
          const response = await axios.get(
            `${mongopath}get-edit-sub-menu-data/` + id
          );
          if (response.data !== null) {
            setSubmenuData({
              submenuname: response.data.submenuname || "",
              parentMenuName: response.data.parentMenuName || "",
              menulink: response.data.menulink || "",
              publish: response.data.publish || "",
              subUrlLink: response.data.subUrlLink || "",
            });
            if (response.data.subUrlLink) {
              setIsVisible(true);
            }
          } else {
            console.warn("Received null response or missing properties.");
          }
        } catch (error) {
          console.error("Error in getting data from the server:", error);
        }
      }
    }
    fetchData(id);
  }, [params.name])

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "menulink") {
      setIsVisible(value === "other")
    }
    // if (name === "menulink") {
    //   setSubmenuData((prevMenuData) => ({
    //     ...prevMenuData,
    //     [name]: value,
    //   }));
    // }
    setSubmenuData((prevMenuData) => ({
      ...prevMenuData,
      [name]: value,
    }))
  }

  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    let id = params.name;
    let validation = false;
    if (submenuData.submenuname === "") {
      validation = true;
      setName("name is required");
    } else {
      setName("");
    }

    if (validation === false) {
      try {
        if (id !== undefined && getRouteValue() === "edit-sub-menu") {
          await axios.put(`${mongopath}edit-sub-menu/${id}`, submenuData);
          alert("Form updated successfully successfully!");
        } else {
          await axios.post(`${mongopath}submit-submenu`, submenuData);
          alert("Form submitted successfully!");
        }
      } catch (error) {
        alert(
          "Error submitting form. Please check the console for more details."
        );
      }
    }
  };

  return (
    <>
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
          className="navbar-nav-right d-flex align-items-center mt-3"
          id="navbar-collapse"
        >
          {/* Search */}
          <div className="navbar-nav align-items-center">
            <div className="nav-item d-flex align-items-center">
              <ul className="navbar-nav flex-row align-items-center ms-auto">
                {/* Place this tag where you want the button to render. */}
                <li className="nav-item lh-1 me-3">
                  {routeValue == `add-sub-menu` ? (
                    <h4 className="align-items-center text-dark pageManager">
                      Add New Sub Menu
                    </h4>
                  ) : (
                    <h4 className="align-items-center text-light pageManager">
                      Edit Sub Menu
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

      <div className="container addmenu-form">
        <form onSubmit={handleMenuSubmit}>
          <FormControl>
            <div className="row">
              <div className="col-md-4 ps-0 form-group">
                {" "}
                <FormLabel>Menu Name</FormLabel>
                <Input
                  className={
                    name ? "form-control error-border" : "form-control"
                  }
                  id="name"
                  name="submenuname"
                  type="text"
                  onChange={handleChange}
                  value={submenuData.submenuname}
                />
                {name ? <p className="error">{name}</p> : null}
              </div>

              {routeValue == "edit-sub-menu" ? (
                <> </>
              ) : (
                <>
                  <div className="col-md-4 form-group">
                    <FormLabel>Parent Menu</FormLabel>{" "}
                    <Select
                      id="type"
                      name="parentMenuName"
                      onChange={handleChange}
                      value={submenuData._id}
                    >
                      <option value={parentMenu.name}>{parentMenu.name}</option>
                      {/* <option value={parentMenu.name}>{parentMenu.name}</option> */}
                    </Select>
                  </div>
                </>
              )}

              <div className="col-md-4 form-group">
                {" "}
                <FormLabel>Menu Link</FormLabel>{" "}

                <Select
                  id="link"
                  name="menulink"
                  placeholder="Select menu link"
                  onChange={handleChange}
                  
                >
                  {link &&
                    link.map((option) => (
                      <option
                        value={option._id}
                        selected={submenuData.menulink === option._id}
                        key={option._id}>
                        {option.name}
                      </option>
                    ))}
                  <option value="other">other</option>
                </Select>
                {/* <Select
                  id="link"
                  name="menulink"
                  placeholder="Select menu link"
                  onChange={handleChange}
                >
                  {link &&
                    link.map((option) => (
                      <option value={option._id} key={option._id}>
                        {option.name}
                      </option>
                    ))}
                  <option value="other">other</option>
                </Select> */}
                {isVisible && (
                  <div className="col-md-8 form-group">
                    <FormLabel>Custom Link</FormLabel>
                    <Input
                      type="url"
                      name="subUrlLink"
                      value={submenuData.subUrlLink}
                      onChange={handleChange}
                      placeholder="Enter custom link"
                    />
                  </div>
                )}
              </div>
              <div className="col-md-4 ps-0 form-group">
                {" "}
                <FormLabel>Published</FormLabel>
                <Select
                  name="publish"
                  onChange={handleChange}
                  defaultValue={"no"}
                >
                  <option selected={submenuData.publish === "no"} value={"no"}>
                    No
                  </option>
                  <option
                    value={"yes"}
                    selected={submenuData.publish === "yes"}
                  >
                    Yes
                  </option>
                </Select>
                {/* <Select name="publish" onChange={handleChange}>
                  <option checked={submenuData.publish === "no"} value="no">
                    No
                  </option>
                  <option value="yes" checked={submenuData.publish === "yes"}>
                    Yes
                  </option>
                </Select> */}
              </div>
            </div>
            <div className="btn ps-0 mt-4">
              {routeValue == `add-sub-menu` ? (
                <Button type="submit" colorScheme="blue" size="md">
                  Add
                </Button>
              ) : (
                <Button onClick={handleMenuSubmit} colorScheme="blue" size="md">
                  Update
                </Button>
              )}
            </div>
          </FormControl>
        </form>
      </div>
    </>
  );
};

export default Submenu;
