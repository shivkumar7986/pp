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
const Images = () => {
  const [formData, setFormData] = useState({
    disBlog: "",
    blogComment: "",
    approval: "",
    blogGrid: "",
    blogLayout: "",
    sideContent: "",
    postRow: "2",
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
              Dispaly gallery page :
            </label>
            <div className="col-md-4 py-3 text-left">
              <RadioGroup onChange={setValue} value={value}>
                <div direction="row">
                  <Radio
                    value="1"
                    name="disBlog"
                    // checked={formData.frontpage === "1"}
                    checked={formData.disBlog === 1 ? true : false}
                    onChange={handleChange}
                  >
                    Yes
                  </Radio>
                  <Radio
                    value="2"
                    name="disBlog"
                    // checked={formData.frontpage === "2"}
                    checked={formData.disBlog === 2 ? true : false}
                    onChange={handleChange}
                  >
                    No
                  </Radio>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="row">
            <p className="col-md-6 py-3 text-left">Dispaly gallery page key:</p>
            <p className="col-md-4 py-3 text-left">display_gallery</p>
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
              Image Per page :
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
            <p className="col-md-6 py-3 text-left">Image per page key:</p>
            <p className="col-md-4 py-3 text-left">images_per_page</p>
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
              Image per row :
            </label>
            <div className="col-md-6 py-3 text-left">
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
            <p className="col-md-6 py-3 text-left">Image per row key:</p>
            <p className="col-md-4 py-3 text-left">images_per_row</p>

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
              Small thumbnail :
            </label>
            <div className="col-md-4 row">
              <div className="col-md-6 py-3 text-left">
                {" "}
                <input type="text" className="for-input" />{" "}
              </div>
              <div className="col-md-6 py-3 text-left">
                {" "}
              </div>
            </div>
          </div>

          <div className="row">
            <p className="col-md-6 py-3 text-left">Small thumbnail key:</p>
            <p className="col-md-4 py-3 text-left">small_thumbnail</p>
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
              Medium thumbnail :
            </label>
            <div className="col-md-4 py-3 text-left">
              <div className=" row">
               
                  {" "}
                  <input type="text"className="for-input" />{" "}
           
              </div>
            </div>
          </div>

          <div className="row">
            <p className="col-md-6 py-3 text-left">Medium thumbnail key:</p>
            <p className="col-md-4 py-3 text-left">medium_thumbnail</p>

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
              Maintain Thumbnail Ratio :
            </label>
            <div className="col-md-4 py-3 text-left">
              <RadioGroup onChange={setValue} value={value}>
                <div direction="row">
                  <Radio
                    value="1"
                    name="disBlog"
                    // checked={formData.frontpage === "1"}
                    checked={formData.disBlog === 1 ? true : false}
                    onChange={handleChange}
                  >
                    Yes
                  </Radio>
                  <Radio
                    value="2"
                    name="disBlog"
                    // checked={formData.frontpage === "2"}
                    checked={formData.disBlog === 2 ? true : false}
                    onChange={handleChange}
                  >
                    No
                  </Radio>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="row">
            <p className="col-md-6 py-3 text-left">Thumbnail Ratio key:</p>
            <p className="col-md-4 py-3 text-left">maintain_ratio</p>
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
              Post per page :
            </label>
            <div className="col-md-4 py-3 text-left">
              <input className="for-input"
                type="text"
                name="postRow"
                value={formData.postRow}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <p className="col-md-6 py-3 text-left">Post per page :</p>
            <p className="col-md-4 py-3 text-left">posts_per_page</p>
            <div className="col-md-1 py-3">
              <button className="copy"> copy </button>
            </div>
          </div>
        </div>

        <div className="col-md-6"></div>
      </div>

      <hr />

      <div className="col-md-12 text-left mt-4">
        <button className="save_btn"> Save Settings</button>
      </div>
    </div>
  );
};

export default Images;
