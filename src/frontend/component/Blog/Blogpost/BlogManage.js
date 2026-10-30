import { Button, Checkbox } from "@chakra-ui/react";
import { TbUsersPlus } from "react-icons/tb";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { MdOutlineSegment } from "react-icons/md";
import { Link } from "react-router-dom";
import "../blog.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { mongopath } from "../../Mongopath/Mongopath";

import "../blog.css";
const BlogManage = (props) => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    fetchFormData();
  }, []);
  const fetchFormData = async () => {
    try {
      const response = await axios.get(`${mongopath}get-blog-data`);
      // console.log(response.data);
      setFormData(response.data);

      console.log(response.data)
    } catch (error) {
      console.error("Error fetching slides:", error);
    }
  }

  //goback
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // Navigate back one step
  }
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this data?"
    )
    if (isConfirmed) {
      try {
        await axios.delete(`${mongopath}delete-blog/${id}`);
        console.log("Form data deleted successfully");
        // Fetch updated form data after deletion
        fetchFormData();
      } catch (error) {
        console.error("Error deleting form data:", error);
      }
    }
  };

  const handleCheckbox = async (id, checkbox) => {
    console.log(id, checkbox);

    try {
      // Send data to the backend using fetch or your preferred HTTP library
      const response = await axios.get(
        `${mongopath}update-blog-checkbox/` + checkbox + "/" + id
      );
      console.log(response);
    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }

    fetchFormData();
  };
  const handleCheckbox2 = async (id, checkbox) => {
    console.log(id, checkbox);

    try {
      // Send data to the backend using fetch or your preferred HTTP library
      const response = await axios.get(
        `${mongopath}update-blog-checkbox2/` + checkbox + "/" + id
      );
      console.log(response);
    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }

    fetchFormData();
  };

  const handleFrontpageChange = (checkboxValue, id) => {
    let setCheck = 1;
    if (checkboxValue.value == 1) {
      setCheck = 2;
    } else {
      setCheck = 1;
    }
    console.log(setCheck, id);
    handleCheckbox(setCheck, id);
  };
  const handlePublishChange = (checkboxValue, id) => {
    let setCheck = 1;
    if (checkboxValue.value == 1) {
      setCheck = 2;
    } else {
      setCheck = 1;
    }
    console.log(setCheck, id);
    handleCheckbox2(setCheck, id);
  }

  return (
    <>
      <div className=" blog flex-grow-1">
        <nav
          style={styles.inNav}
          className="layout-navbar navbar navbar-expand-xl navbar-detached align-items-center "
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
            className="navbar-nav-right d-flex align-items-center mb-3"
            id="navbar-collapse"
          >
            <div className="navbar-nav align-items-center">
              <div className="nav-item d-flex align-items-center">
                <ul className="navbar-nav flex-row align-items-center ms-auto">
                  <li className="nav-item lh-1 me-3">
                    <div className="">
                      <h4
                        className="align-items-center"
                        leftIcon={<MdOutlineSegment />}
                       >
                        Blog Manager
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
                  <Button
                    leftIcon={<TbUsersPlus/>}
                    size="md"
                    style={styles.btn}
                  >
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
        <div className="container">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Page Title</th>
                <th>Frontpage</th>
                <th>Publish</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {formData &&formData.map((entry, index) => (
                <tr key={entry._id}>
                  <td>{index + 1}</td>
                  <td>{entry.name}</td>
                  <td>
                    <Checkbox
                      onChange={(e) =>
                        handleFrontpageChange(e.target, entry._id)
                      }
                      isChecked={entry.frontpage == 1 ? true : false}
                      value={entry.frontpage}
                    ></Checkbox>
                  </td>
                  <td>
                    <Checkbox
                      onChange={(e) => handlePublishChange(e.target, entry._id)}
                      isChecked={entry.published == 1 ? true : false}
                      value={entry.published}
                    ></Checkbox>
                  </td>
                  <td>
                    <div className="ite">
                      <ul>
                        <li>
                          <Link to={"/admin/edit-post/" + entry._id}>
                            <Button className="edit & dlt">
                              <CiEdit />
                            </Button>
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <Button
                              className="edit & dlt"
                              onClick={() => handleDelete(entry._id)}
                            >
                              <MdDelete />
                            </Button>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BlogManage;
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
