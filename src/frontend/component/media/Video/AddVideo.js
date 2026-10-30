import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";

import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";

import { MdOutlineSegment } from "react-icons/md";

import "../Common.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Input } from "@chakra-ui/react";
import axios from "axios";
import { Select } from "@chakra-ui/react";
import { mongopath } from "../../Mongopath/Mongopath";
// import uploadMedia from "commoncom"
const AddVideo = () => {


  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    url: "",
    publish: "",
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const params = useParams();
  function getRouteValue() {
    var path = window.location.pathname;
    // Perform string manipulation or parsing to extract the desired value
    // For example, you might split the path and get the last part
    var parts = path.split("/");
    var value = parts[parts.length - 1];
    return value;
  }
  var routeValue = getRouteValue();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideoData((prevMenuData) => ({
      ...prevMenuData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let validation = false;
    let id = params.name;
    if (videoData.title == "") {
      validation = true;
      setTitle("Title is required");
    } else {
      setTitle("");
    }
    if (videoData.description == "") {
      validation = true;
      setDescription("Description required");
    } else {
      setDescription("");
    }
    if (videoData.url == "") {
      validation = true;
      setUrl("Url is required");
    } else {
      setUrl("");
    }
    if (validation == false) {
      try {
        if (id != undefined) {
          await axios.put(`${mongopath}update/video/data/` + id, videoData);
          alert("Data updated successfully");
        } else {
          await axios.post(
            `${mongopath}submit/video-data`,
            videoData
          );
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

  //to fetch the table data again basis of the id
  useEffect(() => {
    let id = params.name;
    // console.log(id)
    const fetchTableData = async (id) => {
      if (id != undefined) {
        try {
          const response = await axios.get(`${mongopath}edit/video/data/` + id);
          console.log(response.data);
          setVideoData({
            title: response.data.title,
            description: response.data.description,
            url: response.data.url,
            publish: response.data.publish,
          });
        } catch (error) {
          console.error("Error in fetching the data ", error);
        }
      }
    };
    fetchTableData(id);
  }, []);

  return (
    <div className="container Video">
      <div className=" video manager container layout-wrapper layout-content-navbar">
        <nav
          style={styles.inNav}
          className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center "
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
            {/* {/ Search /} */}
            <div className="navbar-nav align-items-center">
              <div className="nav-item d-flex align-items-center">
                <ul className="navbar-nav flex-row align-items-center ms-auto">
                  {/* {/ Place this tag where you want the button to render. /} */}

                  <li className="nav-item lh-1 me-3">
                    {routeValue == "addVideo" ? (
                      <h4
                        className="align-items-center text-dark pageManager"
                        leftIcon={<MdOutlineSegment />}
                        >
                        Add NewVideo
                      </h4>
                    ) : (
                      <h4
                        leftIcon={<MdOutlineSegment />}
                        className="align-items-center text-light pageManager"
                      >
                        Edit
                      </h4>
                    )}
                  </li>
                </ul>
              </div>
            </div>
            {/* {/ /Search /} */}
            <ul className="navbar-nav flex-row align-items-center ms-auto">
              {/* {/ Place this tag where you want the button to render. /} */}

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
      </div>
      <div className="InputOutside">
        <form onSubmit={handleSubmit}>
          <div className="row container">
            <div className="col-md-4">
              <label for="first-name">Video Title:</label>

              <Input
                name="title"
                className={
                  title
                    ? "form-control error-border videoInp"
                    : "form-control videoInp"
                }
                type="text"
                onChange={handleChange}
                value={videoData.title}
              />
              {title ? <p className="error">{title}</p> : null}
            </div>
            <div className="col-md-4">
              <label for="first-name">Video Description:</label>

              <Input
                name="description"
                value={videoData.description}
                type="text"
                className={
                  description
                    ? "form-control error-border videoInp"
                    : "form-control videoInp"
                }
                onChange={handleChange}
              />

              {description ? <p className="error">{description}</p> : null}
            </div>
            <div className="col-md-4">
              <label for="first-name">Video Url:</label>

              <Input
                className={
                  url
                    ? "form-control error-border videoInp"
                    : "form-control videoInp"
                }
                value={videoData.url}
                type="url"
                name="url"
                id="url"
                placeholder="https://example.com"
                size="30"
                onChange={handleChange}
              />
              {url ? <p className="error">{url}</p> : null}
            </div>
          </div>
          <div className="col-md-3 selectVideo  ">
            <label for="first-name">Active:</label>

            <Select name="publish" onChange={handleChange} defaultValue={"no"}>
              <option selected={videoData.publish === "yes"} value={"yes"}>
                Yes
              </option>
              <option selected={videoData.publish === "no"} value={"no"}>
                No
              </option>
            </Select>
          </div>
          <div className="videButton">
            {" "}
            {routeValue == "addVideo" ? (
              <Button type="submit" colorScheme="blue" size="md">
                Add
              </Button>
            ) : (
              <Button onClick={handleSubmit} colorScheme="blue" size="md">
                Update
              </Button>
            )}
          </div>
        </form>
      </div>{" "}
    </div>
  );
};

export default AddVideo;

const styles = {
  btn: {
    color: "#fff",
    borderRadius: "0px",
    backgroundColor: " #1E8FC6",
  },
  pageManager: {
    position: "fixed",
    top: "25%",
  },
};
