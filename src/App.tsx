import React from "react";

import Router from "./Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router />
    </>
  );
};

export default App;
