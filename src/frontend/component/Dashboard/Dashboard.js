import React, { useEffect, useState } from "react";
import axios from "axios";
import { mongopath } from "../Mongopath/Mongopath";

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    pageCount: 0,
  });

  const [posts, setPosts] = useState({
    post: 0,
  });
  const [media, setMedia] = useState({
    medias: 0,
  });
  const [blog, setBlog] = useState({
    blogs: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get(`${mongopath}dashboard/pagecount`);
        setMetrics(response.data);
      } catch (error) {
        console.error("Error fetching dashboard metrics:", error);
      }
    };

    fetchMetrics();
  }, []);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`${mongopath}dashboard/menucount`);
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching dashboard metrics:", error);
      }
    };

    fetchMenu();
  }, []);
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get(`${mongopath}dashboard/mediacount`);
        setMedia(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching dashboard metrics:", error);
      }
    };

    fetchMedia();
  }, []);
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${mongopath}dashboard/blogcount`);
        setBlog(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching dashboard metrics:", error);
      }
    };

    fetchBlog();
  }, []);

  return (
    <div className="dashboard mt-10 pe-3">
      <div className="flex justify-between flex-col items-center">
        <div className="w-full fa-border p-3 bg-white">
          <div className="over_view_st"></div>
          <div className="flex gap-4 overflow-hidden for-homepage">
            <div className="w-1/2 bg-purple-400 text-white rounded min-h-32 p-4 flex justify-center gap-10 items-center card_s">
              <i className="fa fa-hand-o-right text-4xl" aria-hidden="true"></i>
              <div className="flex flex-col gap-1 text-start">
                <p className="text-lg">{posts.post}</p>
                <p className="text-lg">Post</p>
              </div>
            </div>
            <div className="w-1/2 bg-green-500 text-white rounded min-h-32 p-4 flex justify-center gap-10 items-center card_s">
              <i className="fa fa-file-text text-4xl"></i>
              <div className="flex flex-col gap-1 text-start">
                <p className="text-lg">{metrics.pageCount}</p>
                <p className="text-lg">Page</p>
              </div>
            </div>
            <div className="w-1/2 bg-orange-400 text-white rounded min-h-32 p-4 flex justify-center gap-10 items-center card_s">
              <i className="fa fa-comment-o text-4xl"></i>
              <div className="flex flex-col gap-1 text-start">
                <p className="text-lg">{media.medias}</p>
                <p className="text-lg">Comment</p>
              </div>
            </div>
            <div className="w-1/2 bg-amber-400 text-white rounded min-h-32 p-4 flex justify-center gap-10 items-center card_s">
              <i className="fa fa-comments text-4xl"></i>
              <div className="flex flex-col gap-1 text-start">
                <p className="text-lg">{blog.blogs}</p>
                <p className="text-lg">Moderation</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-6 rounded p-4 fa-border p-3 flex justify-center gap-10 for_cms_welcome">
          <div className="w-full text-white rounded min-h-80 flex justify-center gap-10 items-center">
            <div className="cms_welcome">
              <h1>Welcome to CMSEzee</h1>
              <p>Easily customizable CMS framework</p>
              <h2>Get Started</h2>
              <button>Customize Your Site</button>
            </div>
          </div>
          <div className="w-full text-white rounded min-h-80 flex justify-center gap-10 items-center">
            <p className="text-lg">Element 7</p>
            <p className="text-lg">Element 8</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
