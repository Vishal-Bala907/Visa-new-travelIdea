"use client";
import { useRouter } from "next/navigation";
import store from "../components/redux/configStore";
import React, { useEffect } from "react";
import { Provider } from "react-redux";

const MainProvider = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && router.pathname !== "/login") {
      // Redirect to login page if token is not available
      router.push("/login");
    }
  }, [router]);
  return <Provider store={store}>{children}</Provider>;
};

export default MainProvider;
