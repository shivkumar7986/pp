import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Pages from "./frontend/component/Pages/Pages";
import AddNewPage from "./frontend/component/Pages/AddNewPage";
import Addslide from "./frontend/component/Homeslider/Addslide";
import Dashboard from "./frontend/component/Dashboard/Dashboard.js";
import Mainpage from "./frontend/component/Homeslider/Mainpage";
import Addnewform from "./frontend/component/FormBuilder/Addnewform";
import Admin from "./frontend/component/AdminHome/Admin";
import Content from "./frontend/component/AdminContent/Content";
import Menuhome from "./frontend/component/Menu/Menuhome";
import AddnewMenu from "./frontend/component/Menu/AddnewMenu";
import Submenu from "./frontend/component/Menu/Submenu";
import ManageMenu from "./frontend/component/Menu/ManageMenu";
import Newgroup from "./frontend/component/Menu/Newgroup";
import Login from "./frontend/Login/Login";
import Media from "./frontend/component/media/Media";
import AddVideo from "./frontend/component/media/Video/AddVideo";
import ManageAlbum from "./frontend/component/media/Manage Album/ManageAlbum";
import Addalbum from "./frontend/component/media/Manage Album/Addalbum";
import Bloghome from "./frontend/component/Blog/Bloghome";
import Addnewblog from "./frontend/component/Blog/Blogpost/Addnewblog";
import AddCategory from "./frontend/component/Blog/Categories/AddCategory";
import Globalhome from "./frontend/component/Global/Globalhome";
import AdminLayouts from "./Layouts/AdminLayouts.jsx";
import Addnewblog1 from "./frontend/component/Blog/Blogpost/Addnewblog1.js";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const getUsername = localStorage.getItem("username");
    if (getUsername) {
      setLoggedIn(true);
    }
  }, []);
  const handleLogin = (username) => {
    localStorage.setItem("username", username);
    setLoggedIn(true);
  };
  return (
    <>
      <Routes>
        <Route
          path="/admin"
          element={
            isLoggedIn ? <AdminLayouts /> : <Login onLogin={handleLogin} />
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="pages" element={<Pages />} />
          <Route path="homeslider" element={<Mainpage />} />
          <Route path="addNewPage" element={<AddNewPage />} />
          <Route path="edit-page/:name" element={<AddNewPage />} />
          <Route path="homeslider" element={<Mainpage />} />
          <Route path="addslide" element={<Addslide />} />
          <Route path="edit-home-slide-page/:name" element={<Addslide />} />
          <Route path="forms" element={<Addnewform />} />
          <Route path="menu" element={<Menuhome />} />
          <Route path="addnewMenu" element={<AddnewMenu />} />
          <Route path="edit-menu/:name" element={<AddnewMenu />} />
          <Route path="add-sub-menu/:name" element={<Submenu />} />
          <Route path="edit-sub-menu/:name" element={<Submenu />} />
          <Route path="manageGroups" element={<ManageMenu />} />
          <Route path="add-menu-group" element={<Newgroup />} />
          <Route path="edit-group-menu/:name" element={<Newgroup />} />
          <Route path="media" element={<Media />} />
          <Route path="addVideo" element={<AddVideo />} />
          <Route path="edit-video-page/:name" element={<AddVideo />} />
          <Route path="manageAlbum" element={<ManageAlbum />} />
          <Route path="addAlbums" element={<Addalbum />} />
          <Route path="edit-albums/:name" element={<Addalbum />} />
          <Route path="blog" element={<Bloghome />} />
          <Route path="addNewPost" element={<Addnewblog1 />} />
          <Route path="edit-post/:name" element={<Addnewblog1 />} />
          <Route path="newCategory" element={<AddCategory />} />
          <Route path="edit-category/:name" element={<AddCategory />} />
          <Route path="globalSettings" element={<Globalhome />} />
        </Route>

        <Route path="/" element={<Admin />}>
          <Route path=":id" element={<Content />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
