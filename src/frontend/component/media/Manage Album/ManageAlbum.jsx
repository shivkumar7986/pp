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
import "../Common.css";
import { useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import { mongopath } from "../../Mongopath/Mongopath";
import { CiEdit } from "react-icons/ci";
const ManageAlbum = () => {


  const [albumData, setAlbumData] = useState([]);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchAlbumData();
  }, []);

  const fetchAlbumData = async() => {

    try {
      const response = await axios.get(`${mongopath}get/album/data`);
      setAlbumData(response.data);
    
    } catch (error) {
      console.error(error, "Error in fetching the data ");
    }
  };

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are sure the delete the data ");

    if (isConfirm) {
      try {
        await axios.delete(`${mongopath}delete/album/data/` + id);

        //fetch  tghe updated from data after deleting the data
        fetchAlbumData();
      } catch (error) {
        console.error(error, "Error in deleting the data");
      }
    }
  };
  return (
    <>
      <div className="  mt-3 container layout-wrapper layout-content-navbar">
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
                    <h4
                      className="align-items-center"
                      leftIcon={<MdOutlineSegment />}
                    >
                      Album Manager
                    </h4>
                  </li>
                </ul>
              </div>
            </div>
            {/* {/ /Search /} */}
            <ul className="navbar-nav flex-row align-items-center ms-auto">
              {/* {/ Place this tag where you want the button to render. /} */}
              <li className="nav-item lh-1 me-3">
                <Link to="/admin/addAlbums">
                  <Button
                    leftIcon={<IoPersonAddSharp />}
                    style={styles.btn}
                    size="md"
                  >
                    Add Album
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
      </div>

      <div>
        <table>
          <thead>
            <th>Album Id </th>
            <th>Album Name </th>
            <th>Album Description </th>
            <th>Number of images </th>
            <th>Action</th>
          </thead>

          <tbody>
            {albumData.map((data, index) => (
              <tr key={data._id}>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.editorContent}</td>
                <td></td>
                <td>
                  <ul className="d-flex actionAlbum">
                    <li>
                      {" "}
                      <Link to={"/admin/edit-albums/" + data._id}>
                        <Button className="edit-btn">
                          <CiEdit />
                        </Button>
                      </Link>{" "}
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
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div></div>
    </>
  );
};

export default ManageAlbum;

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
