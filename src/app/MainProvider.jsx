"use client";
import store from "../components/redux/configStore";
import React from "react";
import { Provider } from "react-redux";

const MainProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default MainProvider;
