import React, { useState } from "react";
import { Button, Input, FormLabel } from "@chakra-ui/react";
import axios from "axios";
import { Radio, RadioGroup, Select } from "@chakra-ui/react";
import { mongopath } from "../../Mongopath/Mongopath";
const VideoSetting = () => {
  const [formData, setFormData] = useState({
    title: "Contact meta title",
    description: "contact meta description",
    keyword: "contact, new , keywords",
    publish: "",
    select: "",
    videoperPage: "",
  });

  const [value, setValue] = React.useState("2");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((preData) => ({
      ...preData,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      await axios.post(`${mongopath}submit/video/gallery/setting/data`);
      alert("data updated successfully ");
    } catch (error) {
      console.error("error in updating the data", error);
    }
  };

  return (
    <div
      class="modal fade"
      id="videoSetting"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title" id="staticBackdropLabel">
              Video Gallery Page Setting
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div className="container">
              <form action="" onSubmit={handleSubmit}>
                <div>
                  <FormLabel> Meta Title </FormLabel>
                  <Input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <FormLabel> Meta Description </FormLabel>
                  <Input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <FormLabel> Meta Keywords </FormLabel>
                  <Input
                    type="text"
                    name="keyword"
                    value={formData.keyword}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <FormLabel> Display Video Gallery </FormLabel>
                  <RadioGroup onChange={setValue} value={value}>
                    <div direction="row">
                      <Radio
                        value="1"
                        name="publish"
                        checked={formData.publish === "1"}
                        onChange={handleChange}
                      >
                        Yes
                      </Radio>
                      <Radio
                        value="2"
                        name="publish"
                        checked={formData.publish === "1"}
                        onChange={handleChange}
                      >
                        No
                      </Radio>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <FormLabel> Video per row </FormLabel>
                  <Select name="select" onChange={handleChange}>
                    <option selected={formData.select === "no"} value="2">
                      2
                    </option>
                    <option value="4" selected={formData.select === "4"}>
                      4
                    </option>

                    <option value="6" selected={formData.select === "6"}>
                      6
                    </option>
                  </Select>
                </div>
                <div>
                  <FormLabel> Video per page </FormLabel>
                  <Input
                    type="text"
                    name="keyword"
                    value={formData.videoperPage}
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-4">
                  <Button type="submit">Update</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSetting;
