import React from "react";
import { useState } from "react";


import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Radio, RadioGroup, Select } from "@chakra-ui/react";
// import { useEffect } from "react";
// import { Helmet } from "react-helmet";
// import { TbUsersPlus } from "react-icons/tb";
// import { MdOutlineSegment } from "react-icons/md";
// import { Link } from "react-router-dom";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap/Tabs";
import "../global.css";
const General = () => {
  const [formData, setFormData] = useState({
    name: "",
    disVideo: "",
    disContact: "",
    videoRow: "",
    videoPage: "11",
    mail: "",
  });
  const [value, setValue] = useState("2");
  const [value2, setValue2] = useState("2");

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

  return (
    <div className="">
      <div className="row d-flex">
        <div className="col-md-6">
          <div className="row">
            {" "}
            <label className="col-md-6 py-3 text-left" htmlFor="">
              {" "}
              Dispaly video gallery :
            </label>
            <div className="col-md-4 py-3 text-left">
              <RadioGroup onChange={setValue} value={value}>
                <div direction="row">
                  <Radio
                    value="1"
                    name="disVideo"
                    // checked={formData.frontpage === "1"}
                    checked={formData.disVideo === 1 ? true : false}
                    onChange={handleChange}
                  >
                    Yes
                  </Radio>
                  <Radio
                    value="2"
                    name="disVideo"
                    // checked={formData.frontpage === "2"}
                    checked={formData.disVideo === 2 ? true : false}
                    onChange={handleChange}
                  >
                    No
                  </Radio>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="row">
            <p className="col-md-6 py-3 text-left">Dispaly video gallery key:</p>
            <p className="col-md-4 py-3 text-left">display_video_gallery</p>
            <div className="col-md-1 py-3">
              {" "}
              <button className="copy"> copy</button>{" "}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            {" "}
            <label className="col-md-6 py-3 text-left" htmlFor="">
              {" "}
              Dispaly contact page :
            </label>
            <div className="col-md-4 py-3 text-left">
              <RadioGroup onChange={setValue2} value={value2}>
                <div direction="row">
                  <Radio
                    value="1"
                    name="disContact"
                    // checked={formData.frontpage === "1"}
                    checked={formData.disContact === 1 ? true : false}
                    onChange={handleChange}
                  >
                    Yes
                  </Radio>
                  <Radio
                    value="2"
                    name="disContact"
                    // checked={formData.frontpage === "2"}
                    checked={formData.disContact === 2 ? true : false}
                    onChange={handleChange}
                  >
                    No
                  </Radio>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="row">
            <p className="col-md-6 py-3 text-left">Dispaly contact page key:</p>
            <p className="col-md-4 py-3 text-left">display_contact</p>
            <div className="col-md-1 py-3">
              <button className="copy">Copy</button>
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
              Videos per row :
            </label>
            <div className="col-md-4 py-3 text-left">
              <Select className="for-input for-select"
                id="type"
                name="videoRow"
                value={formData.videoRow}
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
            <p className="col-md-6 py-3 text-left">Videos per row key:</p>
            <p className="col-md-4 py-3 text-left">videos_per_row</p>
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
              Videos per page :
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
            <p className="col-md-6 py-3 text-left">Videos per page key:</p>
            <p className="col-md-4 py-3 text-left">videos_per_page</p>
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
              Admin email :
            </label>
            <div className="col-md-4 py-3 text-left">
              <Input className="for-input"
                type="mail"
                name="mail"
                value={formData.mail}
                onChange={handleChange}
                placeholder="mail"
              />
            </div>
          </div>

          <div className="row">
            <p className="col-md-6 py-3 text-left">Admin email key:</p>
            <p className="col-md-4 py-3 text-left">admin_email</p>
            <div className="col-md-1 py-3">
            <button className="copied"> copied </button>
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

export default General;
