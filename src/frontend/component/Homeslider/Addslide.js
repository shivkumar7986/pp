import React, { useState, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FormControl, FormLabel, Input, Button, Radio, RadioGroup } from "@chakra-ui/react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertFromRaw } from "draft-js";
import "./homeslider.css";
import Uploadimg from "./Uploadimg";
import { mongopath, imgUrl } from "../Mongopath/Mongopath";
import { MdDelete } from "react-icons/md";
import '../../Common.css'
const Addslide = () => {
  const [formData, setFormData] = useState({
    file: [],
    title: "",
    editorContent: "",
    publish: 2,
  });

  const [name, setName] = useState("");
  const [file, setFileArr] = useState([]);
  const [images2, setImages2] = useState([]);
  const [value, setValue] = useState("2");
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [description, setDescription] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const getRouteValue = () => {
    const path = window.location.pathname;
    const parts = path.split("/");
    return parts[parts.length - 1];
  };
  const routeValue = getRouteValue();

  const goBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log("Submitting file array:", file);
    const id = params.name;
    let validation = false;

    if (formData.title === "") {
      validation = true;
      setName("Title is required");
    } else {
      setName("");
    }   if (formData.editorContent === "") {
      validation = true;
      setDescription("Description is required");
    } else {
      setDescription("");
    }

    if (!validation) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("publish", formData.publish);
        formDataToSend.append("editorContent", formData.editorContent);

        file.forEach((singleFile) => {
          formDataToSend.append("file", singleFile._id);
        });

        // Log FormData content
        for (let pair of formDataToSend.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }

        const response = id !== undefined
          ? await axios.put(`${mongopath}edit/slide/${id}`, formDataToSend, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
          : await axios.post(`${mongopath}add`, formDataToSend, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });

        console.log("Response data:", response.data);
        alert("Form submitted successfully!");
      } catch (error) {
        console.error("Error adding slide:", error);
        alert("Failed to add slide.");
      }
    }
  }

  const onEditorStateChange = (newEditorState) => {
    const editorContent = newEditorState.getCurrentContent().getPlainText();
    setEditorState(newEditorState);
    setFormData((prevFormData) => ({
      ...prevFormData,
      editorContent: editorContent,
    }));
  };

  const fetchImages2 = async () => {
    try {
      const response = await fetch(`${mongopath}get-add-home-slider-img`);
      if (response.ok) {
        const imageData = await response.json();
        setImages2(imageData);
      } else {
        console.error("Failed to fetch images.");
      }
    } catch (error) {
      console.error("Error during image fetch:", error);
    }
  };
  

  useEffect(() => {
    fetchImages2();
  }, []);

  const handleDelete = async (indexToDelete) => {
    const updatedFile = file.filter((_, index) => index !== indexToDelete);
    setFileArr(updatedFile);
  };

  const handleImageSelect = (imageId) => {
    setSelectedImageId(imageId);
  };

  useEffect(() => {
    const id = params.name;
    const fetchData = async (id) => {
      if (id !== undefined) {
        try {
          const response = await axios.get(`${mongopath}get-slide-data/${id}`);
          const slideData = response.data.formData;
          const imageData = response.data.imageData;

          setFormData({
            publish: slideData.publish,
            editorContent: slideData.editorContent,
            title: slideData.title,
            file: [imageData],
          });

          setValue(slideData.publish.toString());
          setFileArr(imageData ? [imageData] : []);
          const contentState = ContentState.createFromText(slideData.editorContent);
          setEditorState(EditorState.createWithContent(contentState));
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData(id);
  }, [params.name]);

  return (
    <>
      <div className="flex-grow-1">
        <nav className="layout-navbar navbar navbar-expand-xl navbar-detached align-items-center" id="layout-navbar">
          <div className="navbar-nav-right d-flex align-items-center mt-3" id="navbar-collapse">
            <div className="navbar-nav align-items-center">
              <div className="nav-item d-flex align-items-center">
                <ul className="navbar-nav flex-row align-items-center ms-auto">
                  <li className="nav-item lh-1 me-3">
                    {routeValue === "addslide" ? (
                      <h4 className="align-items-center text-dark pageManager">Add New Slide</h4>
                    ) : (
                      <h4 className="align-items-center text-light pageManager">Edit</h4>
                    )}
                  </li>
                </ul>
              </div>
            </div>
            <ul className="navbar-nav flex-row align-items-center ms-auto">
              <li className="nav-item lh-1 me-3">
                <Button onClick={goBack} leftIcon={<IoMdArrowBack />} className="btn">
                  Back
                </Button>
              </li>
              <li className="nav-item lh-1 me-3">
                <Button leftIcon={<MdOutlineCancel />} className="btn">
                  Cancel
                </Button>
              </li>
            </ul>
          </div>
        </nav>
        <div className="for-edit me-3 mt-4">
          <div className="row d-flex">
            <div className="col-md-5">
              <FormControl>
                <div className="row">
                  <div className="col-md-6 ps-0 for_input mb-2">
                    <FormLabel>Title:</FormLabel>
                    <Input
                      className={name ? "form-control error-border" : "form-control"}
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      type="text"
                    />
                    {name ? <p className="error">{name}</p> : null}
                  </div>
                  <div className="col-md-6 ps-3 mb-2">
                    <FormLabel>Active</FormLabel>
                    <RadioGroup
                      onChange={(value) => {
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          publish: parseInt(value),
                        }));
                        setValue(value);
                      }}
                      value={value}
                    >
                      <Radio value="1">Yes</Radio>
                      <Radio value="2">No</Radio>
                    </RadioGroup>
                  </div>
                  <div className="slide-img-sec col-md-6 ps-0 mb-2 text-left">
                    <FormLabel>Slide Image</FormLabel>
                    <Button colorScheme="blue" data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="mt-2">
                      Upload Image
                    </Button>
                  </div>
                </div>
              </FormControl>
            </div>
            <div className="col-md-7 add-slide-editor">
              <FormLabel>Slide Text</FormLabel>
              <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
              />
                 {description ? <p className="error">{description}</p> : null}
            </div>
            <div>
              {file.map((selectedImage, index) => (
                <div key={selectedImage._id}>
                  <img
                    src={`${imgUrl}${selectedImage.filename}`}
                    alt={selectedImage.filename}
                    style={{
                      maxWidth: "90px",
                      maxHeight: "90px",
                      margin: "10px",
                      border: selectedImage._id === selectedImageId ? "2px solid red" : "none",
                    }}
                    onClick={() => handleImageSelect(selectedImage._id)}
                  />
                  <button onClick={() => handleDelete(index)}>
                    <MdDelete />
                  </button>
                </div>
              ))}
            </div>
            <div className="col-md-12 mt-4 text-left">
              {routeValue === "addslide" ? (
                <Button onClick={handleSubmit} colorScheme="blue" size="md">
                  Add Page
                </Button>
              ) : (
                <Button onClick={handleSubmit} colorScheme="blue" size="md">
                  Update Page
                </Button>
              )}
            </div>
          </div>
          <Uploadimg setFile={setFileArr} />
        </div>
      </div>
    </>
  );
};

export default Addslide;

