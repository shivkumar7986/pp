import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FormLabel, Input } from "@chakra-ui/react";
import { useEffect } from "react";
import { mongopath } from "../../Mongopath/Mongopath";
import "../blog.css";



const AddCategory = () => {
  const [category, setCategory] = useState({
    name: "",
    slug: "", // Initialize slug state
  });

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  // Function to generate slug based on input
  const generateSlug = (input) => {
    const cleanedInput = input.replace(/[^a-zA-Z]+/g, " ");
    return cleanedInput.toLowerCase().replace(/\s+/g, "-");
  };

  // Function to get the value from the route
  function getRouteValue() {
    var path = window.location.pathname;
    var parts = path.split("/");
    var value = parts[parts.length - 1];
    return value;
  }
  var routeValue = getRouteValue();

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update name and slug state
    setName(name === "name" ? value : name);
    setCategory((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      slug: name === "name" ? generateSlug(value) : prevFormData.slug, // Update slug based on name input
    }));
  };

  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(updatedFormData)
    let id = params.name;
    // // Validate required fields
    let validation = false;
    if (category.name == "") {
      validation = true;

      setName("name is required");
    } else {
      setName("");
    }
    if (category.slug == "") {
      validation = true;
      setSlug("slug  is required");
    } else {
      setSlug("");
    }

    if (validation == false) {
      try {
        if (id != undefined) {
          await axios.put(`${mongopath}update-edit-category/${id}`, category);
          alert("Form submitted successfully!");
          console.log(category);
        } else {
          await axios.post(`${mongopath}submit-category-form`, category);
          alert("Form submitted successfully!");
        }
      } catch (error) {
        console.error(error, "ERror in submitting the data ");
      }
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
            `${mongopath}get-category-edit-data/` + id
          );
          setCategory({
            name: response.data.name,
            slug: response.data.slug,
          });
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData(id);
  }, []);
  return (
    <>
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
          className="navbar-nav-right d-flex align-items-center mt-3"
          id="navbar-collapse"
        >
          {/* Search */}
          <div className="navbar-nav align-items-center">
            <div className="nav-item d-flex align-items-center">
              <ul className="navbar-nav flex-row align-items-center ms-auto">
                {/* Place this tag where you want the button to render. */}
                <li className="nav-item lh-1 me-3">
                  {routeValue == "newCategory" ? (
                    <h4 className="align-items-center text-dark pageManager">
                      Add New Category
                    </h4>
                  ) : (
                    <h4 className="align-items-center text-light pageManager">
                      Edit Category
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

      <div className="container">
        <div className="row m-0 CAT">
          
          <div className="col-md-4 ps-0 form-group">

            
            <FormLabel> Category Name
            </FormLabel>
            <Input
              className={name ? "form-control error-border for-input" : "form-control for-input"}
              name="name"
              onChange={handleChange}
              value={category.name}
              type="text"
            />
          </div>

          <div className="col-md-4 form-group">
            <FormLabel> Category Slug
            </FormLabel>
            <Input
              className={slug ? "form-control error-border for-input" : "form-control for-input"}
              name="slug"
              onChange={handleChange}
              type="text"
              value={category.slug}
            />

            {slug ? <p className="error">{slug}</p> : null}
          </div>
          <div className="float-left mt-4 ps-0">
            {/* <li class="" style={{ listStyle: "none" }}> */}
              {routeValue == "newCategory" ? (
                <Button onClick={handleSubmit} colorScheme="blue" size="md" className="for-left-flex">
                  Add Category
                </Button>
              ) : (
                <Button onClick={handleSubmit} colorScheme="blue" size="md" className="for-left-flex">
                  Update Category
                </Button>
              )}
            {/* </li> */}
          </div>
        </div>
        </div>
    </>
  );
};

export default AddCategory;
