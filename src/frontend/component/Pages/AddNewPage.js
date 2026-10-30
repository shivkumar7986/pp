// import React from "react";
// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { Button, Input } from "@chakra-ui/react";
// import { IoMdArrowBack } from "react-icons/io";
// import { MdOutlineCancel } from "react-icons/md";
// import axios from "axios";
// import { useNavigate, Navigate } from "react-router-dom";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { EditorState, ContentState, convertFromHTML } from "draft-js";
// import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { TagsInput } from "react-tag-input-component";
// import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
// import { ChevronDownIcon } from "@chakra-ui/icons";
// import { FormControl, FormLabel } from "@chakra-ui/react";
// import { Radio, RadioGroup } from "@chakra-ui/react";
// import { useEffect } from "react";
// import { Helmet } from "react-helmet";
// import { mongopath } from "../Mongopath/Mongopath";
// import "./allpage.css";
// const AddNewPage = () => {
//   const [value, setValue] = React.useState("2");
//   const [value2, setValue2] = React.useState("2");
//   const [selected, setSelected] = useState([""]);

//   // Function to get the value from the route
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
//   //for form data
//   const [formData, setFormData] = useState({
//     name: "",
//     slug: "",
//     metatitle: "",
//     metades: "",
//     published: "",
//     frontpage: "",
//     editorContent: "",
//     selected: "",
//     url: "",
//   });

//   const [name, setName] = useState("");
//   const [slug, setSlug] = useState("");
//   const [metatitle, setMetatitle] = useState("");
//   const [metades, setMetades] = useState("");

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
//         name: "",
//         url: "",
//       }));
//     }
//   };

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

