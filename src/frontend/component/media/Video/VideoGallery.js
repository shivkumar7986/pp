import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { Button } from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import axios from "axios";
import "../Common.css";
import { mongopath } from "../../Mongopath/Mongopath";
const VideoGallery = () => {
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${mongopath}get/video/data`);
      setVideoData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error in fetching the data ", error);
    }
  };
  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure to delete ?");
    if (isConfirm) {
      try {
        await axios.delete(`${mongopath}delete/video/data/` + id);
        console.log("data deleted successfully");
        fetchData();
      } catch (error) {
        console.error(error, "Error in deleting the data ");
      }
    }
  };

  const handleCheckbox = async (id, checkbox) => {
    console.log(id, checkbox);
    try {
      // Send data to the backend using fetch or your preferred HTTP library
      const response = await axios.get(
        `${mongopath}update-video-checkbox/` + checkbox + "/" + id
      );
      console.log(response);
    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }
    try {
      const response = await axios.get(`${mongopath}get/video/data`);
      setVideoData(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error in fetching the data ", error);
    }
  };
  const handlePublish = (checkboxValue, id) => {
    let setCheck = "yes";
    if (checkboxValue == "yes") {
      setCheck = "no";
    } else {
      setCheck = "yes";
    }
    console.log(setCheck, id);
    handleCheckbox(setCheck, id);
  };

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Thumbnail</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {videoData.map((video, index) => (
            <tr key={video._id}>
              <td>{index + 1}</td>
              <td>{video.title}</td>
              <td>{video.description}</td>
              <td>
                <iframe
                  width="180"
                  height="100"
                  src={video.url}
                  // title="YouTube video player"
                  frameborder="0"
                  // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; "
                  // allowfullscreen
                ></iframe>
              </td>
              <td>
                {/* <Checkbox
                  onChange={(e) => handlePublish(e.target, video._id)}
                  isChecked={video.publish == "yes" ? true : false}
                  value={video.publish}
                /> */}
                <a
                  onClick={(e) => handlePublish(video.publish, video._id)}
                  title="Published"
                  className={`publish ${
                    video.publish == "yes" ? "green" : "red"
                  }_check `}
                  data-type="pages"
                >
                  <i className="fa fa-check-circle"></i>
                  <i className="fas fa-times-circle"></i>
                </a>
              </td>
              <td>
                <ul className=" video lists row d-flex ">
                  <li className="col-md-3">
                    <Link to={"/admin/edit-video-page/" + video._id}>
                      <Button
                        className="edit & dlt"
                        // onClick={() => handleEdit(entry._id)}
                      >
                        <CiEdit />
                      </Button>
                    </Link>
                  </li>
                  <li className="col-md-3">
                    <Link>
                      <Button
                        className="edit & dlt"
                        onClick={() => handleDelete(video._id)}
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
  );
};

export default VideoGallery;
