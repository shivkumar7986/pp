import React from "react";
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import BlogManage from "./Blogpost/BlogManage";
import "./blog.css";
import CategoryManage from "./Categories/CategoryManage";
const Bloghome = () => {
  const [key, setKey] = useState("blogmanage");
  //goback

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 mt-4"
    >
      <Tab eventKey="blogmanage" title="Blog Post">
        <BlogManage />
      </Tab>
      <Tab eventKey="category" title="Categories">
        <CategoryManage />
      </Tab>
    </Tabs>
  );
};

export default Bloghome;
