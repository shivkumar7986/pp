import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Radio, RadioGroup, Select } from "@chakra-ui/react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { TbUsersPlus } from "react-icons/tb";
import { MdOutlineSegment } from "react-icons/md";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "../global.css";
const Product = () => {
  const [formData, setFormData] = useState({
    description: "",
    enquiry: "",
    disProduct: "",
    productPage: "",
    productRow: "",
  });
  const [value, setValue] = useState("2");
  const [value2, setValue2] = useState("2");
  const [value3, setValue3] = useState("2");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const jsonData = {
    options: [
      {
        value: " popup",
        label: "  popup",
      },
      {
        value: "newspage",
        label: "newspage ",
      },
    ],
  };
  const jsonData2 = {
    options: [
      {
        value: " 2",
        label: "  2",
      },
      {
        value: "4",
        label: "4 ",
      },
      {
        value: "6",
        label: "6",
      },
    ],
  };
  return (
    <div className="">
      <div className="row d-flex">
        <div className="col-md-6">
          <div className="row">
            {" "}
            <label className="col-md-6 py-3 text-left" htmlFor="">
              {" "}
              Product description :
            </label>
            <div className="col-md-4 py-3 text-left">
              <Select className="for-input for-select"
                id="type"
                name="blogGrid"
                value={formData.blogGrid}
                onChange={handleChange}
              >
                {jsonData &&
                  jsonData.options.map((option) => (
                    <option
                      value={option.value} // Assuming 'value' is the correct property for option value
                      key={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
              </Select>
            </div>
          </div>

          <div className="row">
            <p className="col-md-6 py-3 text-left">Product description key:</p>
            <p className="col-md-4 py-3 text-left">product_description</p>
            <div className="col-md-1 py-3">
              <button className="copied"> copied </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            {" "}
            <label className="col-md-6 py-3 text-left" htmlFor="">
              {" "}
              Product enquiry button text :
            </label>
            <div className="col-md-6 py-3 text-left">
              <Input type="text" className="for-input" value="Send Enquiry tto" />
            </div>
          </div>

          <div className="row">
            <p className="col-md-6 py-3 text-left">Product enquiry button key:</p>
            <p className="col-md-4 py-3 text-left">enquiry_btn_txt</p>
            <div className="col-md-1 py-3">
              <button className="copy"> copy </button>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="row d-flex">
        <div className="col-md-6">
          <div className="row">
            {" "}
            <label className="col-md-6 py-3 text-left" htmlFor="">
              {" "}
              Display product page:
            </label>
            <div className="col-md-6 py-3 text-left">
              <input className="for-input"
                type="text"
                name="postRow"
                value={formData.postRow}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <p className="col-md-6 py-3 text-left">Display product page key: :</p>
            <p className="col-md-4 py-3 text-left">display_products</p>

            <div className="col-md-1 py-3">
              <button className="copy"> copy </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            {" "}
            <label className="col-md-6 py-3 text-left" htmlFor="">
              {" "}
              Products per page :
            </label>
            <div className="col-md-4 py-3 text-left">
              <input className="for-input"
                type="text"
                name="videoPage"
                value={formData.videoPage}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <p className="col-md-6 py-3 text-left">Products per page key:</p>
            <p className="col-md-4 py-3 text-left">products_per_page</p>
            <div className="col-md-1 py-3">
              <button className="copy"> copy </button>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div className="row d-flex">
        <div className="col-md-6">
          <div className="row">
            {" "}
            <label className="col-md-6 py-3 text-left" htmlFor="">
              {" "}
              Products per row :
            </label>
            <div className="col-md-6 py-3 text-left">
              <Select className="for-input for-select"
                id="type"
                name="videoRow"
                value={formData.videoRow}
                onChange={handleChange}
              >
                {jsonData2 &&
                  jsonData2.options.map((option) => (
                    <option
                      value={option.value} // Assuming 'value' is the correct property for option value
                      key={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
              </Select>
            </div>
          </div>

          <div className="row">
            <p className="col-md-6 py-3 text-left">Products per row key:</p>
            <p className="col-md-4 py-3 text-left">products_per_row</p>

            <div className="col-md-1 py-3">
              <button className="copy"> copy </button>
            </div>
          </div>
        </div>
      </div>
      <hr />

      <div className="col-md-12 text-left mt-4">
        <button className="save_btn"> Save Settings</button>
      </div>
    </div>
  );
};

export default Product;
