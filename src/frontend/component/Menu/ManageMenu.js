import React, { useEffect, useState } from "react";
import { Button, Checkbox } from "@chakra-ui/react";
import { TbUsersPlus } from "react-icons/tb";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { MdOutlineSegment } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

import "./menu.css";
import "bootstrap/dist/css/bootstrap.css";
import { mongopath } from "../Mongopath/Mongopath";
const ManageMenu = () => {
  const [menu, setMenu] = useState([]);

 

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  useEffect(() => {
    fetchFormdata();
  }, []);
  const fetchFormdata = async () => {
    try {
      const response = await axios.get(`${mongopath}get-menu-group`);
      setMenu(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("error in fetching data ", error);
    }
  };

  const handleCheckbox = async (id, checkbox) => {
    console.log(id, checkbox);
    try {
      // Send data to the backend using fetch or your preferred HTTP library
      const response = await axios.get(
        `${mongopath}update-group-menu-checkbox/` + checkbox + "/" + id
      );
      console.log(response);
    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }
    fetchFormdata();
  };
  const handlePublish = (checkboxValue, id) => {
    let setCheck = "yes";
    if (checkboxValue.value == "yes") {
      setCheck = "no";
    } else {
      setCheck = "yes";
    }
    console.log(setCheck, id);
    handleCheckbox(setCheck, id);
  };
  //delete menu
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this data?"
    );
    if (isConfirmed) {
      try {
        await axios.delete(`${mongopath}delete-group-data/${id}`);
        console.log(" data deleted successfully");
        // Fetch updated form data after deletion
        fetchFormdata();
      } catch (error) {
        console.error("Error deleting form data:", error);
      }
    }
  };

  return (
    <div className="container">
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
          className="navbar-nav-right d-flex align-items-center"
          id="navbar-collapse"
        >
          <div className="navbar-nav align-items-center">
            <div className="nav-item d-flex align-items-center">
              <ul className="navbar-nav flex-row align-items-center ms-auto">
                <li className="nav-item lh-1 me-3">
                  <div className="title">
                    <h4
                      className="align-items-center"
                      leftIcon={<MdOutlineSegment />}
                    >
                      Menu Group Manager
                    </h4>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <ul className="navbar-nav flex-row align-items-center ms-auto">
            <li className="nav-item lh-1 me-3">
              {" "}
              <Link to="/add-menu-group">
                {" "}
                <Button leftIcon={<TbUsersPlus />} size="md" style={styles.btn}>
                  New Menu Group
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

      <div>
    
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Menu Group Name </th>
              <th>Publish</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {menu &&
              menu.map((data, id) => (
                <>
                  <tr key={data._id}>
                    <td>{id + 1}</td>

                    <td>{data.groupName}</td>

                    <td>
                      <Checkbox
                        onChange={(e) => handlePublish(e.target, data._id)}
                        isChecked={data.publish == "yes" ? true : false}
                        value={data.publish}
                      />
                    </td>
                    <td>
                      <div className="ite">
                        <ul>
                          <li>
                            <Link to={"/admin/edit-group-menu/" + data._id}>
                              <Button className="edit & dlt">
                                <CiEdit />
                              </Button>
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <Button
                                className="edit & dlt"
                                onClick={() => handleDelete(data._id)}
                              >
                                <MdDelete />
                              </Button>
                            </Link>
                          </li>
                        </ul>{" "}
                      </div>
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMenu;
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
