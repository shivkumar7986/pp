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
import "../../Common.css";
import { mongopath } from "../Mongopath/Mongopath";
const AddnewMenu = () => {
  const [menuData, setMenuData] = useState({
    name: "",
    menutype: "",
    menulink: "",
    publish: "",
    urlLink: "",
  });

  useEffect(() => {
    // Check if the user has not manually selected a menu type
    if (!menuData.menutype) {
      setMenuData((prevMenuData) => ({
        ...prevMenuData,
        menutype: "Header Menu(active)", // Set the default value
      }));
    }
  }, []);
  // select option value
  const jsonData = {
    options: [
      {
        value: "Header Menu(active)",
        label: "Header Menu(active)",
      },
      {
        value: "Footer menu(active)",
        label: "Footer menu(active)",
      },
      {
        value: "Left side bar (active)",
        label: "Left side bar (active)",
      },
    ],
  };

  const [link, setLink] = useState([]);

  // const[menutypelink,setMenutypelink]= useState([])
  const [isVisible, setIsVisible] = useState(false);

  //for validation
  const [name, setName] = useState("");
  const [menulink, setMenulink] = useState("");

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

  let params = useParams();
  console.log(params);

  useEffect(() => {
    fetchLink();
  }, []);

  const fetchLink = async () => {
    try {
      const response = await fetch(`${mongopath}get-menulink-data`);
      const data = await response.json();
      setLink(data);
    } catch (error) {
      console.error("Error fetching pages:", error);
    }
  };

  //menu options
  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    let id = params.name;

    // Validate required fields
    let validation = false;
    if (menuData.name == "") {
      validation = true;

      setName("name is required");
    } else {
      setName("");
    }
    if (menuData.menulink == "") {
      validation = true;

      setMenulink("menulink is required");
    } else {
      setMenulink("");
    }
    if (validation == false) {
      try {
        if (id != undefined) {
          await axios.put(`${mongopath}edit-menu/${id}`, menuData);
          alert("Form submitted successfully!");
          console.log(menuData);
        } else {
          await axios.post(`${mongopath}submit-menu`, menuData);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "menulink") {
      if (value === "other") {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
    if (name === "menutype") {
      setMenuData((prevMenuData) => ({
        ...prevMenuData,
        [name]: value,
      }));
    } else {
      setMenuData((prevMenuData) => ({
        ...prevMenuData,
        menutype: "Header Menu(active)",
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    let id = params.name;

    const fetchData = async (id) => {
      if (id !== undefined) {
        try {
          const response = await axios.get(`${mongopath}get-menu-data/` + id);
          console.log(response);
          setMenuData({
            name: response.data.name,
            menutype: response.data.menutype,
            menulink: response.data.menulink,
            publish: response.data.publish,
            urlLink: response.data.urlLink,
          });

          if (response.data.urlLink) {
            setIsVisible(true);
          }
        } catch (error) {
          console.error("Error in getting data form data:", error);
        }
      }
    };

    fetchData(id);
  }, [params.name]); // Include params.name as a dependency to trigger the effect when the route changes

  // ...

  return (
    <>
      <nav
        className="layout-navbar navbar navbar-expand-xl navbar-detached align-items-center inNav "
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
                  {routeValue == "addnewMenu" ? (
                    <h4 className="align-items-center text-dark pageManager">
                      Add New Menu
                    </h4>
                  ) : (
                    <h4 className="align-items-center pageManager">
                      Edit Menu
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
                  name="name"
                  type="text"
                  onChange={handleChange}
                  value={menuData.name}
                />
                {name ? <p className="error">{name}</p> : null}
              </div>
              <div className="col-md-4 form-group">
                {" "}
                <FormLabel>Menu Type</FormLabel>{" "}
                <Select
                  id="type"
                  name="menutype"
                  value={menuData.menutype}
                  onChange={handleChange}
                >
                  {jsonData &&
                    jsonData.options.map((option) => (
                      <option
                        value={option.value} // Assuming 'value' is the correct property for option value
                        key={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                </Select>
              </div>
              <div className="col-md-4 form-group">
                {" "}
                <FormLabel>Menu Link</FormLabel>{" "}
                <Select
                  id="link"
                  name="menulink"
                  placeholder="Select menu link"
                  onChange={handleChange}
                  className={
                    menulink ? "form-control error-border" : "form-control"
                  }
                >
                  {link &&
                    link.map((option) => (
                      <option
                        value={option._id}
                        selected={menuData.menulink === option._id}
                        key={option._id}>
                        {option.name}
                      </option>
                    ))}
                  <option value="other">other</option>
                </Select>
                {menulink ? <p className="error">{menulink}</p> : null}
                {isVisible && (
                  <div className="col-md-8 form-group">
                    <FormLabel>Custom Link</FormLabel>
                    <Input
                      type="url"
                      name="urlLink"
                      value={menuData.urlLink}
                      onChange={handleChange}
                      placeholder="Enter custom link"
                    />
                  </div>
                )}
              </div>
              <div className="col-md-4 ps-0 form-group">
                {" "}
                <FormLabel>Published</FormLabel>{" "}
                <Select
                  name="publish"
                  onChange={handleChange}
                  defaultValue={"no"}
                >
                  <option selected={menuData.publish === "no"} value={"no"}>
                    No
                  </option>
                  <option value={"yes"} selected={menuData.publish === "yes"}>
                    Yes
                  </option>
                </Select>
              </div>
            </div>
            <div className="col-md-12 ps-0 mt-4">
              <div className="btn p-0">
                {routeValue == "addnewMenu" ? (
                  <Button type="submit" colorScheme="blue" size="md">
                    Add
                  </Button>
                ) : (
                  <Button
                    onClick={handleMenuSubmit}
                    colorScheme="blue"
                    size="md"
                  >
                    Update
                  </Button>
                )}
              </div>
            </div>
          </FormControl>
        </form>
      </div>
    </>
  );
};

export default AddnewMenu;

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