//   //to get table data again in form to edit
//   useEffect(() => {
//     let id = params.name;
//     // console.log(id)
//     const fetchData = async (id) => {
//       if (id != undefined) {
//         try {
//           const response = await axios.get(`${mongopath}get-form-data/` + id);
//           setFormData({
//             name: response.data.name,
//             slug: response.data.slug,
//             metatitle: response.data.metatitle,
//             metades: response.data.metades,
//             frontpage: response.data.frontpage,
//             published: response.data.published,
//             editorContent: response.data.editorContent,
//             selected: response.data.selected,
//             url: response.data.url,
//           });

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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const updatedFormData = {
//       ...formData,
//       selected: selected,
//       // Include the selected tags in the formData
//     };
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

//     if (validation == false) {
//       try {
//         if (id != undefined) {
//           await axios.put(`${mongopath}edit/${id}`, updatedFormData);
//           alert("Form submitted successfully!");
//           console.log(updatedFormData);
//         } else {
//           await axios.post(`${mongopath}submit-form`, updatedFormData);
//           alert("Form submitted successfully!");
//         }
//       } catch (error) {
//         if (error.response.data) {
//           alert(error.response.data["error"]);
//         } else {
//           alert("error in submitting the data ");
//         }
//       }
//     }
//   };

//   return (
//     <>
//       <Helmet>
//         <title>{formData.metatitle || "Default Meta Title"}</title>
//         <meta
//           name="description"
//           content={formData.metades || "Default Meta Description"}
//         />
//         <meta name="author" content={formData.selected || "Default Author"} />
//       </Helmet>

//       <div className="container">
//         <nav
//           className="layout-navbar navbar navbar-expand-xl navbar-detached align-items-center inNav"
//           id="layout-navbar"
//         >
//           {/* <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
//             <a
//               className="nav-item nav-link px-0 me-xl-4"
//               href="javascript:void(0)"
//             >
//               <i className="bx bx-menu bx-sm" />
//             </a>
//           </div> */}
//           <div
//             className="navbar-nav-right d-flex align-items-center"
//             id="navbar-collapse"
//           >
//             {/* Search */}
//             <div className="navbar-nav align-items-center">
//               <div className="nav-item d-flex align-items-center">
//                 <ul className="navbar-nav flex-row align-items-center ms-auto">
//                   {/* Place this tag where you want the button to render. */}
//                   <li className="nav-item lh-1 me-3">
//                     <div className="title mt-4">
//                       {routeValue == "addNewPage" ? (
//                         <h4 className="align-items-center">New Page</h4>
//                       ) : (
//                         <h4 className="align-items-center">Edit Page</h4>
//                       )}
//                     </div>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//             {/* /Search */}
//             <ul className="navbar-nav flex-row align-items-center ms-auto">
//               {/* Place this tag where you want the button to render. */}

//               <li className="nav-item lh-1 me-3">
//                 <Button
//                   onClick={goBack}
//                   leftIcon={<IoMdArrowBack />}
//                   className="btn"
//                 >
//                   Back
//                 </Button>
//               </li>
//               <li className="nav-item lh-1 me-3">
//                 <Button leftIcon={<MdOutlineCancel />} className="btn">
//                   Cancel
//                 </Button>
//               </li>
//             </ul>
//           </div>
//         </nav>
//         <form onSubmit={handleSubmit}>
//           <div className="row">
//             <div className="col-md-8 pe-3">
//               <div>
//                 <div className="row m-0 mb-4">
//                   <FormControl className="col-md-6 ps-0">
//                     <FormLabel>Page Name</FormLabel>
//                     <Input
//                       className={
//                         name
//                           ? "form-control error-border for-input w-full"
//                           : "form-control for-input w-full"
//                       }
//                       id="inpName"
//                       type="text"
//                       onChange={handleChange}
//                       name="name"
//                       value={formData.name}
//                     />
//                     {name ? <p className="error">{name}</p> : null}
//                   </FormControl>
//                   <FormControl className="col-md-6 pe-0">
//                     <FormLabel>Page Slug</FormLabel>
//                     <Input
//                       className={
//                         slug
//                           ? "form-control error-border for-input w-full"
//                           : "form-control for-input w-full"
//                       }
//                       id="inpSlug"
//                       type="text"
//                       name="slug"
//                       // disabled={formData.name !== ''}
//                       value={formData.slug}
//                       onChange={handleChange}
//                     />

//                     {slug ? <p className="error">{slug}</p> : null}
//                   </FormControl>
//                 </div>
//               </div>
//               <div className="row m-0 mb-4">
//                 <div className="col-md-6 ps-0">
//                   <RadioGroup onChange={setValue} value={value}>
//                     <FormLabel>FrontPage</FormLabel>
//                     <div direction="row " className="text-left for-flex">
//                       <Radio
//                         value="1"
//                         name="frontpage"
//                         // checked={formData.frontpage === "1"}
//                         checked={formData.frontpage === 1 ? true : false}
//                         onChange={handleChange}
//                       >
//                         Yes
//                       </Radio>
//                       <Radio
//                         value="2"
//                         name="frontpage"
//                         // checked={formData.frontpage === "2"}
//                         checked={formData.frontpage === 2 ? true : false}
//                         onChange={handleChange}
//                       >
//                         No
//                       </Radio>
//                     </div>
//                   </RadioGroup>
//                 </div>
//                 <div className="col-md-6 pe-0">
//                   <RadioGroup onChange={setValue2} value={value2}>
//                     <FormLabel>Published</FormLabel>
//                     <div direction="row" className="text-left for-flex">
//                       <Radio
//                         value="1"
//                         name="published"
//                         // checked={formData.published === "1"}
//                         onChange={handleChange}
//                       >
//                         Yes
//                       </Radio>
//                       <Radio
//                         value="2"
//                         name="published"
//                         // checked={formData.published === "2"}
//                         onChange={handleChange}
//                       >
//                         No
//                       </Radio>
//                     </div>
//                   </RadioGroup>
//                 </div>
//               </div>
//               <div className="row m-0 mb-4 items-center">
//                 <div className="col-md-9 ps-0">
//                   <FormLabel>Page Content:</FormLabel>
//                 </div>
//                 <div className="col-md-3 menubtn text-end p-0">
//                   <Menu>
//                     <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
//                       Short Codes
//                     </MenuButton>
//                     <MenuList>
//                       <MenuItem
//                         data-bs-toggle="modal"
//                         data-bs-target="#exampleModal"
//                       >
//                         Add Album
//                       </MenuItem>

//                       <MenuItem
//                         data-bs-toggle="modal"
//                         data-bs-target="#exampleModal1"
//                       >
//                         Add Video
//                       </MenuItem>
//                     </MenuList>
//                     <div
//                       className="modal fade"
//                       id="exampleModal"
//                       tabindex="-1"
//                       aria-labelledby="exampleModalLabel"
//                       aria-hidden="true"
//                     >
//                       <div className="modal-dialog">
//                         <div className="modal-content">
//                           <div className="modal-header">
//                             <h1
//                               className="modal-title fs-5"
//                               id="exampleModalLabel"
//                             >
//                               Select Gallery
//                             </h1>
//                             <button
//                               type="button"
//                               className="btn-close"
//                               data-bs-dismiss="modal"
//                               aria-label="Close"
//                             ></button>
//                           </div>
//                           <div className="modal-body">
//                             <p>Click on Image to add album shortcode</p>
//                             <p></p>
//                           </div>
//                           <div className="modal-footer">
//                             <button
//                               type="button"
//                               className="btn btn-secondary"
//                               data-bs-dismiss="modal"
//                             >
//                               Close
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div
//                       className="modal fade"
//                       id="exampleModal1"
//                       tabindex="-1"
//                       aria-labelledby="exampleModalLabel"
//                       aria-hidden="true"
//                     >
//                       <div className="modal-dialog">
//                         <div className="modal-content">
//                           <div className="modal-header">
//                             <h1
//                               className="modal-title fs-5"
//                               id="exampleModalLabel"
//                             >
//                               Select Gallery
//                             </h1>
//                             <button
//                               type="button"
//                               className="btn-close"
//                               data-bs-dismiss="modal"
//                               aria-label="Close"
//                             ></button>
//                           </div>
//                           <div className="modal-body">
//                             <p>Click on Video to add shortcode</p>
//                             <p></p>
//                           </div>
//                           <div className="modal-footer">
//                             <button
//                               type="button"
//                               className="btn btn-secondary"
//                               data-bs-dismiss="modal"
//                             >
//                               Close
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </Menu>
//                 </div>
//               </div>
//               <div className="row editorAddpage">
//                 <div className="col-md-12">
//                   <Editor
//                     editorState={editorState}
//                     onEditorStateChange={onEditorStateChange}
//                     wrapperClassName="wrapper-class"
//                     editorClassName="editor-class"
//                     toolbarClassName="toolbar-class"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-4 ps-3">
//               <div className="d-flex flex-row mb-3 w-full">
//                 <ul className="w-full me-3">
//                   <li className="list-group-item w-full">
//                     {/* <h4>Search Engine Optimization</h4> */}
//                   </li>
//                   <li className="list-group-item w-full mb-4">
//                     {" "}
//                     <FormControl>
//                       <FormLabel>Meta Title</FormLabel>
//                       <Input
//                         className={
//                           metatitle
//                             ? "form-control error-border for-input w-full"
//                             : "form-control for-input w-full"
//                         }
//                         type="text"
//                         name="metatitle"
//                         value={formData.metatitle}
//                         onChange={handleChange}
//                       />
//                       {metatitle ? <p className="error">{metatitle}</p> : null}
//                     </FormControl>
//                   </li>
//                   <li className="list-group-item w-full mb-4">
//                     {" "}
//                     <FormControl>
//                       <FormLabel>Meta Description</FormLabel>

//                       <Input
//                         className={
//                           metades
//                             ? "form-control error-border for-input w-full"
//                             : "form-control for-input w-full"
//                         }
//                         type="text"
//                         name="metades"
//                         value={formData.metades}
//                         onChange={handleChange}
//                       />
//                       {metades ? <p className="error">{metades}</p> : null}
//                     </FormControl>
//                   </li>
//                   <li className="list-group-item w-full">
//                     <FormControl>
//                       <FormLabel>Meta Keywords</FormLabel>
//                       <b>Note: Enter keyword and press enter</b>
//                       <div>
//                         <div>
//                           {/* <TagsInput
//                             value={formData.selected}
//                             name="selected"
//                             onChange={setSelected}
//                             style={{ marginRight: "5px" }}
//                           /> */}

//                           <input
//                             type="text"
//                             name="selected"
//                             value={formData.selected}
//                             data-role="tagsinput"
//                             onChange={handleChange}
//                           />
//                         </div>
//                       </div>
//                     </FormControl>
//                   </li>

//                   {/* <li class="list-group-item">
//                     {routeValue == "addNewPage" ? (
//                       <Button type="submit" colorScheme="blue" size="md">
//                         Add Page
//                       </Button>
//                     ) : (
//                       <Button
//                         onClick={handleSubmit}
//                         colorScheme="blue"
//                         size="md"
//                       >
//                         Update page
//                       </Button>
//                     )}
//                   </li> */}
//                 </ul>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-12 ps-0 text-left mt-4">
//             {routeValue == "addNewPage" ? (
//               <Button type="submit" colorScheme="blue" size="md">
//                 Add Page
//               </Button>
//             ) : (
//               <Button onClick={handleSubmit} colorScheme="blue" size="md">
//                 Update page
//               </Button>
//             )}
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AddNewPage;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Input, FormControl, FormLabel, Radio, RadioGroup, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Helmet } from "react-helmet";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { mongopath } from "../Mongopath/Mongopath";
import "./allpage.css";

