import React from "react";
import Sidebar from "../frontend/component/HomeComn/Sidebar";
import { StyleSheet, Text, View } from "react-native";

const Home = ({ navigation }) => {
  return (
    <>
      <>
        {/* Layout wrapper */}
        <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">
            <Sidebar />
          </div>
        </div>
      </>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
