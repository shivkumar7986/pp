import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGooglePlusSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import "../Common.css";
import { FaTwitterSquare } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { mongopath } from "../Mongopath/Mongopath";

const DemoAdmin = () => {
  const params = useParams();
  const [pages, setPages] = useState([]);
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch(`${mongopath}get-form-data`);
      const data = await response.json();
      setPages(data);
    } catch (error) {
      console.error("Error fetching pages:", error);
    }
  };

  const handleClick = async (id) => {
    try {
      const response = await axios.get(`${mongopath}get-forntend-data/${id}`);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="https://twitter.com/?lang=en">
                  <FaTwitterSquare className="twitter" />
                </Link>
              </li>
              <li className="nav-item">
                <Link to="https://www.facebook.com/">
                  <FaFacebookSquare className="facebook" />
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="https://www.youtube.com/">
                  <IoLogoYoutube className="youtube" />
                </Link>
              </li>
              <li className="nav-item">
                <Link to="https://in.linkedin.com/">
                  <FaLinkedin className="linkdin" />
                </Link>
              </li>
              <li className="nav-item">
                <Link to="https://www.google.com/">
                  <FaGooglePlusSquare
                    className=" google
            "
                  />
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search the site.."
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Go
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="row py-4">
        <div className="col-md-8 logocms ">
          {" "}
          <Link> CMSezee </Link>
        </div>
        <div className="col-md-4 d-flex  justify-content-around">
          <div>
            <IoCall className="call" />
          </div>
          <div>
            <p className="mt-4">Call us today 1800 100 1800</p>
          </div>

          <div>
            {" "}
            <IoMdMail className="mail" />
          </div>
          <div className="mt-4">
            <a href="mailto:enquer@website.com">Send email</a>
          </div>
        </div>
      </div>
      <nav className=" py-2">
        <ul className=" row list-unstyled">
          {pages.map((page) => (
            <li key={page._id} className="col-md-1 pt-3 ms-1">
              <Link to={page.name}>
                <button
                  onClick={() => handleClick(page._id)}
                  className="pageName font-weight-bold"
                >
                  {" "}
                  {page.name}{" "}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {data && (
        <div className="editorContent">
          <h2 className="headingContent">{data.name}</h2>
          <div>{data.editorContent}</div>
        </div>
      )}
    </div>
  );
};

export default DemoAdmin;

// import React from "react";
// import { Link, Outlet } from "react-router-dom";
// import { FaSquareTwitter } from "react-icons/fa6";
// import { FaFacebookSquare } from "react-icons/fa";
// import { FaYoutube } from "react-icons/fa";
// import { FaLinkedin } from "react-icons/fa";
// import { FaGooglePlusSquare } from "react-icons/fa";
// import { IoLogoYoutube } from "react-icons/io";
// import "../AdminHome/Css.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { FaTwitterSquare } from "react-icons/fa";
// import { IoCall } from "react-icons/io5";
// import { IoMdMail } from "react-icons/io";
// import { useState, useEffect } from "react";
// import Dropdown from "react-bootstrap/Dropdown";

// import { mongopath } from "../Mongopath/Mongopath";
// import AdminFooter from "./AdminFooter";
// const Admin = () => {
//   const [pages, setPages] = useState([]);

//   useEffect(() => {
//     fetchPages();
//   }, []);

//   const fetchPages = async () => {
//     try {
//       const response = await fetch(
//         `${mongopath}get/menu/front-page/header/data`
//       );
//       const data = await response.json();
//       setPages(data);
//       console.log(data);
//     } catch (error) {
//       console.error("Error fetching pages:", error);
//     }
//   };

//   return (
//     <div className="container-fluid">
//       <nav className="navbar navbar-expand-lg ">
//         <div className="container-fluid">
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon" />
//           </button>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               <li className="nav-item">
//                 <Link to="https://twitter.com/?lang=en">
//                   <FaTwitterSquare className="twitter" />
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="https://www.facebook.com/">
//                   <FaFacebookSquare className="facebook" />
//                 </Link>
//               </li>
//               <li className="nav-item ">
//                 <Link to="https://www.youtube.com/">
//                   <IoLogoYoutube className="youtube" />
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="https://in.linkedin.com/">
//                   <FaLinkedin className="linkdin" />
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="https://www.google.com/">
//                   <FaGooglePlusSquare
//                     className=" google
//           "
//                   />
//                 </Link>
//               </li>
//             </ul>
//             <form className="d-flex">
//               <input
//                 className="form-control me-2"
//                 type="search"
//                 placeholder="Search the site.."
//                 aria-label="Search"
//               />
//               <button className="btn btn-outline-success" type="submit">
//                 Go
//               </button>
//             </form>
//           </div>
//         </div>
//       </nav>

//       <div className="row py-4">
//         <div className="col-md-8 logocms ">
//           {" "}
//           <Link> CMSezee </Link>
//         </div>
//         <div className="col-md-4 d-flex  justify-content-around">
//           <div>
//             <IoCall className="call" />
//           </div>
//           <div>
//             <p className="mt-4">Call us today 1800 100 1800</p>
//           </div>

//           <div>
//             {" "}
//             <IoMdMail className="mail" />
//           </div>
//           <div className="mt-4">
//             <a href="mailto:enquer@website.com">Send email</a>
//           </div>
//         </div>
//       </div>

//       <nav className=" py-2">
//         <ul className=" row list-unstyled">
//           {pages.map((page) => (
//             <>
//               <div class="dropdown">
//                 {/* <li key={page._id} className="col-md-1 pt-3 ms-1">
//                  */}
//                 <Link to={page.menuName}

//                   class="btn btn-secondary dropdown-toggle"
//                   // type="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   {page.menuName}
//                 </Link>
//                 {/* </Link> */}
//                 {/*
//                 </li> */}

//                 <ul class="dropdown-menu">
//                   {page.submenu.map((submenuItem) => (
//                     <li>
//                       <a class="dropdown-item" key={submenuItem._id} href="#">
//                         {submenuItem.submenuname}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <li key={page._id} className="col-md-1 pt-3 ms-1">
//                 <Link to={page.menuName}>
//                   <button className="pageName font-weight-bold">
//                     {" "}
//                     {page.menuName}
//                   </button>
//                 </Link>
//               </li>

//               {page.submenu.map((submenuItem) => (
//                 <li key={submenuItem._id}>{submenuItem.submenuname}</li>
//               ))}
//             </>
//           ))}
//         </ul>
//       </nav>

//       <div className="footer-admin">
//         {" "}
//         <AdminFooter />{" "}
//       </div>
//     </div>
//   );
// };

// export default Admin;
