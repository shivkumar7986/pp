import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { mongopath, imgUrl } from "../Mongopath/Mongopath";

const UploadMedia = ({ setFileArr, addSelectedImage }) => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${mongopath}get/media/file`);
      if (response.status === 200) {
        setImages(response.data);
      } else {
        console.error("Failed to fetch images.");
      }
    } catch (error) {
      console.error("Error during image fetch:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleImageSelect = (image) => {
    setActiveImage(image._id);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        `${mongopath}upload/media/file`,
        formData
      );
      if (response.data) {
        console.log("File uploaded successfully!");
        fetchImages();
      } else {
        console.error("File upload failed.");
      }
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  const handleAddImage = async () => {
    if (activeImage) {
      const selectedImage = images.find((image) => image._id === activeImage);
      try {
        const response = await axios.post(`${mongopath}media/add/image`, {
          file: [selectedImage._id],
        });
        if (response.status === 201) {
          addSelectedImage(selectedImage);
          console.log("Image added successfully");
        } else {
          console.error("Failed to add image.");
        }
      } catch (error) {
        console.error("Error during adding image:", error);
      }
    }
  };

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title" id="staticBackdropLabel">
              Upload Image
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleUpload} encType="multipart/form-data">
              <label>
                Choose a file:
                <input type="file" name="file" onChange={handleFileChange} />
              </label>
              <br />
              <Button type="submit">Upload</Button>
            </form>
            <div>
              <h2>Images</h2>
              <div className="row">
                {images.map((image) => (
                  <div
                    key={image._id}
                    className={`col-md-3 p-1 ${
                      activeImage === image._id ? "active" : ""
                    }`}
                    onClick={() => handleImageSelect(image)}
                  >
                    <img
                      src={`${imgUrl}${image.filename}`}
                      alt={image.filename}
                      style={{
                        maxWidth: "90px",
                        maxHeight: "90px",
                        margin: "10px",
                        border:
                          activeImage === image._id ? "2px solid red" : "none",
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button onClick={handleAddImage} type="button">
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadMedia;
