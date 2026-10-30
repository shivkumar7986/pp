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
import TagsInput from "react-tagsinput";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import Uploadimg from "../../Homeslider/Uploadimg";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { mongopath } from "../../Mongopath/Mongopath";
import { imgUrl } from "../../Mongopath/Mongopath";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import BlogUpload from "../BlogUpload";
import { MdDelete } from "react-icons/md";

const Addnewblog1 = () => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    file: [],
    metatitle: "",
    metades: "",
    published: "",
    frontpage: "",
    editorContent: "",
    selected: [],
    url: "",
    htmlContent: "",
    category: "",
    date: "",
    selectedImage: null, 
  });

  const [selectedTags, setSelectedTags] = useState([]);
  const [file, setFileArr] = useState([]);

  const [images2, setImages2] = useState([]);
  const [value, setValue] = React.useState("2");
  const [value2, setValue2] = React.useState("2");

  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedImageId, setSelectedImageId] = useState(null);

  function getRouteValue() {
    var path = window.location.pathname;
    // Perform string manipulation or parsing to extract the desired value
    // For example, you might split the path and get the last part
    var parts = path.split("/");
    var value = parts[parts.length - 1];
    return value;
  }
  var routeValue = getRouteValue();
  //Navigate back to the previous page
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const params = useParams();
  const generateSlug = (input) => {
    const cleanedInput = input.replace(/[^a-zA-Z]+/g, " ");
    return cleanedInput.toLowerCase().replace(/\s+/g, "-");
  };

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
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [metatitle, setMetatitle] = useState("");
  const [metades, setMetades] = useState("");
  useEffect(() => {
    // Fetch uploaded images from backend when component mounts
    fetchUploadedImages();
  }, []);

  // Function to fetch uploaded images from backend
  const fetchUploadedImages = async () => {
    try {
      const response = await axios.get(`${mongopath}get/selected/images`);
      if (response.data.success) {
        setUploadedImages(response.data.images);
      } else {
        console.error("Failed to fetch uploaded images.");
      }
    } catch (error) {
      console.error("Error during image fetch:", error);
    }
  };
  const handleDelete = async (indexToDelete) => {
    const updatedFile = file.filter((_, index) => index !== indexToDelete);
    setFileArr(updatedFile);
  };

