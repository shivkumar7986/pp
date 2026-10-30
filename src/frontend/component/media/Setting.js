import React, { useState } from "react";
import { Button, Input, FormLabel } from "@chakra-ui/react";
import axios from "axios";
import { mongopath } from "../Mongopath/Mongopath";
const Setting = () => {
  
  const [formData, setFormData] = useState({
    title: "Gallery Page",
    description: "This is a sample gallery page meta description",
    keyword: "meta, keywords, gallery, new tag",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((preData) => ({
      ...preData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDeafault()
    try {
      const response = await axios.post(`${mongopath}submit/setting/data`,);
      alert("data updated successfully ");
   
    } catch (error) {
      console.error("error in updating the data", error);
    }
  };

  return (
    <div
      class="modal fade"
      id="setting"
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
              Gallery Page Setting
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

export default Setting;
