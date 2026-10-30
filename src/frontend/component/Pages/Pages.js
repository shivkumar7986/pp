import { Button, Checkbox } from "@chakra-ui/react";
import { TbUsersPlus } from "react-icons/tb";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { MdOutlineSegment } from "react-icons/md";
import { Link } from "react-router-dom";
import "./allpage.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { mongopath } from "../Mongopath/Mongopath";

const Pages = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    fetchFormData();
  }, []);
  const fetchFormData = async () => {
    try {
      const response = await axios.get(`${mongopath}get-form-data`);
      // console.log(response.data);
      setFormData(response.data);
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
    if (checkboxValue == 1) {
      setCheck = 2;
    } else {
      setCheck = 1;
    }
    handleCheckbox(setCheck, id);
  };
  const handlePublishChange = (checkboxValue, id) => {
    let setCheck = 1;
    if (checkboxValue == 1) {
      setCheck = 2;
    } else {
      setCheck = 1;
    }
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
            <div className="navbar-nav align-items-center mt-4">
              <div className="nav-item d-flex align-items-center">
                <ul className="navbar-nav flex-row align-items-center ms-auto">
                  <li className="nav-item lh-1 me-3">
                    <div className="title">
                      <h4
                        className="align-items-center"
                        leftIcon={<MdOutlineSegment />}
                      >
                        Page Manager
                      </h4>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <ul className="navbar-nav flex-row align-items-center ms-auto">
              <li className="nav-item lh-1 me-3">
                {" "}
                <Link to="/admin/addNewPage">
                  {" "}
                  <Button
                    leftIcon={<TbUsersPlus />}
                    size="md"
                    style={styles.btn}
                  >
                    Add Page
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
              {formData.map((entry, index) => (
                <tr key={entry._id}>
                  <td>{index + 1}</td>
                  <td>{entry.name}</td>
                  <td>
                    {/* <Checkbox
                      onChange={(e) =>
                        handleFrontpageChange(e.target, entry._id)
                      }
                      isChecked={entry.frontpage == 1 ? true : false}
                      value={entry.frontpage}
                    ></Checkbox> */}
                    <a
                      onClick={(e) =>
                        handleFrontpageChange(entry.frontpage, entry._id)
                      }
                      title="Published"
                      className={`publish ${
                        entry.frontpage == 1 ? "green" : "red"
                      }_check `}
                      data-type="pages"
                    >
                      <i className="fa fa-check-circle"></i>
                      <i className="fas fa-times-circle"></i>
                    </a>
                  </td>
                  <td>
                    {/* <Checkbox
                      onChange={(e) => handlePublishChange(e.target, entry._id)}
                      isChecked={entry.published == 1 ? true : false}
                      value={entry.published}
                    ></Checkbox> */}
                    <a
                      onClick={(e) =>
                        handlePublishChange(entry.published, entry._id)
                      }
                      title="Published"
                      className={`publish ${
                        entry.published == 1 ? "green" : "red"
                      }_check `}
                      data-type="pages"
                    >
                      <i className="fa fa-check-circle"></i>
                      <i className="fas fa-times-circle"></i>
                    </a>
                  </td>
                  <td>
                    <div className="ite">
                      <ul>
                        <li>
                          <Link to={"/admin/edit-page/" + entry._id}>
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
                      </ul>{" "}
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

export default Pages;

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
