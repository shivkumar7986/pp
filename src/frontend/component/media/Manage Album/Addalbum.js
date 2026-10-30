import React, { useEffect, useState } from "react";
import { Button, FormLabel, Input } from "@chakra-ui/react";

import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";

import { MdOutlineSegment } from "react-icons/md";

import "../Common.css";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState } from "draft-js";
import { useParams } from "react-router-dom";

import { mongopath } from "../../Mongopath/Mongopath";
const Addalbum = () => {
 
  const params = useParams();
  const [albumData, setAlbumData] = useState({
    name: "",
    editorContent: "",
  });

  const [name, setName] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };



  function getRouteValue() {
    var path = window.location.pathname;
    // Perform string manipulation or parsing to extract the desired value
    // For example, you might split the path and get the last part
    var parts = path.split("/");
    var value = parts[parts.length - 1];
    return value;
  }
  var routeValue = getRouteValue();
  //for getting the editor data
  const [editorState, setEditorState] = useState(() => {
    const content = ContentState.createFromText("");
    return EditorState.createWithContent(content);
  });
  const onEditorStateChange = (newEditorState) => {
    // Assuming the editor content is in HTML format
    const editorContent = newEditorState.getCurrentContent().getPlainText();
    setAlbumData((prevData) => ({
      ...prevData,
      editorContent: editorContent,
    }));
    setEditorState(newEditorState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlbumData((preData) => ({
      ...preData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validation = false;
    if (albumData.name == "") {
      validation = true;
      setName("Name is required");
    } else {
      setName("");
    }

    if (albumData.editorContent == "") {
      validation = true;
      setEditorContent("Content is required");
    } else {
      setEditorContent("");
    }
    if (validation == false) {
      try {
        const response = await axios.post(
          `${mongopath}submit/manage/album`,
          albumData
        );
        alert("Data dubmitted successfully");
        console.log(response);
      } catch (error) {
        console.error("Error in submitting the data ", error);
      }
    }
  };


  //to get table data again in form to edit
  useEffect(() => {
    let id = params.name;
    // console.log(id);
    const fetchData = async (id) => {
      if (id != undefined) {
        try {
          const response = await axios.get(`${mongopath}get/edit/album/data/` + id);
          console.log(response.data.editorContent);
          setAlbumData({
            name: response.data.name,
            editorContent: response.data.editorContent,
         
          });
          setEditorState(() => {
            const content = ContentState.createFromText(
              response.data.editorContent
            );
            return EditorState.createWithContent(content) })
        } catch (error) {
          console.error("Error in getting data   form data:", error);
        }
      }
    };
    fetchData(id);
  },[]);

  return (
    <div className="container">
      <div className="mt-3 layout-wrapper layout-content-navbar">
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

                    {routeValue=="addAlbums"? <h4
                      className="align-items-center"
                      leftIcon={<MdOutlineSegment />}
                        >
                      New Album
                    </h4>: <h4
                      className="align-items-center"
                      leftIcon={<MdOutlineSegment />}
                    >
                     Edit Album
                    </h4>}
                    
                  </li>
                </ul>
              </div>
            </div>
            {/* {/ /Search /} */}
            <ul className="navbar-nav flex-row align-items-center ms-auto">
              {/* {/ Place this tag where you want the button to render. /} */}

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

      <div className="addAlbum form row">
        <form onSubmit={handleSubmit}>
          <div className="col-md-12">
            {" "}
            <FormLabel htmlFor="">Album Name:</FormLabel>
            <Input
              className={name ? "form-control error-border" : "form-control"}
              type="text"
              name="name"
              onChange={handleChange}
              value={albumData.name}
            />
            {name ? <p className="error">{name}</p> : null}
          </div>

          <div className="mt-2">
            {" "}
            <FormLabel className="DescriptionLabel" htmlFor="">
              Description:
            </FormLabel>{" "}
          </div>

          <div className="col-md-12 editor">
            <Editor
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              wrapperClassName="wrapper-class "
              editorClassName="editor-class "
              toolbarClassName="toolbar-class"
            />
            {editorContent ? <p className="error">{editorContent}</p> : null}
          </div>

          <div>
{routeValue=="addAlbums"? 
<Button type="submit" className="float-left mt-5 btn">Add</Button>  : <Button onClick={handleSubmit} >Edit</Button> 
 }

           
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addalbum;
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
