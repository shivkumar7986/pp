import { Button, Checkbox } from "@chakra-ui/react";
import { TbUsersPlus } from "react-icons/tb";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { MdOutlineSegment } from "react-icons/md";
import Navbar from "../HomeComn/Navbar";
import Sidebar from "../HomeComn/Sidebar";
import { Link } from "react-router-dom";
import "./allpage.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const Formiohome = () => {
  const [formData2, setFormData2] = useState([]);
  
  const mongopath = "https://peaceful-yonath.66-179-255-123.plesk.page/api/";
  // const mongopath = "http://localhost:5000/api/";
  useEffect(() => {
    fetchFormData();
  }, []);
  const fetchFormData = async () => {
    try {
      const response = await axios.get(`${mongopath}get-form-data`);
      // console.log(response.data);
      setFormData2(response.data);
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };

  //goback
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // Navigate back one step
  };
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this data?"
    );
    if (isConfirmed) {
      try {
        await axios.delete(`${mongopath}delete/${id}`);
        console.log("Form data deleted successfully");
        // Fetch updated form data after deletion
        fetchFormData();
      } catch (error) {
        console.error("Error deleting form data:", error);
      }
    }
  };

  // const handleEdit = (rowData) => {
  //   setEditData(rowData);
  //   setIsEditing(true);
  // };

  const handleCheckbox = async (id, checkbox) => {
    console.log(id, checkbox);

    try {
      // Send data to the backend using fetch or your preferred HTTP library
      const response = await axios.get(
        `${mongopath}update-checkbox/` + checkbox + "/" + id
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
        `${mongopath}update-checkbox2/` + checkbox + "/" + id
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
  };

  return (
    <>
      <div className="flex-grow-1">
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
            className="navbar-nav-right d-flex align-items-center"
            id="navbar-collapse"
          >
            <div className="navbar-nav align-items-center">
              <div className="nav-item d-flex align-items-center">
                <ul className="navbar-nav flex-row align-items-center ms-auto">
                  <li className="nav-item lh-1 me-3">
                    <div className="title">
                      <h4
                        className="align-items-center text-dark"
                        leftIcon={<MdOutlineSegment />}
                       >
                        Form builder
                      </h4>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <ul className="navbar-nav flex-row align-items-center ms-auto">
              <li className="nav-item lh-1 me-3">
                {" "}
                <Link to="/admin/addNewform">
                  {" "}
                  <Button
                    leftIcon={<TbUsersPlus />}
                    size="md"
                    style={styles.btn}
                  >
                    Add New Form
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
        <div className="">
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
              {formData2.map((entry, index) => (
                <tr key={entry._id}>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Formiohome;

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
