import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { FaFolderOpen } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { FaUpload } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineSegment } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./Common.css";
import { useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import VideoGallery from "./Video/VideoGallery";
import Setting from "./Setting";
import VideoSetting from "./Video/VideoSetting";
import UploadMedia from "../CommonComponent/uploadMedia";
import { mongopath } from "../Mongopath/Mongopath";
import { imgUrl } from "../Mongopath/Mongopath";
const Media = () => {
  const [images, setImages] = useState([]);
  const [images2, setImages2] = useState([]);

  const [checkedItems, setCheckedItems] = useState({});

  const [key, setKey] = useState("ImageGallery");
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const handleCheckboxChange = async (imageId) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [imageId]: !prevCheckedItems[imageId],
    }));

    const valueToStore = checkedItems[imageId] ? "1" : "2";

    try {
      const response = await axios.post(`${mongopath}submit/checkbox-value`, {
        imageId,
        value: valueToStore,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error storing value:", error);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await fetch(`${mongopath}get/media/file`);
      if (response.ok) {
        const imageData = await response.json();
        setImages(imageData);
      } else {
        console.error("Failed to fetch images.");
      }
    } catch (error) {
      console.error("Error during image fetch:", error);
    }
  };

  useEffect(() => {
    // Fetch images when the component mounts
    fetchImages();
  }, []);

  const [fileArr, setFileArr] = useState([]);
  const [addedImages, setAddedImages] = useState([]);



 

  const fetchAddedImages = async () => {
    try {
      const response = await axios.get(`${mongopath}media/get/images`);
      if (response.status === 200) {
        setFileArr(response.data);
      } else {
        console.error("Failed to fetch images.");
      }
    } catch (error) {
      console.error("Error during image fetch:", error);
    }
  };

  const handleAddSelectedImage = (image) => {
    setFileArr((prevFileArr) => [...prevFileArr, image]);
  };

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are sure to delete the data ?");
    if (isConfirm) {
      try {
        await axios.delete(`${mongopath}media/delete/images/` + id);
        console.log("Image deleted successfully");
        fetchAddedImages();
      } catch (error) {
        console.error(error, "Error in deleting the data");
      }
    }
  };

  //delete the table data


  // const handleTogglePublish = async (imageId) => {
  //   try {
  //     console.log("Toggle Publish for imageId:", imageId); // Check the value of imageId here

  //     if (!imageId) {
  //       console.error("Image ID is undefined or null.");
  //       return;
  //     }

  //     const response = await axios.put(`${mongopath}media/toggle/${imageId}`);

  //     if (response.status === 200) {
  //       setFileArr(
  //         fileArr.map((image) => {
  //           if (image.autoID === imageId) {
  //             return {
  //               ...image,
  //               showInGallery: response.data.showInGallery,
  //             };
  //           }
  //           return image;
  //         })
  //       );
  //       console.log("Publish status updated successfully");
  //     } else {
  //       console.error("Failed to update publish status.");
  //     }
  //   } catch (error) {
  //     console.error("Error toggling publish status:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchAddedImages();
  //   const storedImages = localStorage.getItem("addedImages");
  //   if (storedImages) {
  //     setAddedImages(JSON.parse(storedImages));
  //   }
  // }, []);
  const handleTogglePublish = async (imageId) => {
    try {
      const response = await axios.put(`${mongopath}media/toggle/${imageId}`);

      if (response.status === 200) {
        setFileArr(
          fileArr.map((image) => {
            if (image.autoID === imageId) {
              return {
                ...image,
                showInGallery: response.data.showInGallery,
              };
            }
            return image;
          })
        );
        console.log("Publish status updated successfully");
      } else {
        console.error("Failed to update publish status.");
      }
    } catch (error) {
      console.error("Error toggling publish status:", error);
    }
  };

  useEffect(() => {
    fetchAddedImages();
  }, []);
  return (
    <>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="tabs navs text-light mt-4"
      >
        <Tab eventKey="ImageGallery" title="Image Gallery">
          <div className="layout-wrapper layout-content-navbar">
            <nav
              style={styles.inNav}
              className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center "
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
                className="navbar-nav-right d-flex align-items-center my-3"
                id="navbar-collapse"
              >
                {/* {/ Search /} */}
                <div className="navbar-nav align-items-center">
                  <div className="nav-item d-flex align-items-center">
                    <ul className="navbar-nav flex-row align-items-center ms-auto">
                      <li className="nav-item lh-1 me-3">
                        <h4
                          className="align-items-center"
                          leftIcon={<MdOutlineSegment />}
                        >
                          Gallery Manager
                        </h4>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* {/ /Search /} */}
                <ul className="navbar-nav flex-row align-items-center ms-auto">
                  {/* {/ Place this tag where you want the button to render. /} */}
                  <li className="nav-item lh-1 me-3">
                    <Link to="/admin/manageAlbum">
                      <Button
                        leftIcon={<FaFolderOpen />}
                        style={styles.btn}
                        size="md"
                      >
                        Manage Albums
                      </Button>
                    </Link>
                  </li>
                  <li className="nav-item lh-1 me-3">
                    {/* <Button
                      className=""
                      leftIcon={<FaUpload />}
                      style={styles.btn}
                      size="md"
                      type="button"
                      class="btn "
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      Upload Image(s)
                    </Button> */}

                    <Button
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      {" "}
                      Upload Image
                    </Button>
                  </li>

                  <li className="nav-item lh-1 me-3">
                    <Button
                      leftIcon={<IoMdSettings />}
                      style={styles.btn}
                      size="md"
                      data-bs-toggle="modal"
                      data-bs-target="#setting"
                    >
                      Settings
                    </Button>
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

            <Setting />
          </div>

          <div className="container">
            <table>
              <thead>
                <tr>
                  <th>Image Id</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>type</th>
                  <th>size</th>
                  <th>Show in gallery </th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {fileArr.map((selectedImage, index) => (
                  <tr key={selectedImage.autoID}>
                    <td> {index + 1}</td>
                    <td>
                      <img
                        src={`${imgUrl}${selectedImage.filename}`}
                        alt={selectedImage.file}
                        style={{
                          maxWidth: "90px",
                          maxHeight: "90px",
                          margin: "0 auto",
                        }}
                      />
                    </td>
                    <td>{selectedImage.title}</td>
                    <td>jpg</td>
                    <td>20 kb</td>

                    <td>
                      {/* <input
                        type="checkbox"
                        checked={checkedItems[selectedImage._id] || false}
                        onChange={() => handleCheckboxChange(selectedImage._id)}
                      /> */}
                      {/* <a
                        onClick={() => handleCheckboxChange(selectedImage.autoID)}
                        title="Published"
                        className={`publish ${
                          checkedItems[selectedImage.autoID] ? "green" : "red"
                        }_check`}
                        data-type="pages"
                      >
                        <i className="fa fa-check-circle"></i>
                        <i className="fas fa-times-circle"></i>
                      </a> */}
                      <a
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default behavior like navigation
                          handleTogglePublish(selectedImage.autoID); // Pass correct imageId here
                        }}
                        className={`publish ${
                          selectedImage.showInGallery === 2 ? "green" : "red"
                        }_check`}
                        title="Publish"
                      >
                        {selectedImage.showInGallery === 2 ? (
                          <i className="fa fa-check-circle"></i>
                        ) : (
                          <i className="fas fa-times-circle"></i>
                        )}
                      </a>
                    </td>

                    {/* Add more cells as needed */}
                    <td>
                      <ul className="list-group dlt-ul">
                        <li className="list-group-item dlt-li">
                          <Button
                            className="dlt"
                            onClick={() => handleDelete(selectedImage.autoID)}
                          >
                            <MdDelete />
                          </Button>
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Tab>
        <Tab eventKey="VideoGallery" title="Video Gallery">
          <div className="layout-wrapper layout-content-navbar">
            <nav
              style={styles.inNav}
              className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center "
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
                className="navbar-nav-right d-flex align-items-center my-3"
                id="navbar-collapse"
              >
                {/* {/ Search /} */}
                <div className="navbar-nav align-items-center">
                  <div className="nav-item d-flex align-items-center">
                    <ul className="navbar-nav flex-row align-items-center ms-auto">
                      {/* {/ Place this tag where you want the button to render. /} */}
                      <li className="nav-item lh-1 me-3">
                        <h4
                          className="align-items-center"
                          leftIcon={<MdOutlineSegment />}
                        >
                          Video Gallery Manager
                        </h4>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* {/ /Search /} */}
                <ul className="navbar-nav flex-row align-items-center ms-auto">
                  {/* {/ Place this tag where you want the button to render. /} */}
                  <li className="nav-item lh-1 me-3">
                    <Link to="/admin/addVideo">
                      <Button
                        leftIcon={<IoPersonAddSharp />}
                        style={styles.btn}
                        size="md"
                      >
                        Add Video
                      </Button>
                    </Link>
                  </li>

                  <li className="nav-item lh-1 me-3">
                    <Button
                      leftIcon={<IoMdSettings />}
                      style={styles.btn}
                      size="md"
                      data-bs-toggle="modal"
                      data-bs-target="#videoSetting"
                    >
                      Settings
                    </Button>
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
            <VideoSetting />
          </div>
          <div>
            <VideoGallery />
          </div>
        </Tab>

        <Tab eventKey="AllImages" title="All Images">
          <div className="layout-wrapper layout-content-navbar">
            <nav
              style={styles.inNav}
              className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center "
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
                className="navbar-nav-right d-flex align-items-center my-3"
                id="navbar-collapse"
              >
                {/* {/ Search /} */}
                <div className="navbar-nav align-items-center">
                  <div className="nav-item d-flex align-items-center">
                    <ul className="navbar-nav flex-row align-items-center ms-auto">
                      {/* {/ Place this tag where you want the button to render. /} */}
                      <li className="nav-item lh-1 me-3">
                        <h4
                          className="align-items-center"
                          leftIcon={<MdOutlineSegment />}
                        >
                          Gallery Manager
                        </h4>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* {/ /Search /} */}
                <ul className="navbar-nav flex-row align-items-center ms-auto">
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

          <div className="container">
            <div className="row m-0">
              {images.map((image) => (
                <div key={image._id} className="col-md-2">
                  <img
                    src={`${imgUrl}${image.filename}`}
                    alt={image.filename}
                    style={{
                      maxWidth: "150px",
                      maxHeight: "150px",
                      margin: "5px",
                      border: "2px solid gray",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </Tab>
      </Tabs>
      <UploadMedia
        setFileArr={setFileArr}
        addSelectedImage={handleAddSelectedImage}
      />
    </>
  );
};

export default Media;

const styles = {
  btn: {
    color: "#fff",
    borderRadius: "5px",
    backgroundColor: " #1E8FC6",
  },
  pageManager: {
    position: "fixed",
    top: "25%",
  },
};
