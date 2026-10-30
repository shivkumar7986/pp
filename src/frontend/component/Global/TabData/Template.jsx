import React from "react";
import { useState } from "react";
const Template = () => {
  const [formData, setFormData] = useState({
    description: "",
    enquiry: "",
    disProduct: "",
    productPage: "",
    productRow: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="row d-flex">
        <div className="col-md-6">
          <div className="row">
            {" "}
            <label className="col-md-6 py-3 text-left" htmlFor="">
              {" "}
              404 Template
            </label>
            <div className="col-md-4 py-3 text-left"></div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <p className="col-md-6 py-3 text-left">404 Template key :</p>
            <p className="col-md-4 py-3 text-left">404_template</p>
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
              Page text:
            </label>
            <div className="col-md-6 py-3 text-left">
              <input  className="for-input"
                type="text"
                name="postRow"
                value={formData.postRow}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <p className="col-md-6 py-3 text-left">Background image:</p>
            <p className="col-md-4 py-3 text-left"> </p>

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

export default Template;