const AddNewPage = () => {
  const [value, setValue] = useState("2");
  const [value2, setValue2] = useState("2");
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    metatitle: "",
    metades: "",
    published: "",
    frontpage: "",
    editorContent: "",
    selected: [],
    url: "",
  });
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [metatitle, setMetatitle] = useState("");
  const [metades, setMetades] = useState("");
  const [metakeys, setMetakeys] = useState("");
  
  const [description, setDescription] = useState("");

  // Function to get the value from the route
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
  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      slug: name === "name" ? generateSlug(value) : prevFormData.slug,
    }));
  };

  const generateSlug = (input) => {
    const cleanedInput = input.replace(/[^a-zA-Z]+/g, " ");
    return cleanedInput.toLowerCase().replace(/\s+/g, "-");
  };

  const [editorState, setEditorState] = useState(() => {
    const content = ContentState.createFromText("");
    return EditorState.createWithContent(content);
  });

  const onEditorStateChange = (newEditorState) => {
    const editorContent = newEditorState.getCurrentContent().getPlainText();
    setEditorState(newEditorState);
    setFormData((prevFormData) => ({
      ...prevFormData,
      editorContent: editorContent,
    }));
  };

  useEffect(() => {
    let id = params.name;
    const fetchData = async (id) => {
      if (id !== undefined) {
        try {
          const response = await axios.get(`${mongopath}get-form-data/` + id);
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
          });

          setValue(response.data.frontpage ? response.data.frontpage.toString() : "2");
          setValue2(response.data.published ? response.data.published.toString() : "2");

          setEditorState(() => {
             const content = ContentState.createFromBlockArray(
              convertFromHTML(response.data.editorContent)
            );
            return EditorState.createWithContent(content);
          });

          setSelectedTags(response.data.selected);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData(id);
  }, []);

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

    let id = params.name;
 
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
    if (updatedFormData.editorContent == "") {
      validation = true;
      setDescription("description is required");
    
    } else {
      setDescription("");
    }

    if (updatedFormData.selected == "") {
      validation = true;
      setMetakeys("Key is required");
    } else if (updatedFormData.metatitle >= 30) {
      validation = true;
      setMetakeys("Key should be less");
    } else {
      setMetakeys("");
    }
    if (validation == false) {

    try {
      if (id !== undefined) {
        await axios.put(`${mongopath}edit/${id}`, updatedFormData);
        alert("Form submitted successfully!");
      } else {
        await axios.post(`${mongopath}submit-form`, updatedFormData);
        alert("Form submitted successfully!");
      }
    } catch (error) {
      if (error.response.data) {
        alert(error.response.data["error"]);
      } else {
        alert("Error in submitting the data");
      }
    }
  }}

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
    
          <div className="container">
            <nav
              className="layout-navbar navbar navbar-expand-xl navbar-detached align-items-center inNav"
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
                        <div className="title mt-4">
                          {routeValue == "addNewPage" ? (
                            <h4 className="align-items-center">New Page</h4>
                          ) : (
                            <h4 className="align-items-center">Edit Page</h4>
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
                          className={
                            name
                              ? "form-control error-border for-input w-full"
                              : "form-control for-input w-full"
                          }
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
                          // disabled={formData.name !== ''}
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
                    <div className="col-md-6 pe-0">
                      <RadioGroup onChange={setValue2} value={value2}>
                        <FormLabel>Published</FormLabel>
                        <div direction="row" className="text-left for-flex">
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
                        <div
                          className="modal fade"
                          id="exampleModal"
                          tabindex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1
                                  className="modal-title fs-5"
                                  id="exampleModalLabel"
                                >
                                  Select Gallery
                                </h1>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                <p>Click on Image to add album shortcode</p>
                                <p></p>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="modal fade"
                          id="exampleModal1"
                          tabindex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1
                                  className="modal-title fs-5"
                                  id="exampleModalLabel"
                                >
                                  Select Gallery
                                </h1>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                <p>Click on Video to add shortcode</p>
                                <p></p>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
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
                                                {description ? <p className="error">{description}</p> : null}

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
                         
       <TagsInput
                                value={selectedTags}
                                name="selected"
                                onChange={handleTagsChange}
                                style={{ marginRight: "5px" }}
                              />     
                          {metakeys ? <p className="error">{metakeys}</p> : null}
  
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
                {routeValue == "addNewPage" ? (
                  <Button type="submit" colorScheme="blue" size="md">
                    Add Page
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} colorScheme="blue" size="md">
                    Update page
                  </Button>
                )}
              </div>
            </form>
          </div>
        </>
  );
};

export default AddNewPage;
