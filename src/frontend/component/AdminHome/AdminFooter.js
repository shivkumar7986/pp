import React, { useState, useEffect } from "react";
import { mongopath } from "../Mongopath/Mongopath";
import { Link } from "react-router-dom";
const AdminFooter = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch(
        `${mongopath}get/menu/front-page/footer/data`
      );
      const data = await response.json();
      setMenu(data);
    } catch (error) {
      console.error("Error fetching pages:", error);
    }
  };
  return (
    <>
      {" "}
      <footer className=" footer bg-footer-theme footer-admin ">
        <div className="py-2 flex-md-row ">
          <ul className=" row list-unstyled text-center">
            <li className="col-md-3 pt-3 m-2">
              <Link to="about">
                <bu className="pageName font-weight-bold footer bg-none">
                  <h5>About </h5>
                </bu>
              </Link>
              <div style={{ textAlign: "justify" }}>
                {" "}
                Our catalog contains only the most demanded vacancies from
                American and international companies with offices in the US.Our
                catalog contains only the most demanded vacancies from American
                and international companies with offices in the US.
              </div>
            </li>

            <li className="col-md-3 pt-3    m-2">
              <Link to="contact">
                <bu className="pageName font-weight-bold footer bg-none">
                  <h5> Contact</h5>
                </bu>
              </Link>
              <div>
                <ul>
                  <li>
                    {" "}
                    <b>Address</b> Mohali,Punjab,302012
                  </li>
                  <li>
                    {" "}
                    <b>Mail-us:</b>
                    <a href="SIT123@gmail.com">SIT123@gmail.com</a>
                  </li>
                  <li>
                    {" "}
                    <b> Contact no.</b>
                    
                    <a href="#">+91 56784 89765</a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="col-md-3 pt-3    m-2">
              <Link to="featuredwork">
                <bu className="pageName font-weight-bold footer bg-none">
                  <h5> FEATURED WORK</h5>
                </bu>
              </Link>

              <p> demo</p>
              <p>demo</p>
              <p>demo</p>
              <p>demo</p>
            </li>
            <li className="col-md-2 pt-3    m-2" style={{textAlign:"justify"}}>
              <Link to="newsletter">
                <bu className="pageName font-weight-bold footer bg-none">
                  <h5> NEWSLETTER</h5>
                </bu>
               
              </Link>
              Our catalog contains only the most demanded vacancies from
                American and international companies with offices in the US.
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default AdminFooter;
