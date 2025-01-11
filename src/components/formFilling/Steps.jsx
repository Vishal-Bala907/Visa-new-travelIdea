"use client";
import * as React from "react";

import PassportForm from "./PassportForm";
import UploadDocuments from "./UploadDocument";
import Makepayement from "./MakePayment";
import AddVistDetails from "./AddVisitDetails";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
export default function Steps() {
  const visaRequests = useSelector((state) => state.visaRequest.visaRequests);
  console.log("visaRequests length", visaRequests.length);
  // const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const [stage, setStage] = React.useState(1);
  console.log("stage", stage);
  return (
    <Box>
      <PassportForm setStage={setStage} />
      {stage >= 2 ? <AddVistDetails setStage={setStage} /> : ""}
      {stage >= 3 ? <UploadDocuments setStage={setStage} /> : ""}
      {stage >= 4 ? <Makepayement setStage={setStage} /> : ""}
    </Box>
  );
}
