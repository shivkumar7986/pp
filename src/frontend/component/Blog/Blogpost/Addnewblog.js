import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Select } from "@chakra-ui/react";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState } from "draft-js";
import { TagsInput } from "react-tag-input-component";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { mongopath } from "../../Mongopath/Mongopath";

const Addnewblog = () => {
  const [value, setValue] = React.useState("2");
  const [value2, setValue2] = React.useState("2");
  const [selected, setSelected] = useState([""]);

  // Function to get the value from the route
  function getRouteValue() {
    var path = window.location.pathname
    var parts = path.split("/")
    var value = parts[parts.length - 1]
    return value;
  }
  var routeValue = getRouteValue()

  //Navigate back to the previous page
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const params = useParams()
  // console.log(params);

  //for form data
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    metatitle: "",
    metades: "",
    published: "",
    frontpage: "",
    editorContent: "",
    selected: "",
    url: "",
    htmlContent: "",
    category: "",
    date: "",
  })

  const [name, setName] = useState("")

  const [slug, setSlug] = useState("")
  const [metatitle, setMetatitle] = useState("")
  const [metades, setMetades] = useState("")
  const [category, setCategory] = useState([])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      slug: name === "name" ? generateSlug(value) : prevFormData.slug,
    }));
    if (name === "slug" && value) {
      setFormData((prevInputValues) => ({
        ...prevInputValues,
        name: "",
        url: "",
      }));
    }
  };

  const generateSlug = (input) => {
    const cleanedInput = input.replace(/[^a-zA-Z]+/g, " ");
    return cleanedInput.toLowerCase().replace(/\s+/g, "-");
  }

  //for getting the editor data
  const [editorState, setEditorState] = useState(() => {
    const content = ContentState.createFromText("");
    return EditorState.createWithContent(content);
  });

  const onEditorStateChange = (newEditorState) => {
    // Extract the plain text content from the newEditorState
    const editorContent = newEditorState.getCurrentContent().getPlainText();
    setEditorState(newEditorState);

    setFormData((prevFormData) => ({
      ...prevFormData,
      editorContent: editorContent,
    }));
  };

  //to get table data again in form to edit
  useEffect(() => {
    let id = params.name;
    // console.log(id)
    const fetchData = async (id) => {
      if (id != undefined) {
        try {
          const response = await axios.get(
            `${mongopath}get-blog-edit-data/` + id
          );
          setFormData({
            name: response.data.name,
            slug: response.data.slug,
            metatitle: response.data.metatitle,
            metades: response.data.metades,
            frontpage: response.data.frontpage,
            published: response.data.published,
            editorContent: response.data.editorContent,
            selected: response.data.selected,
            url: response.data.url,
            date: response.data.date
              ? new Date(response.data.date).toISOString().split("T")[0]
              : "",
            category: response.data.category,
          });

          // Set the initial state of radio buttons
          setValue(response.data.frontpage.toString());
          setValue2(response.data.published.toString());
          setEditorState(() => {
            const content = ContentState.createFromText(
              response.data.editorContent
            );
            return EditorState.createWithContent(content);
          });
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData(id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      selected: selected, // Include the selected tags in the formData
    };
    // console.log(updatedFormData)
    let id = params.name;
    // // Validate required fields
    let validation = false;
    if (updatedFormData.name == "") {
      validation = true;

      setName("name is required");
    } else {
      setName("");
    }
    if (updatedFormData.slug == "") {
      validation = true;
      setSlug("slug  is required");
    } else {
      setSlug("");
    }
    if (updatedFormData.metatitle == "") {
      validation = true;
      setMetatitle("Title is required");
    } else if (updatedFormData.metatitle >= 60) {
      validation = true;
      setMetatitle("Title should be less");
    } else {
      setMetatitle("");
    }
    if (updatedFormData.metades == "") {
      validation = true;
      setMetades("description is required");
    } else if (updatedFormData.metades >= 150) {
      validation = true;
      setMetades("Descriptin should be less");
    } else {
      setMetades("");
    }

    if (validation == false) {
      try {
        if (id != undefined) {
          await axios.put(`${mongopath}edit-blog/${id}`, updatedFormData);
          alert("Form submitted successfully!");
          console.log(updatedFormData);
        } else {
          await axios.post(`${mongopath}submit-blog-form`, updatedFormData);
          alert("Form submitted successfully!");
        }
      } catch (error) {
        if (error.response.data) {
          alert(error.response.data["error"]);
        } else {
          alert("error in submitting the data ");
        }
      }
    }
  };

  useEffect(() => {
    fecthCategory();
  }, []);

  const fecthCategory = async () => {
    try {
      const response = await fetch(`${mongopath}get/category/data`);
      const data = await response.json();
      setCategory(data);
    } catch (error) {
      console.error("Error in fetching the data ", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>{formData.metatitle || "Default Meta Title"}</title>
        <meta
          name="description"
          content={formData.metades || "Default Meta Description"}
        />
        <meta name="author" content={formData.selected || "Default Author"} />
      </Helmet>
      <nav
        className="layout-navbar navbar navbar-expand-xl navbar-detached align-items-center inNav "
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
          {/* Search */}
          <div className="navbar-nav align-items-center">
            <div className="nav-item d-flex align-items-center">
              <ul className="navbar-nav flex-row align-items-center ms-auto">
                {/* Place this tag where you want the button to render. */}
                <li className="nav-item lh-1 me-3">
                  {routeValue == "addNewPost" ? (
                    <h4 className="align-items-center text-dark pageManager">
                      Add New Post
                    </h4>
                  ) : (
                    <h4 className="align-items-center text-light pageManager">
                      Edit Post
                    </h4>
                  )}
                </li>
              </ul>
            </div>
          </div>
          {/* /Search */}
          <ul className="navbar-nav flex-row align-items-center ms-auto">
            {/* Place this tag where you want the button to render. */}

            <li className="nav-item lh-1 me-3">
              <Button
                onClick={goBack}
                leftIcon={<IoMdArrowBack />}
                className="btn"
              >
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

      <div className="container-fluid">
        <form onSubmit={handleSubmit}>
          <div className="row md">
            <div className="col-md-8">
              <div>
                <div className="d-flex">
                  <FormControl>
                    <FormLabel>Title:</FormLabel>
                    <Input
                      class={
                        name ? "form-control error-border" : "form-control"
                      }
                      id="inpName"
                      type="text"
                      onChange={handleChange}
                      name="name"
                      value={formData.name}
                    />
                    {name ? <p className="error">{name}</p> : null}
                  </FormControl>
                  <FormControl>
                    <FormLabel>Slug:</FormLabel>
                    <Input
                      class={
                        slug ? "form-control error-border" : "form-control"
                      }
                      id="inpSlug"
                      type="text"
                      name="slug"
                      // disabled={formData.name !== ''}
                      value={formData.slug}
                      onChange={handleChange}
                    />

                    {slug ? <p className="error">{slug}</p> : null}
                  </FormControl>
                </div>
              </div>
              <div className="row md">
                <div className="col-md-6">
                  <RadioGroup onChange={setValue} value={value}>
                    <div>
                      <p>Display Featured image in post</p>
                    </div>
                    <div direction="row">
                      <Radio
                        value="1"
                        name="frontpage"
                        // checked={formData.frontpage === "1"}
                        checked={formData.frontpage === 1 ? true : false}
                        onChange={handleChange}
                      >
                        Yes
                      </Radio>
                      <Radio
                        value="2"
                        name="frontpage"
                        // checked={formData.frontpage === "2"}
                        checked={formData.frontpage === 2 ? true : false}
                        onChange={handleChange}
                      >
                        No
                      </Radio>
                    </div>
                  </RadioGroup>
                </div>
                <div className="col-md-6">
                  <RadioGroup onChange={setValue2} value={value2}>
                    <div>
                      <p>Published</p>
                    </div>
                    <div direction="row">
                      <Radio
                        value="1"
                        name="published"
                        // checked={formData.published === "1"}
                        onChange={handleChange}
                      >
                        Yes
                      </Radio>
                      <Radio
                        value="2"
                        name="published"
                        // checked={formData.published === "2"}
                        onChange={handleChange}
                      >
                        No
                      </Radio>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  {" "}
                  <FormLabel>Category:</FormLabel>
                  <Select
                    id="category"
                    name="category"
                    placeholder="Select the category"
                    onChange={handleChange}
                  >
                    {category &&
                      category.map((option) => (
                        <option
                          value={option._id}
                          selected={formData.category === option._id}
                          key={option._id}
                        >
                          {option.name}
                        </option>
                      ))}
                  </Select>
                  {/* <Input
                    name="category"
                    type="text"
                    onChange={handleChange}
                    value={formData.category}
                  />{" "} */}
                </div>
                <div className="col-md-6">
                  <FormLabel>Blog created on </FormLabel>

                  <Input
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row md">
                <div className="col-md-9">
                  <p>Page Content:</p>
                </div>
                <div className="col-md-3 menubtn">
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      Short Codes
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        Add Album
                      </MenuItem>

                      <MenuItem
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal1"
                      >
                        Add Video
                      </MenuItem>
                    </MenuList>
                    <div
                      class="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                              Select Gallery
                            </h1>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <p>Click on Image to add album shortcode</p>
                            <p></p>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="modal fade"
                      id="exampleModal1"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                              Select Gallery
                            </h1>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <p>Click on Video to add shortcode</p>
                            <p></p>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Menu>
                </div>
              </div>
              <div className="row editorAddpage">
                <div className="col-md-12">
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex flex-row mb-3 ">
                <ul class="">
                  <li class="list-group-item">
                    <h4>Search Engine Optimization</h4>
                  </li>
                  <li class="list-group-item">
                    {" "}
                    <FormControl>
                      <FormLabel>Meta Title</FormLabel>
                      <Input
                        class={
                          metatitle
                            ? "form-control error-border"
                            : "form-control"
                        }
                        type="text"
                        name="metatitle"
                        value={formData.metatitle}
                        onChange={handleChange}
                      />
                      {metatitle ? <p className="error">{metatitle}</p> : null}
                    </FormControl>
                  </li>
                  <li class="list-group-item">
                    {" "}
                    <FormControl>
                      <FormLabel>Meta Description</FormLabel>

                      <Input
                        class={
                          metades ? "form-control error-border" : "form-control"
                        }
                        type="text"
                        name="metades"
                        value={formData.metades}
                        onChange={handleChange}
                      />
                      {metades ? <p className="error">{metades}</p> : null}
                    </FormControl>
                  </li>
                  <li class="list-group-item">
                    {" "}
                    <FormControl>
                      <FormLabel>Meta Keywords</FormLabel>
                      {/* <input type="text" value="Amsterdam,Washington" data-role="tagsinput"  />  */}
                      <b>Note: Enter keyword and press enter</b>
                      {/* <TagsInput value={tags} onChange={handleChangee} /> */}
                      <div>
                        <div>
                          <TagsInput
                            value={formData.selected}
                            name="selected"
                            onChange={setSelected}
                            style={{ marginRight: "5px" }}
                          />
                        </div>
                      </div>
                    </FormControl>
                  </li>

                  <li class="list-group-item">
                    {routeValue == "addNewPost" ? (
                      <Button type="submit" colorScheme="blue" size="md">
                        Add Post
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        colorScheme="blue"
                        size="md"
                      >
                        Update post
                      </Button>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Addnewblog;
