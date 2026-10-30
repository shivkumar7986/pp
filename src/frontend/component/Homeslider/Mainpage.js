import React from "react";
import { Button } from "@chakra-ui/react";
import { TbUsersPlus } from "react-icons/tb";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { MdOutlineSegment } from "react-icons/md";
import { Link } from "react-router-dom";
import "./homeslider.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { mongopath } from "../Mongopath/Mongopath";
import { imgUrl } from "../Mongopath/Mongopath";
import { Checkbox } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const Mainpage = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await axios.get(`${mongopath}get/slides`);
      console.log("Response data:", response.data); // Log response data

      setSlides(response.data);
    } catch (error) {
      console.error("Error fetching slides:", error);
    }
  };

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are sure to delete the data?");
    if (isConfirm) {
      try {
        await axios.delete(`${mongopath}delete/slider/img/` + id);
        console.log("Image deleted successfully");
        fetchSlides();
      } catch (error) {
        console.error("Error in deleting the data:", error);
      }
    }
  };

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // Navigate back one step
  };

  // const handlePublishChange = (checkboxValue, id) => {
  //   let setCheck = checkboxValue.value === 1 ? 2 : 1;
  //   console.log(setCheck, id);
  //   handleCheckbox2(setCheck, id);
  // };

  // const handleCheckbox2 = async (id, checkbox) => {
  //   console.log(id, checkbox);

  //   try {
  //     const response = await axios.get(
  //       `${mongopath}update-slide-checkbox/` + checkbox + "/" + id
  //     );
  //     console.log(response);
  //   } catch (error) {
  //     console.error("Error sending data to the backend:", error);
  //   }

  //   fetchSlides();
  // };
  const handleCheckbox = async (id, checkbox) => {
    console.log(id, checkbox);
    try {
      // Send data to the backend using fetch or your preferred HTTP library
      const response = await axios.get(
        `${mongopath}update/slide/checkbox/` + id + "/" + checkbox
      );

      setSlides((prevSlides) =>
        prevSlides.map((slide) =>
          slide.autoID === id ? { ...slide, publish: checkbox } : slide
        )
      );
      console.log(response);
    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }
  };
 
  const handlePublish = async (checkboxValue, id) => {
    let setCheck = checkboxValue === 1 ? 2 : 1;
    console.log('SetCheck:', setCheck, 'ID:', id);  
    await handleCheckbox(id, setCheck);
  };
  
  
  return (
    <div className="content-wrapper">
      <div className="flex-grow-1">
        <nav
          style={styles.inNav}
          className="homeslider Mainpage layout-navbar navbar navbar-expand-xl navbar-detached align-items-center"
          id="layout-navbar"
        >
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
                        Home Banner Setting
                      </h4>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <ul className="navbar-nav flex-row align-items-center ms-auto">
              <li className="nav-item lh-1 me-3">
                <Link to="/admin/addslide">
                  <Button
                    leftIcon={<TbUsersPlus />}
                    size="md"
                    style={styles.btn}
                  >
                    Add New Slide
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
        <div className="mt-2 ps-0 container">
          <div className="w-full float-left"></div>
          <div className="row">
            <div className="For-slides">
              <div className="homesliders">
                {slides.length > 0 ? (
                  slides.map((slide) => (
                    <div key={slide._id} className="slides">
                      <div className="for-img">
                        <img
                          src={`${imgUrl}${slide.filename}`}
                          alt={slide.title}
                          style={{
                            width: "300px",
                            height: "200px",
                            margin: "10px",
                          }}
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-center">
                          <h4>
                            <b> {slide.title} </b>
                          </h4>

                          <ul
                            className="d-flex items-center"
                            style={{ listStyle: "none" }}
                          >
                            <li>
                              <p>
                                {" "}
                                <a
                                  onClick={(e) =>
                                    handlePublish(slide.publish, slide.autoID)
                                  }
                                  title="Published"
                                  className={`publish ${
                                    slide.publish == 1 ? "green" : "red"
                                  }_check`}
                                  data-type="pages"
                                >
                                  <i className="fa fa-check-circle"></i>
                                  <i className="fas fa-times-circle"></i>
                                </a>
                              </p>
                            </li>
                            <li>
                              <Link
                                to={
                                  "/admin/edit-home-slide-page/" + slide.autoID
                                }
                              >
                                <Button className="edit & dlt">
                                  <CiEdit />
                                </Button>
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <Button
                                  className="edit & dlt"
                                  onClick={() => handleDelete(slide.autoID)}
                                >
                                  <MdDelete />
                                </Button>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No slides found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;

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



