import React from "react";
import { useState } from "react";

const SMTP = () => {
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
    <div className="">
      <div className="row d-flex">
        <div className="col-md-6">
          <div className="row items-center">
            {" "}
            <label className="col-md-6 py-3 text-left" htmlFor="">
              {" "}
              SMTP Settings :
            </label>
            <div className="col-md-4 py-3 text-left"></div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row items-center">
            <p className="col-md-6 py-3 text-left">SMTP settings key :</p>
            <p className="col-md-4 py-3 text-left">smtp_settings</p>
            <div className="col-md-1 py-3">
              <button className="copy"> copy </button>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="row d-flex">
        <div className="col-md-6">
          <div className="row items-center">
            {" "}
            <label className="col-md-6 py-3 text-left" htmlFor="">
              {" "}
              SMTP host:
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

          <div className="row items-center">
            <p className="col-md-6 py-3 text-left">SMTP password:</p>
            <p className="col-md-4 py-3 text-left">
              {" "}
              <input className="for-input"
                type="text"
                name="postRow"
                value={formData.postRow}
                onChange={handleChange}
              />
            </p>

            <div className="col-md-1 py-3">
              <button className="copy"> copy </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row items-center">
            {" "}
            <label className="col-md-6 py-3 text-left" htmlFor="">
              {" "}
              SMTP username:
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

          <div className="row items-center">
            <p className="col-md-6 py-3 text-left">SMTP port:</p>
            <p className="col-md-4 py-3 text-left">
              {" "}
              <input className="for-input"
                type="text"
                name="videoPage"
                value={formData.videoPage}
                onChange={handleChange}
              />
            </p>
            <div className="col-md-1 py-3">
              <button className="copy"> copy </button>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div className="row d-flex">
        <div className="col-md-6 py-3 text-left">
          <div className="row items-center">
            {" "}
            <p>
              {" "}
              Note: Test email will be send to registered email using provided
              SMTP to verify settings
            </p>
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

export default SMTP;
