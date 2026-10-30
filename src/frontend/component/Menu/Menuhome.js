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
import { IoMdAddCircleOutline } from "react-icons/io";
import "./menu.css";
import "bootstrap/dist/css/bootstrap.css";
import { useParams } from "react-router-dom";
import { mongopath } from "../Mongopath/Mongopath";
const Menuhome = () => {
  const [menuData, setMenuData] = useState([]);
  const [subMenu, setSubMenu] = useState([]);

  let params = useParams();
  console.log(params);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // Navigate back one step
  };

  const [isVisible, setIsVisible] = useState(false);
  const [show, setShow] = useState("");
  const toggleVisibility = async (p_id) => {
    setIsVisible(!isVisible);
    //for each click set on basis of id
    setShow(p_id);

    // console.log(p_id);
    try {
      const response = await axios.get(
        `${mongopath}get-submenuForm-data/${p_id}`
      );
      setSubMenu(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("error in fetching data ", error);
    }
  };
  //fetch menu data from backend and to set in table
  useEffect(() => {
    fetchFormdata();
  }, []);
  const fetchFormdata = async () => {
    try {
      const response = await axios.get(`${mongopath}get-menuForm-data`);
      setMenuData(response.data);
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
        `${mongopath}update-menu-checkbox/` + checkbox + "/" + id
      );
      console.log(response);
    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }
    fetchFormdata();
  };
  const handlePublish = async(checkboxValue, id) => {
    let setCheck = "yes";
  
    if (checkboxValue == "yes") {
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
        await axios.delete(`${mongopath}delete-menu/${id}`);
        console.log("Form data deleted successfully");
        // Fetch updated form data after deletion
        fetchFormdata();
      } catch (error) {
        console.error("Error deleting form data:", error);
      }
    }
  };

  const handleCheckboxSubMenu = async (id, checkbox) => {
    console.log(id, checkbox);
    try {
      // Send data to the backend using fetch or your preferred HTTP library
      const response = await axios.get(
        `${mongopath}update-submenu-checkbox/` + checkbox + "/" + id
      );
      
      console.log(response);
      
    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }

    // try {
    //   const response = await axios.get(
    //     `${mongopath}get-submenuForm-data/${id}`
    //   );
    //   setSubMenu(response.data);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error("error in fetching data ", error);
    // }
    // fetchFormdata();
  };

  //submenu publish
  // const handlePublishSubMenu = (checkboxValue, id) => {
  //   let setCheck = "yes";
  //   console.log(checkboxValue)
  //   if (checkboxValue == "yes") {

  //     setCheck = "no";
  //   } else {
  //     setCheck = "yes";
  //   }
  //   console.log(setCheck, id);
  //   handleCheckboxSubMenu(setCheck, id);
  // };

  const handlePublishSubMenu = async(checkboxValue, id) => {
    let setCheck = "yes";
    try {
      const response = await axios.get(
        `${mongopath}get-submenuForm-data/${id}`
      );
      setSubMenu(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("error in fetching data ", error);
    }
    if (checkboxValue == "yes") {
      setCheck = "no";
    } else {
      setCheck = "yes";
    }
    console.log(setCheck, id);
    handleCheckboxSubMenu(setCheck, id);
  }
  //submenu delete
  const handleSubMenuDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this data?"
    );
    if (isConfirmed) {
      try {
        await axios.delete(`${mongopath}delete-sub-menu/${id}`);
        console.log("Form data deleted successfully");

        // Fetch updated form data after deletion
        try {
          const response = await axios.get(
            `${mongopath}get-submenuForm-data/${id}`
          );
          setSubMenu(response.data);
          // console.log(response.data);
        } catch (error) {
          console.error("error in fetching data ", error);
        }
      } catch (error) {
        console.error("Error deleting form data:", error);
      }
    }
  };

  return (
    <>
      <div className="flex-grow-1">
        <nav
          style={styles.inNav}
          className="layout-navbar navbar navbar-expand-xl navbar-detached align-items-center "
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
            <div className="navbar-nav align-items-center mt-4">
              <div className="nav-item d-flex align-items-center">
                <ul className="navbar-nav flex-row align-items-center ms-auto">
                  <li className="nav-item lh-1 me-3">
                    <div className="title">
                      <h4
                        className="align-items-center"
                        leftIcon={<MdOutlineSegment />}
                      >
                        Menu Manager
                      </h4>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <ul className="navbar-nav flex-row align-items-center ms-auto">
              <li className="nav-item lh-1 me-3">
                {" "}
                <Link to="/admin/addnewMenu">
                  {" "}
                  <Button
                    leftIcon={<TbUsersPlus />}
                    size="md"
                    style={styles.btn}
                  >
                    Add Menu
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
            <thead className="">
              <tr>
                <th>Submenus</th>
                <th>Menu Name </th>
                <th>Menu Group </th>
                <th>Publish</th>
                <th>Action</th>
              </tr>
            </thead>

            {menuData &&
              menuData.map((data, id) => (
                <>
                  <tr key={data._id}>
                    <td>
                      <button onClick={() => toggleVisibility(data._id)}>
                        <IoMdAddCircleOutline />
                      </button>
                    </td>

                    <td>{data.name}</td>
                    <td>{data.menutype}</td>
                    <td>
                      {/* <Checkbox
                        onChange={(e) => handlePublish(e.target, data._id)}
                        isChecked={data.publish == "yes" ? true : false}
                        value={data.publish}
                      /> */}
                      <a
                        onClick={(e) => handlePublish(data.publish, data._id)}
                        title="Published"
                        className={`publish ${
                          data.publish == "yes" ? "green" : "red"
                        }_check`}
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
                            <Link to={"/admin/add-sub-menu/" + data._id}>
                              <Button className="edit & dlt">
                                <IoMdAddCircleOutline />
                              </Button>
                            </Link>
                          </li>
                          <li>
                            <Link to={"/admin/edit-menu/" + data._id}>
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
                  {show === data._id && (
                    <span style={{ display: isVisible ? "block" : "none" }}>
                      {subMenu &&
                        subMenu.map((item) => (
                          <table key={item._id}>
                            {" "}
                            <thead className={data._id}>
                              <th>Submenus</th>
                              <th>Publish</th>
                              <th>Action</th>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{item.submenuname}</td>
                                <td>
                                  {/* <Checkbox
                                  
                                    onChange={(e) =>
                                      handlePublishSubMenu(e.target, item._id)
                                    }
                                    isChecked={
                                      item.publish == "yes" ? true : false
                                    }
                                    value={item.publish}
                                  /> */}

                                  {/* <a
                        onClick={(e) => handlePublishSubMenu(item.publish, item._id)}
                        // title="Published"
                         className={`publish ${
                          item.publish == "yes" ? "green" : "red"
                        }_check`}
                        // data-type="pages"
                      >
                        <i className="fa fa-check-circle"></i>
                        <i className="fas fa-times-circle"></i>
                      </a> */}

                                  <a
                                    onClick={(e) =>
                                      handlePublishSubMenu(
                                        item.publish,
                                        item._id
                                      )
                                    }
                                    title="Published"
                                    className={`publish ${
                                      item.publish == "yes" ? "green" : "red"
                                    }_check`}
                                    data-type="pages"
                                  >
                                    <i className="fa fa-check-circle"></i>
                                    <i className="fas fa-times-circle"></i>
                                  </a>
                                </td>

                                <td>
                                  {" "}
                                  <div className="ite">
                                    <ul>
                                      <li>
                                        <Link
                                          to={
                                            "/admin/edit-sub-menu/" + item._id
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
                                            onClick={() =>
                                              handleSubMenuDelete(item._id)
                                            }
                                          >
                                            <MdDelete />
                                          </Button>
                                        </Link>
                                      </li>
                                    </ul>{" "}
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        ))}
                    </span>
                  )}
                </>
              ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default Menuhome;

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
