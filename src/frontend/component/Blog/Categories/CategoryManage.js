import React from "react";
import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { mongopath } from "../../Mongopath/Mongopath";
import { TbUsersPlus } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
const CategoryManage = () => {

  const [categoryData, setCategoryData] = useState([]);

  //Navigate back to the previous page
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); 
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // console.log(updatedFormData)
  //   let id = params.name;
  //   // // Validate required fields
  //   let validation = false;
  //   if (formData.name == "") {
  //     validation = true;

  //     setName("name is required");
  //   } else {
  //     setName("");
  //   }
  //   if (formData.slug == "") {
  //     validation = true;
  //     setSlug("slug  is required");
  //   } else {
  //     setSlug("");
  //   }

  //   if (validation == false) {
  //     try {
  //       if (id != undefined) {
  //         await axios.put(`${mongopath}edit-category/${id}`, formData);
  //         alert("Form submitted successfully!");
  //         console.log(updatedFormData);
  //       } else {
  //         await axios.post(`${mongopath}submit-category-form`, formData);
  //         alert("Form submitted successfully!");
  //       }
  //       // Reset form data and exit edit mode
  //       setFormData({ name: "", slug: "" });
  //       setIsEditMode(false);
  //       // Fetch updated category data
  //       fetchFormData();
  //     } catch (error) {
  //       if (error.response.data) {
  //         alert(error.response.data["error"]);
  //       } else {
  //         alert("error in submitting the data ");
  //       }
  //     }
  //   }
  // };

  //get data in table
  useEffect(() => {
    fetchFormData();
  }, []);
  const fetchFormData = async () => {
    try {
      const response = await axios.get(`${mongopath}get-category-data`);
      setCategoryData(response.data);
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this data?"
    );
    if (isConfirmed) {
      try {
        await axios.delete(`${mongopath}delete/category/${id}`);
        console.log("Form data deleted successfully");
        fetchFormData();
      } catch (error) {
        console.error("Error deleting form data:", error);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{categoryData.metatitle || "Default Meta Title"}</title>
        <meta
          name="description"
          content={categoryData.metades || "Default Meta Description"}
        />
        <meta
          name="author"
          content={categoryData.selected || "Default Author"}
        />
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
          className="navbar-nav-right d-flex align-items-center mb-3"
          id="navbar-collapse"
        >
          {/* Search */}
          <div className="navbar-nav align-items-center">
            <div className="nav-item d-flex align-items-center">
              <ul className="navbar-nav flex-row align-items-center ms-auto">
                {/* Place this tag where you want the button to render. */}
                <li className="nav-item lh-1 me-3">
                  <h4 className="align-items-center text-dark pageManager">
                    Category Manage
                  </h4>
                </li>
              </ul>
            </div>
          </div>
          {/* /Search */}
          <ul className="navbar-nav flex-row align-items-center ms-auto text-center">
            {/* Place this tag where you want the button to render. */}

            <li className="nav-item lh-1 me-3">
              <Link to="/admin/newCategory">
                <Button
                  leftIcon={<TbUsersPlus />}
                  size="md"
                  // data-bs-toggle="modal"
                  // data-bs-target="#exampleModal"
                >
                  New Category
                </Button>
              </Link>
              </li>
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

      <div>
        <table>
          <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </thead>
          <tbody>
            {categoryData.map((data, index) => (
              <tr key={data._id}>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>
                  <ul className="row d-flex justify-content-evenly">
                    <li className=" col-md-2 mx-2 mt-4" style={{listStyle:"none"}}>
                      <Link to={"/admin/edit-category/" + data._id}>
                        <Button className="edit & dlt">
                          <CiEdit />
                        </Button>
                      </Link>
                    </li>
                    <li className="col-md-2 mt-4 mx-2" style={{listStyle:"none"}}>
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
    </>
  );
};

export default CategoryManage;
