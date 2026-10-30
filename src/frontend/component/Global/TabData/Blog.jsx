import React from "react";
import { useState } from "react";
import { Radio, RadioGroup, Select } from "@chakra-ui/react";
import "../global.css";
const Blog = () => {
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
              Dispaly blog :
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
            <p className="col-md-6 py-3 text-left">Dispaly blog key:</p>
            <p className="col-md-4 py-3 text-left">display_blog</p>
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
              Blog comments :
            </label>
            <div className="col-md-6 py-3 text-left">
              <RadioGroup onChange={setValue2} value={value2}>
                <div direction="row">
                  <Radio
                    value="1"
                    name="blogComment"
                    // checked={formData.frontpage === "1"}
                    checked={formData.blogComment === 1 ? true : false}
                    onChange={handleChange}
                  >
                    enabled
                  </Radio>
                  <Radio
                    value="2"
                    name="blogComment"
                    // checked={formData.frontpage === "2"}
                    checked={formData.blogComment === 2 ? true : false}
                    onChange={handleChange}
                  >
                    disabled
                  </Radio>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="row">
            <p className="col-md-6 py-3 text-left">Blog comments key:</p>
            <p className="col-md-4 py-3 text-left">blog_comments</p>
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
              Comment approval requried before display ?:
            </label>
            <div className="col-md-6 py-3 text-left">
              <RadioGroup onChange={setValue2} value={value2}>
                <div direction="row">
                  <Radio
                    value="approval"
                    name="frontpage"
                    // checked={formData.frontpage === "1"}
                    checked={formData.approval === 1 ? true : false}
                    onChange={handleChange}
                  >
                    Yes
                  </Radio>
                  <Radio
                    value="2"
                    name="approval"
                    // checked={formData.frontpage === "2"}
                    checked={formData.approval === 2 ? true : false}
                    onChange={handleChange}
                  >
                    No
                  </Radio>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="row">
            <p className="col-md-6 py-3 text-left">Comment publish Key:</p>
            <p className="col-md-4 py-3 text-left">comment_approval</p>

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
              Blog grid :
            </label>
            <div className="col-md-4 py-3 text-left">
              <Select
                className="for-input for-select"
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
            <p className="col-md-6 py-3 text-left">Blog grid key:</p>
            <p className="col-md-4 py-3 text-left">blog_grid</p>
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
              Blog layout :
            </label>
            <div className="col-md-6 py-3 text-left">
              <RadioGroup onChange={setValue3} value={value3}>
                <div direction="row">
                  <Radio
                    value="1"
                    name="blogLayout"
                    // checked={formData.frontpage === "1"}
                    checked={formData.blogLayout === 1 ? true : false}
                    onChange={handleChange}
                  >
                    single
                  </Radio>
                  <Radio
                    value="2"
                    name="blogLayout"
                    // checked={formData.frontpage === "2"}
                    checked={formData.blogLayout === 2 ? true : false}
                    onChange={handleChange}
                  >
                    sidebar
                  </Radio>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="row">
            <p className="col-md-6 py-3 text-left">Blog layout key:</p>
            <p className="col-md-4 py-3 text-left">blog_layout</p>

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
              Sidebar content :
            </label>
            <div className="col-md-4 py-3 text-left">
              <Select
                className="for-input for-select"
                id="type"
                name="sideContent"
                value={formData.sideContent}
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
            <p className="col-md-6 py-3 text-left">Sidebar content key:</p>
            <p className="col-md-4 py-3 text-left">sidebar_content</p>
            <div className="col-md-1 py-3">
              <button className="copied"> copied </button>
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
              <input
                className="for-input"
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

export default Blog;
