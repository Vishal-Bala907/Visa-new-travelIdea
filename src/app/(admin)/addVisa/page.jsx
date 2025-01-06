"use client";
import React, { useEffect, useState } from "react";
import VisaForm from "../../../components/admin/VisaForm";
import { useDispatch } from "react-redux";
import { fetchAllVisaTypes } from "../../../components/server/admin/admin";
import { addVisaTypes } from "../../../components/redux/slices/VisaTypeSlice";

const page = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetchAllVisaTypes()
      .then((data) => {
        console.log(data);
        dispatch(addVisaTypes(data));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      <VisaForm />
    </main>
  );
};

export default page;
