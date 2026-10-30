import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./admin.css";
const Content = () => {
  // const params = useParams();
  // const [pages, setPages] = useState(null);
  // useEffect(() => {

  //   fetchPages(id);
  // }, []);

  // const fetchPages = async (id) => {

  //   try {

  //     // console.log(id)
  //     const response = await fetch(`${mongopath}get-forntend-data/`+id);
  //     const data = await response.json();
  //     console.log(data)
  //     setPages(data);
  //   } catch (error) {
  //     console.error("Error fetching pages:", error);
  //   }
  // };
  return (
    <>
      {/*      
          <div key={pages &&  pages._id}>
            <h3 className="col-md-1 pt-3 ms-1 text-center">
              {pages && pages.name}
            </h3>
            <p> {pages && pages.editorContent}</p>
          </div> */}
    </>
  );
};

export default Content;