// Handler to capture the selected image
// const handleImageSelects = (image) => {
//   setSelectedImage(image);
//   // Update form data with the selected image URL
//   setFormData((prevFormData) => ({
//     ...prevFormData,
//     selected: image.file // Assuming 'selected' corresponds to the image URL in form data
//   }));
// };
const handleTagsChange = (tags) => {
  setSelectedTags(tags);
  setFormData((prevFormData) => ({
    ...prevFormData,
    selected: tags,
  }));
};
  const handleSubmit = async (e) => {

    e.preventDefault();
    const updatedFormData = {
      ...formData,
      selected: selectedTags,
    };
    // if (!formData.selected) {
    //   alert("Please select an image.");
    //   return;
    // }
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

    if (validation === false) {
          try {

            const formDataToSend = new FormData();
        formDataToSend.append("title", updatedFormData.title);
        formDataToSend.append("publish", updatedFormData.publish);
        formDataToSend.append("editorContent", updatedFormData.editorContent);

        file.forEach((singleFile) => {
          formDataToSend.append("file", singleFile._id);
        });

        // Log FormData content
        for (let pair of formDataToSend.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }
            if (id != undefined) {
              await axios.put(`${mongopath}edit-blog/${id}`, formDataToSend);
              alert("Form submitted successfully!");
              console.log(formData);
            } else {


              await axios.post(`${mongopath}submit-blog-form`, formDataToSend);
              alert("Form submitted successfully!");
            
              // Append each file individually
              file.forEach((singleFile) => {
                formData.append("file[]", JSON.stringify(singleFile));
                // formDataToSend.append("file", singleFile);
              });
              // const response = await axios.post(`${mongopath}add`, formDataToSend);
              // formdata.append('tags', JSON.stringify(tags));
    
              // Handle success response
              // console.log(response.data);
              alert("Form submitted successfully!");
            }
          } catch (error) {
            // Handle error response
            console.error("Error adding slide:", error);
            alert("Failed to add slide.");
          }
        }
 
  };
  // const handleSubmit = async () => {
  //   console.log(file);
  //   let id = params.name;

  //   let validation = false;
  //   if (formData.title === "") {
  //     validation = true;
  //     setName("Title is required");
  //   } else {
  //     setName("");
  //   }

  //   if (validation === false) {
  //     try {
  //       if (id !== undefined) {
  //         await axios.put(`${mongopath}edit/slide/${id}`, formData);
  //       } else {
  //         const formDataToSend = new FormData();
  //         formDataToSend.append("title", formData.title);
  //         formDataToSend.append("publish", formData.publish);
  //         formDataToSend.append("editorContent", formData.editorContent);

  //         // Append each file individually
  //         file.forEach((singleFile) => {
  //           formDataToSend.append("file[]", JSON.stringify(singleFile));
  //           // formDataToSend.append("file", singleFile);
  //         });
  //         const response = await axios.post(`${mongopath}add`, formDataToSend);
  //         // formdata.append('tags', JSON.stringify(tags));

  //         // Handle success response
  //         console.log(response.data);
  //         alert("Form submitted successfully!");
  //       }
  //     } catch (error) {
  //       // Handle error response
  //       console.error("Error adding slide:", error);
  //       alert("Failed to add slide.");
  //     }
  //   }
  // };

  //for  adding image  that is uploaded in table

  const fetchImages2 = async () => {
    try {
      const response = await fetch(`${mongopath}get-add-img`);
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
    // Fetch images when the component mounts
    fetchImages2();
  }, []);

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
      }));
    }
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
            selected: response.data.selected,

            metatitle: response.data.metatitle,
            metades: response.data.metades,
            frontpage: response.data.frontpage,
            published: response.data.published,
            editorContent: response.data.editorContent,
            date: response.data.date,
            category: response.data.category,
          });
          setSelectedTags(response.data.selected);

          //set the initial state of radio buttons
          setValue(
            response.data.frontpage ? response.data.frontpage.toString() : "2"
          );
          setValue2(
            response.data.published ? response.data.published.toString() : "2"
          );

          setEditorState(() => {
            const content = ContentState.createFromBlockArray(
              convertFromHTML(response.data.editorContent)
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

  const handleAddImage = (imageData) => {
    // Update state to include the newly added image data
    setUploadedImages([...uploadedImages, imageData]);
  };


  const handleImageSelect = (imageId) => {
    setSelectedImageId(imageId);
  };


 
  // const handleDelete = (indexToDelete, e) => {
  //   e.preventDefault();
  //   const updatedImages = uploadedImages.filter((image, index) => index !== indexToDelete);
  //   setUploadedImages(updatedImages);
  // };
  
  
  return (
    <div>
      <nav
        className="layout-navbar navbar navbar-expand-xl navbar-detached align-items-center inNav"
        id="layout-navbar"
      >
     
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
                  <div className="title mt-4">
                    {routeValue == "addNewPost" ? (
                      <h4 className="align-items-center">New Blog</h4>
                    ) : (
                      <h4 className="align-items-center">Edit Blog </h4>
                    )}
                  </div>
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

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-8 pe-3">
            <div>
              <div className="row m-0 mb-4">
                <FormControl className="col-md-6 ps-0">
                  <FormLabel>Page Name</FormLabel>
                  <Input
                    id="inpName"
                    type="text"
                    onChange={handleChange}
                    name="name"
                    value={formData.name}
                  />
                  {name ? <p className="error">{name}</p> : null}
                </FormControl>
                <FormControl className="col-md-6 pe-0">
                  <FormLabel>Page Slug</FormLabel>
                  <Input
                    className={
                      slug
                        ? "form-control error-border for-input w-full"
                        : "form-control for-input w-full"
                    }
                    id="inpSlug"
                    type="text"
                    name="slug"
                    disabled={formData.name !== ""}
                    value={formData.slug}
                    onChange={handleChange}
                  />

                  {slug ? <p className="error">{slug}</p> : null}
                </FormControl>
              </div>
            </div>
            <div className="row m-0 mb-4">
              <div className="col-md-6 ps-0">
                <RadioGroup onChange={setValue} value={value}>
                  <FormLabel>FrontPage</FormLabel>
                  <div direction="row " className="text-left for-flex">
                    <Radio
                      value="1"
                      name="frontpage"
                      // // checked={formData.frontpage === "1"}
                      // checked={formData.frontpage === 1 ? true : false}
                      onChange={handleChange}
                    >
                      Yes
                    </Radio>
                    <Radio
                      value="2"
                      name="frontpage"
                      checked={formData.frontpage === "2"}
                      onChange={handleChange}
                    >
                      No
                    </Radio>
                  </div>
                </RadioGroup>
              </div>
              <div className="col-md-6 pe-0">
                <RadioGroup onChange={setValue2} value={value2}>
                  <FormLabel>Published</FormLabel>
                  <div direction="row" className="text-left for-flex">
                    <Radio
                      value="1"
                      name="published"
                      checked={formData.published === "1"}
                      onChange={handleChange}
                    >
                      Yes
                    </Radio>
                    <Radio
                      value="2"
                      name="published"
                      checked={formData.published === "2"}
                      onChange={handleChange}
                    >
                      No
                    </Radio>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <div className="row m-0 mb-4 items-center">
              <div className="col-md-9 ps-0">
                <FormLabel>Page Content:</FormLabel>
              </div>
              <div className="col-md-3 menubtn text-end p-0">
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
                </Menu>
              </div>
            </div>
            <Button
              colorScheme="blue"
              data-bs-toggle="modal"
              data-bs-target="#blodmodal"
              className="mt-2"
            >
              Upload Image
            </Button>
      {/* Display the selected image */}
      <div>
      {uploadedImages.map((selectedImage, index) => (
  <div key={selectedImage._id}>
    <img
      src={`${imgUrl}${selectedImage.filename}`}
      alt={selectedImage.filename}
      style={{
        maxWidth: "90px",
        maxHeight: "90px",
        margin: "10px",
        border:
          selectedImage._id === selectedImageId
            ? "2px solid red"
            : "none",
      }}
      onClick={() => handleImageSelect(selectedImage._id)}
    />
    <button onClick={(e) => handleDelete(index, e)}>
      <MdDelete />
    </button>
  </div>
))}

        
    
      </div>
{/* <div className="d-flex flex-row">
  {images2.map((image, index) => (
    <div key={index} onClick={() => handleImageSelects(image)}>
      <img
        src={`${imgUrl}${image.file}`}
        alt={image.file}
        style={{
          maxWidth: "90px",
          maxHeight: "90px",
          margin: "0 auto",
          border: selectedImage === image ? '2px solid blue' : 'none' // Highlight selected image
        }}
      />
    </div>
  ))}
</div> */}

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
          <div className="col-md-4 ps-3">
            <div className="d-flex flex-row mb-3 w-full">
              <ul className="w-full me-3">
                <li className="list-group-item w-full">
                  {/* <h4>Search Engine Optimization</h4> */}
                </li>
                <li className="list-group-item w-full mb-4">
                  {" "}
                  <FormControl>
                    <FormLabel>Meta Title</FormLabel>
                    <Input
                      className={
                        metatitle
                          ? "form-control error-border for-input w-full"
                          : "form-control for-input w-full"
                      }
                      type="text"
                      name="metatitle"
                      value={formData.metatitle}
                      onChange={handleChange}
                    />
                    {metatitle ? <p className="error">{metatitle}</p> : null}
                  </FormControl>
                </li>
                <li className="list-group-item w-full mb-4">
                  {" "}
                  <FormControl>
                    <FormLabel>Meta Description</FormLabel>

                    <Input
                      className={
                        metades
                          ? "form-control error-border for-input w-full"
                          : "form-control for-input w-full"
                      }
                      type="text"
                      name="metades"
                      value={formData.metades}
                      onChange={handleChange}
                    />
                    {metades ? <p className="error">{metades}</p> : null}
                  </FormControl>
                </li>
                <li className="list-group-item w-full">
                  <FormControl>
                    <FormLabel>Meta Keywords</FormLabel>
                    <b>Note: Enter keyword and press enter</b>
                    <div>
                      <div>
                        {/* <TagsInput
                            value={formData.selected}
                            name="selected"
                            onChange={setSelected}
                            style={{ marginRight: "5px" }}
                          /> */}

<TagsInput
                                value={selectedTags}
                                name="selected"
                                onChange={handleTagsChange}
                                style={{ marginRight: "5px" }}
                              />     
                      </div>
                    </div>
                  </FormControl>
                </li>

                {/* <li class="list-group-item">
                    {routeValue == "addNewPage" ? (
                      <Button type="submit" colorScheme="blue" size="md">
                        Add Page
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        colorScheme="blue"
                        size="md"
                      >
                        Update page
                      </Button>
                    )}
                  </li> */}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-12 ps-0 text-left mt-4">
          {routeValue == "addNewPost" ? (
            <Button type="submit" colorScheme="blue" size="md">
              Add Page
            </Button>
          ) : (
            <Button colorScheme="blue" size="md">
              Update page
            </Button>
          )}
        </div>
      </form>

      <BlogUpload setFile={setFileArr} handleAddImage={handleAddImage}/>

    </div>
  );
};

export default Addnewblog1;

// import React from "react";
// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { Button, Select } from "@chakra-ui/react";
// import { IoMdArrowBack } from "react-icons/io";
// import { MdOutlineCancel } from "react-icons/md";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import TagsInput from "react-tagsinput";
// import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
// import { ChevronDownIcon } from "@chakra-ui/icons";
// import { FormControl, FormLabel, Input } from "@chakra-ui/react";
// import { Radio, RadioGroup } from "@chakra-ui/react";
// import Uploadimg from "../../Homeslider/Uploadimg";
// import { useEffect } from "react";
// import { Helmet } from "react-helmet";
// import { mongopath } from "../../Mongopath/Mongopath";
// import { imgUrl } from "../../Mongopath/Mongopath";
// import { EditorState, ContentState, convertFromHTML } from "draft-js";
// import BlogUpload from "../BlogUpload";
// import { MdDelete } from "react-icons/md";

// const Addnewblog1 = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     slug: "",
//     metatitle: "",
//     metades: "",
//     published: "",
//     frontpage: "",
//     editorContent: "",
//     selected: [],
//     url: "",
//     htmlContent: "",
//     category: "",
//     date: "",
//     selectedImage: null, 
//   });

//   const [selectedTags, setSelectedTags] = useState([]);

//   const [images2, setImages2] = useState([]);
//   const [value, setValue] = React.useState("2");
//   const [value2, setValue2] = React.useState("2");

//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [selectedImageId, setSelectedImageId] = useState(null);
//   const [file, setFileArr] = useState([]);

//   function getRouteValue() {
//     var path = window.location.pathname;
//     // Perform string manipulation or parsing to extract the desired value
//     // For example, you might split the path and get the last part
//     var parts = path.split("/");
//     var value = parts[parts.length - 1];
//     return value;
//   }
//   var routeValue = getRouteValue();
//   //Navigate back to the previous page
//   const navigate = useNavigate();
//   const goBack = () => {
//     navigate(-1); // Navigate back to the previous page
//   };

//   const params = useParams();
//   const generateSlug = (input) => {
//     const cleanedInput = input.replace(/[^a-zA-Z]+/g, " ");
//     return cleanedInput.toLowerCase().replace(/\s+/g, "-");
//   };

//   //for getting the editor data
//   const [editorState, setEditorState] = useState(() => {
//     const content = ContentState.createFromText("");
//     return EditorState.createWithContent(content);
//   });

//   const onEditorStateChange = (newEditorState) => {
//     // Extract the plain text content from the newEditorState
//     const editorContent = newEditorState.getCurrentContent().getPlainText();
//     setEditorState(newEditorState);
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       editorContent: editorContent,
//     }));
//   };
//   const [name, setName] = useState("");
//   const [slug, setSlug] = useState("");
//   const [metatitle, setMetatitle] = useState("");
//   const [metades, setMetades] = useState("");
//   useEffect(() => {
//     // Fetch uploaded images from backend when component mounts
//     fetchUploadedImages();
//   }, []);

//   // Function to fetch uploaded images from backend
//   const fetchUploadedImages = async () => {
//     try {
//       const response = await axios.get(`${mongopath}get/selected/images`);
//       if (response.data.success) {
//         setUploadedImages(response.data.images);
//       } else {
//         console.error("Failed to fetch uploaded images.");
//       }
//     } catch (error) {
//       console.error("Error during image fetch:", error);
//     }
//   };


// // Handler to capture the selected image
// // const handleImageSelects = (image) => {
// //   setSelectedImage(image);
// //   // Update form data with the selected image URL
// //   setFormData((prevFormData) => ({
// //     ...prevFormData,
// //     selected: image.file // Assuming 'selected' corresponds to the image URL in form data
// //   }));
// // };
// const handleTagsChange = (tags) => {
//   setSelectedTags(tags);
//   setFormData((prevFormData) => ({
//     ...prevFormData,
//     selected: tags,
//   }));
// };
//   const handleSubmit = async (e) => {

//     e.preventDefault();
//     const updatedFormData = {
//       ...formData,
//       selected: selectedTags,
//     };
//     // if (!formData.selected) {
//     //   alert("Please select an image.");
//     //   return;
//     // }
//     // console.log(updatedFormData)
//     let id = params.name;
//     // // Validate required fields
//     let validation = false;
//     if (updatedFormData.name == "") {
//       validation = true;

//       setName("name is required");
//     } else {
//       setName("");
//     }
//     if (updatedFormData.slug == "") {
//       validation = true;
//       setSlug("slug  is required");
//     } else {
//       setSlug("");
//     }
//     if (updatedFormData.metatitle == "") {
//       validation = true;
//       setMetatitle("Title is required");
//     } else if (updatedFormData.metatitle >= 60) {
//       validation = true;
//       setMetatitle("Title should be less");
//     } else {
//       setMetatitle("");
//     }
//     if (updatedFormData.metades == "") {
//       validation = true;
//       setMetades("description is required");
//     } else if (updatedFormData.metades >= 150) {
//       validation = true;
//       setMetades("Descriptin should be less");
//     } else {
//       setMetades("");
//     }

//     if (validation === false) {
//           try {
//             if (id != undefined) {
//               await axios.put(`${mongopath}edit-blog/${id}`, updatedFormData);
//               alert("Form submitted successfully!");
//               console.log(formData);
//             } else {
//               await axios.post(`${mongopath}submit-blog-form`, updatedFormData);
//               alert("Form submitted successfully!");
            
//               // Append each file individually
//               file.forEach((singleFile) => {
//                 formData.append("file[]", JSON.stringify(singleFile));
//                 // formDataToSend.append("file", singleFile);
//               });
//               // const response = await axios.post(`${mongopath}add`, formDataToSend);
//               // formdata.append('tags', JSON.stringify(tags));
    
//               // Handle success response
//               // console.log(response.data);
//               alert("Form submitted successfully!");
//             }
//           } catch (error) {
//             // Handle error response
//             console.error("Error adding slide:", error);
//             alert("Failed to add slide.");
//           }
//         }
 
//   };
//   // const handleSubmit = async () => {
//   //   console.log(file);
//   //   let id = params.name;

//   //   let validation = false;
//   //   if (formData.title === "") {
//   //     validation = true;
//   //     setName("Title is required");
//   //   } else {
//   //     setName("");
//   //   }

//   //   if (validation === false) {
//   //     try {
//   //       if (id !== undefined) {
//   //         await axios.put(`${mongopath}edit/slide/${id}`, formData);
//   //       } else {
//   //         const formDataToSend = new FormData();
//   //         formDataToSend.append("title", formData.title);
//   //         formDataToSend.append("publish", formData.publish);
//   //         formDataToSend.append("editorContent", formData.editorContent);

//   //         // Append each file individually
//   //         file.forEach((singleFile) => {
//   //           formDataToSend.append("file[]", JSON.stringify(singleFile));
//   //           // formDataToSend.append("file", singleFile);
//   //         });
//   //         const response = await axios.post(`${mongopath}add`, formDataToSend);
//   //         // formdata.append('tags', JSON.stringify(tags));

//   //         // Handle success response
//   //         console.log(response.data);
//   //         alert("Form submitted successfully!");
//   //       }
//   //     } catch (error) {
//   //       // Handle error response
//   //       console.error("Error adding slide:", error);
//   //       alert("Failed to add slide.");
//   //     }
//   //   }
//   // };

//   //for  adding image  that is uploaded in table

//   const fetchImages2 = async () => {
//     try {
//       const response = await fetch(`${mongopath}get-add-img`);
//       if (response.ok) {
//         const imageData = await response.json();
//         setImages2(imageData);
//       } else {
//         console.error("Failed to fetch images.");
//       }
//     } catch (error) {
//       console.error("Error during image fetch:", error);
//     }
//   };
//   useEffect(() => {
//     // Fetch images when the component mounts
//     fetchImages2();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//       slug: name === "name" ? generateSlug(value) : prevFormData.slug,
//     }));
//     if (name === "slug" && value) {
//       setFormData((prevInputValues) => ({
//         ...prevInputValues,
//       }));
//     }
//   };

//   //to get table data again in form to edit
//   useEffect(() => {
//     let id = params.name;
//     // console.log(id)
//     const fetchData = async (id) => {
//       if (id != undefined) {
//         try {
//           const response = await axios.get(
//             `${mongopath}get-blog-edit-data/` + id
//           );
//           setFormData({
//             name: response.data.name,
//             slug: response.data.slug,
//             selected: response.data.selected,

//             metatitle: response.data.metatitle,
//             metades: response.data.metades,
//             frontpage: response.data.frontpage,
//             published: response.data.published,
//             editorContent: response.data.editorContent,
//             date: response.data.date,
//             category: response.data.category,
//           });
//           setSelectedTags(response.data.selected);

//           //set the initial state of radio buttons
//           setValue(
//             response.data.frontpage ? response.data.frontpage.toString() : "2"
//           );
//           setValue2(
//             response.data.published ? response.data.published.toString() : "2"
//           );

//           setEditorState(() => {
//             const content = ContentState.createFromBlockArray(
//               convertFromHTML(response.data.editorContent)
//             );
//             return EditorState.createWithContent(content);
//           });
//         } catch (error) {
//           console.error(error);
//         }
//       }
//     };
//     fetchData(id);
//   }, []);

//   const handleAddImage = (imageData) => {
//     // Update state to include the newly added image data
//     setUploadedImages([...uploadedImages, imageData]);
//   };


//   const handleImageSelect = (imageId) => {
//     setSelectedImageId(imageId);
//   };


 
//   const handleDelete = (indexToDelete, e) => {
//     e.preventDefault();
//     const updatedImages = uploadedImages.filter((image, index) => index !== indexToDelete);
//     setUploadedImages(updatedImages);
//   };
  
  
//   return (
//     <div>
//       <nav className="layout-navbar navbar navbar-expand-xl navbar-detached align-items-center inNav" id="layout-navbar">
//         <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
//           <div className="navbar-nav align-items-center">
//             <div className="nav-item d-flex align-items-center">
//               <ul className="navbar-nav flex-row align-items-center ms-auto">
//                 <li className="nav-item lh-1 me-3">
//                   <div className="title mt-4">
//                     {routeValue === "addNewPost" ? (
//                       <h4 className="align-items-center">New Blog</h4>
//                     ) : (
//                       <h4 className="align-items-center">Edit Blog </h4>
//                     )}
//                   </div>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <ul className="navbar-nav flex-row align-items-center ms-auto">
//             <li className="nav-item lh-1 me-3">
//               <Button onClick={() => navigate(-1)} leftIcon={<IoMdArrowBack />} className="btn">Back</Button>
//             </li>
//             <li className="nav-item lh-1 me-3">
//               <Button leftIcon={<MdOutlineCancel />} className="btn">Cancel</Button>
//             </li>
//           </ul>
//         </div>
//       </nav>

//       <form onSubmit={handleSubmit}>
//         <div className="row">
//           <div className="col-md-8 pe-3">
//             <div>
//               <div className="row m-0 mb-4">
//                 <FormControl className="col-md-6 ps-0">
//                   <FormLabel>Page Name</FormLabel>
//                   <Input id="inpName" type="text" onChange={handleChange} name="name" value={formData.name} />
//                   {name && <p className="error">{name}</p>}
//                 </FormControl>
//                 <FormControl className="col-md-6 pe-0">
//                   <FormLabel>Page Slug</FormLabel>
//                   <Input id="inpSlug" type="text" name="slug" onChange={handleChange} value={formData.slug} />
//                   {slug && <p className="error">{slug}</p>}
//                 </FormControl>
//               </div>
//             </div>

//             <div>
//               <div className="row m-0 mb-4">
//                 <FormControl className="col-md-6 ps-0">
//                   <FormLabel>Meta Title</FormLabel>
//                   <Input id="inpTitle" type="text" onChange={handleChange} name="metatitle" value={formData.metatitle} />
//                   {metatitle && <p className="error">{metatitle}</p>}
//                 </FormControl>
//                 <FormControl className="col-md-6 pe-0">
//                   <FormLabel>Meta Description</FormLabel>
//                   <Input id="inpDes" type="text" name="metades" onChange={handleChange} value={formData.metades} />
//                   {metades && <p className="error">{metades}</p>}
//                 </FormControl>
//               </div>
//             </div>

//             <div className="row m-0 mb-4">
//               <FormControl className="col-md-12 ps-0">
//                 <FormLabel>Selected Tags</FormLabel>
//                 <TagsInput value={selectedTags} onChange={handleTagsChange} name="selected" />
//               </FormControl>
//             </div>

//             <div className="col-md-12">
//               <Editor
//                 editorState={editorState}
//                 wrapperClassName="demo-wrapper"
//                 editorClassName="demo-editor"
//                 onEditorStateChange={onEditorStateChange}
//               />
//             </div>
//           </div>
//         </div>
        
//         <Button type="submit" className="btn">Submit</Button>
//       </form>
//     </div>
//   );
// };

// export default Addnewblog1;