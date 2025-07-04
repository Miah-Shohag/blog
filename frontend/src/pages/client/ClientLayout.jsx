import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/client/Navbar";
import Footer from "./Footer";

const ClientLayout = () => {
  return (
    <div className="dark:bg-gray-700 ">
      <Navbar />
      <div className="max-w-7xl container mx-auto px-5 my-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default ClientLayout;
