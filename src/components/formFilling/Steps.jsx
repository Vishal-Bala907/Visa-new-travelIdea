"use client";
import * as React from "react";

import PassportForm from "./PassportForm";
import UploadDocuments from "./UploadDocument";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
export default function Steps() {
  const visaRequests = useSelector((state) => state.visaRequest.visaRequests);
  console.log("visaRequests length", visaRequests.length);
  // const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <Box>
      <PassportForm />
      {visaRequests.length > 0 && <UploadDocuments />}
      
    </Box>
  );
}
